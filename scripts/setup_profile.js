let currentProfilePicture = null;

document.addEventListener("DOMContentLoaded", function () {
  const profilePicInput = document.getElementById("profilePicture");
  const imagePreview = document.getElementById("imagePreview");
  const imageActions = document.getElementById("imageActions");

  // Load wallet và profile data cho navbar
  const savedAddress = localStorage.getItem("walletAddress");
  const userProfile = localStorage.getItem("userProfile");

  if (savedAddress) {
    const shortAddress = `${savedAddress.substring(
      0,
      6
    )}...${savedAddress.substring(savedAddress.length - 4)}`;

    // Kiểm tra và load thông tin profile
    if (userProfile) {
      const profile = JSON.parse(userProfile);

      // Cập nhật navbar với username và avatar
      const navbarUsername = document.getElementById("navbarUsername");
      const walletAvatar = document.querySelector(".wallet-avatar");

      if (navbarUsername) {
        navbarUsername.textContent = profile.name?.trim() || shortAddress;
      }
      if (walletAvatar && profile.profilePicture) {
        walletAvatar.src = profile.profilePicture;
      }

      // Load thông tin vào form
      const profileName = document.getElementById("profileName");
      const bio = document.getElementById("bio");

      if (profileName) profileName.value = profile.name || "";
      if (bio) bio.value = profile.bio || "";

      if (profile.profilePicture) {
        currentProfilePicture = profile.profilePicture;
        showImagePreview(profile.profilePicture);
      }
    } else {
      const navbarUsername = document.getElementById("navbarUsername");
      if (navbarUsername) {
        navbarUsername.textContent = shortAddress;
      }
    }

    // Luôn hiển thị full address trong tab wallet
    const walletTabAddress = document.getElementById("walletAddress");
    if (walletTabAddress) {
      walletTabAddress.textContent = savedAddress;
    }
  } else {
    window.location.href = "login.html";
  }

  // Xử lý upload ảnh
  if (profilePicInput) {
    profilePicInput.addEventListener("change", async function (e) {
      const file = e.target.files[0];
      if (file) {
        try {
          // Kiểm tra kích thước file (giới hạn 5MB)
          if (file.size > 5 * 1024 * 1024) {
            throw new Error("File size too large. Maximum size is 5MB");
          }

          // Kiểm tra định dạng file
          if (!file.type.match("image.*")) {
            throw new Error("Only image files are allowed");
          }

          // Đọc và mã hóa file thành base64
          const base64String = await convertToBase64(file);
          currentProfilePicture = base64String;
          showImagePreview(base64String);
        } catch (error) {
          console.error("Error processing image:", error);
          const errorToast = new bootstrap.Toast(
            document.getElementById("errorToast")
          );
          document.querySelector("#errorToast .toast-body").textContent =
            error.message;
          errorToast.show();
        }
      }
    });
  }

  // Hàm chuyển đổi file thành base64
  function convertToBase64(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => {
        const base64String = reader.result;
        resolve(base64String);
      };
      reader.onerror = (error) => reject(error);
      reader.readAsDataURL(file);
    });
  }

  // Xử lý form submit
  const profileForm = document.querySelector(".profile-form");
  if (profileForm) {
    profileForm.addEventListener("submit", async function (e) {
      e.preventDefault();

      const saveBtn = document.querySelector(".save-btn");
      saveBtn.innerHTML =
        '<span class="spinner-border spinner-border-sm me-2"></span>Saving...';
      saveBtn.disabled = true;

      try {
        const profileName = document.getElementById("profileName");
        const bio = document.getElementById("bio");
        const walletAddress = localStorage.getItem("walletAddress");

        // Tạo FormData object
        const formData = new FormData();
        formData.append("username", profileName ? profileName.value : "");
        formData.append("walletAddress", walletAddress);
        formData.append("bio", bio ? bio.value : "");

        // Thêm avatar nếu có
        if (
          currentProfilePicture &&
          currentProfilePicture.startsWith("data:image")
        ) {
          // Chuyển base64 thành file
          const response = await fetch(currentProfilePicture);
          const blob = await response.blob();
          formData.append("avatar", blob, "profile.jpg");
        }

        // Gửi request lên server với method POST
        const response = await fetch(
          "http://localhost:8000/api/update-profile",
          {
            method: "POST",
            body: formData,
          }
        );

        if (!response.ok) {
          throw new Error("Failed to update profile on server");
        }

        const result = await response.json();

        // Cập nhật localStorage
        const localProfileData = {
          name: profileName ? profileName.value : "",
          bio: bio ? bio.value : "",
          profilePicture: result.avatar || currentProfilePicture,
        };
        localStorage.setItem("userProfile", JSON.stringify(localProfileData));

        // Cập nhật navbar
        const navbarUsername = document.getElementById("navbarUsername");
        const walletAvatar = document.querySelector(".wallet-avatar");
        const shortAddress = `${walletAddress.substring(
          0,
          6
        )}...${walletAddress.substring(walletAddress.length - 4)}`;

        if (navbarUsername) {
          navbarUsername.textContent =
            localProfileData.name?.trim() || shortAddress;
        }
        if (walletAvatar && result.avatar) {
          walletAvatar.src = result.avatar;
        }

        // Hiển thị success toast
        const successToast = new bootstrap.Toast(
          document.getElementById("successToast")
        );
        successToast.show();

        // Hiển thị trạng thái success
        saveBtn.innerHTML = '<i class="fas fa-check me-2"></i>Saved!';
        saveBtn.classList.remove("btn-primary");
        saveBtn.classList.add("btn-success");

        // Reset button sau 2 giây
        setTimeout(() => {
          saveBtn.innerHTML = "Save Changes";
          saveBtn.classList.remove("btn-success");
          saveBtn.classList.add("btn-primary");
          saveBtn.disabled = false;
        }, 2000);
      } catch (error) {
        console.error("Error saving profile:", error);
        // Hiển thị error toast
        const errorToast = new bootstrap.Toast(
          document.getElementById("errorToast")
        );
        document.querySelector("#errorToast .toast-body").textContent =
          error.message;
        errorToast.show();

        saveBtn.innerHTML = "Save Changes";
        saveBtn.disabled = false;
      }
    });
  }
});

function showImagePreview(src) {
  const imagePreview = document.getElementById("imagePreview");
  const imageActions = document.getElementById("imageActions");
  if (!src || !imagePreview) return;

  imagePreview.innerHTML = `
        <img src="${src}" alt="Profile Preview" style="width: 200px; height: 200px; object-fit: cover; border-radius: 12px;">
    `;
  if (imageActions) imageActions.classList.remove("d-none");
}

function removeImage() {
  const profilePicInput = document.getElementById("profilePicture");
  const imagePreview = document.getElementById("imagePreview");
  const imageActions = document.getElementById("imageActions");

  if (profilePicInput) profilePicInput.value = "";
  currentProfilePicture = null;

  if (imagePreview) {
    imagePreview.innerHTML = `
            <label for="profilePicture" class="upload-placeholder">
                <i class="fas fa-cloud-upload-alt"></i>
                <span>Upload an image...</span>
            </label>
        `;
  }
  if (imageActions) imageActions.classList.add("d-none");
}

async function loadCurrentProfile() {
  const walletAddress = localStorage.getItem("walletAddress");
  if (!walletAddress) {
    window.location.href = "login.html";
    return;
  }

  try {
    const response = await fetch(
      `http://localhost:8000/api/user/${walletAddress}`
    );
    if (response.ok) {
      const userData = await response.json();

      // Điền thông tin vào form
      document.getElementById("username").value = userData.username || "";
      document.getElementById("bio").value = userData.bio || "";

      // Hiển thị avatar hiện tại nếu có
      if (userData.avatar) {
        document.querySelector(".profile-avatar img").src = userData.avatar;
      }
    }
  } catch (error) {
    console.error("Error loading profile:", error);
  }
}

async function handleProfileUpdate(event) {
  event.preventDefault();

  const walletAddress = localStorage.getItem("walletAddress");
  if (!walletAddress) {
    alert("Please connect your wallet first");
    return;
  }

  const formData = new FormData();
  formData.append("username", document.getElementById("username").value);
  formData.append("walletAddress", walletAddress);
  formData.append("bio", document.getElementById("bio").value);

  const avatarInput = document.getElementById("avatar");
  if (avatarInput.files.length > 0) {
    formData.append("avatar", avatarInput.files[0]);
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

    // Cập nhật UI
    if (result.avatar) {
      document.querySelector(".profile-avatar img").src = result.avatar;
    }

    alert("Profile updated successfully!");

    // Chuyển hướng về trang account sau khi cập nhật thành công
    window.location.href = "account.html";
  } catch (error) {
    console.error("Error updating profile:", error);
    alert("Failed to update profile: " + error.message);
  }
}

// Preview ảnh avatar trước khi upload
document.getElementById("avatar").addEventListener("change", function (event) {
  const file = event.target.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = function (e) {
      document.querySelector(".profile-avatar img").src = e.target.result;
    };
    reader.readAsDataURL(file);
  }
});
