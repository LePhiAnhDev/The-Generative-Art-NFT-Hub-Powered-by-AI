// =============== PROFILE STORAGE MANAGEMENT ===============
const ProfileManager = {
  save: function (profile, address) {
    try {
      localStorage.setItem(
        `userProfile_${address.toLowerCase()}`,
        JSON.stringify(profile)
      );
      localStorage.setItem("currentWalletAddress", address.toLowerCase());
      console.log("✅ Profile saved for address:", address);
      return true;
    } catch (error) {
      console.error("❌ Error saving profile:", error);
      return false;
    }
  },

  load: function (address) {
    try {
      const profile = localStorage.getItem(
        `userProfile_${address.toLowerCase()}`
      );
      return profile ? JSON.parse(profile) : null;
    } catch (error) {
      console.error("❌ Error loading profile:", error);
      return null;
    }
  },

  clear: function (address) {
    localStorage.removeItem(`userProfile_${address.toLowerCase()}`);
    localStorage.removeItem("currentWalletAddress");
  },
};

// =============== PROFILE LOADING AND CHECKING ===============
async function checkWalletConnection() {
  const savedAddress = localStorage.getItem("walletAddress");
  const userProfile = localStorage.getItem("userProfile");

  if (savedAddress) {
    const shortAddress = `${savedAddress.substring(
      0,
      6
    )}...${savedAddress.substring(savedAddress.length - 4)}`;

    document.getElementById("connectWalletBtn").style.display = "none";
    document.getElementById("walletInfo").style.display = "block";

    if (userProfile) {
      const profile = JSON.parse(userProfile);
      const navbarUsername = document.getElementById("navbarUsername");
      const walletAvatar = document.querySelector(".wallet-avatar");

      if (navbarUsername) {
        navbarUsername.textContent = profile.name?.trim() || shortAddress;
      }
      if (walletAvatar && profile.profilePicture) {
        walletAvatar.src = profile.profilePicture;
      }
    } else {
      const navbarUsername = document.getElementById("navbarUsername");
      if (navbarUsername) {
        navbarUsername.textContent = shortAddress;
      }
    }
  } else {
    showConnectButton();
  }
}

function showConnectButton() {
  document.getElementById("connectWalletBtn").style.display = "block";
  document.getElementById("walletInfo").style.display = "none";
}

async function connectWallet() {
  try {
    const accounts = await window.ethereum.request({
      method: "eth_requestAccounts",
    });
    const account = accounts[0];
    localStorage.setItem("walletAddress", account);

    const existingProfile = localStorage.getItem("userProfile");
    if (!existingProfile) {
      const shortAddress = `${account.substring(0, 6)}...${account.substring(
        account.length - 4
      )}`;
      const newProfile = {
        name: shortAddress,
        bio: "",
        profilePicture: null,
      };
      localStorage.setItem("userProfile", JSON.stringify(newProfile));
    }

    checkWalletConnection();
    console.log("Wallet connected:", account);
  } catch (error) {
    console.error("Error connecting wallet:", error);
  }
}

async function loadUserProfile() {
  try {
    const userAddress = await getCurrentWalletAddress();
    if (!userAddress) return;

    const profile = await getProfileData(userAddress);
    if (profile) {
      updateProfileDisplay(profile);
    }

    updateNavbarProfile(profile);
  } catch (error) {
    console.error("Error loading profile:", error);
  }
}

function updateNavbarProfile(profile) {
  const profileButton = document.querySelector(".profile-button");
  const usernameDisplay = document.querySelector(".username-display");

  if (profileButton && profile) {
    if (profile.avatar) {
      profileButton.innerHTML = `<img src="${profile.avatar}" alt="Profile" class="profile-avatar">`;
    }
    if (profile.username && usernameDisplay) {
      usernameDisplay.textContent = profile.username;
    }
  }
}

function initializeProfileDropdown() {
  const profileButton = document.querySelector(".profile-button");
  const profileDropdown = document.querySelector(".profile-dropdown");

  if (profileButton && profileDropdown) {
    profileButton.addEventListener("click", () => {
      profileDropdown.classList.toggle("show");
    });

    document.addEventListener("click", (e) => {
      if (
        !profileButton.contains(e.target) &&
        !profileDropdown.contains(e.target)
      ) {
        profileDropdown.classList.remove("show");
      }
    });
  }
}

async function updateProfile(event) {
  event.preventDefault();

  const username = document.getElementById("username").value;
  const avatarFile = document.getElementById("avatar").files[0];
  const bio = document.getElementById("bio").value;
  const walletAddress = localStorage.getItem("walletAddress");

  const formData = new FormData();
  formData.append("username", username);
  formData.append("walletAddress", walletAddress);
  formData.append("bio", bio);
  if (avatarFile) {
    formData.append("avatar", avatarFile);
  }

  try {
    const response = await fetch("http://localhost:8000/api/update-profile", {
      method: "POST",
      body: formData,
    });

    if (!response.ok) {
      throw new Error("Failed to update profile");
    }

    const result = await response.json();

    document.getElementById("navbarUsername").textContent = result.username;
    if (result.avatar) {
      document.querySelector(".wallet-avatar").src = result.avatar;
    }

    alert("Profile updated successfully!");
  } catch (error) {
    console.error("Error updating profile:", error);
    alert("Failed to update profile");
  }
}

window.ProfileManager = ProfileManager;

document.addEventListener("DOMContentLoaded", function () {
  checkWalletConnection();
});

document.addEventListener("DOMContentLoaded", function () {
  const profileForm = document.getElementById("profileForm");
  if (profileForm) {
    profileForm.addEventListener("submit", updateProfile);
  }
});
