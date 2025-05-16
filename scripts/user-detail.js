document.addEventListener("DOMContentLoaded", async function () {
  const urlParams = new URLSearchParams(window.location.search);
  const walletAddress = urlParams.get("address");

  if (!walletAddress) {
    console.error("No wallet address provided");
    return;
  }

  // Load user info
  try {
    const response = await fetch(
      `http://localhost:8000/api/user/${walletAddress}`
    );
    const userData = await response.json();

    // Update user info in the UI
    const username = userData.username || "Unknown User";
    document.getElementById("username").textContent = username;
    document.getElementById("walletAddress").textContent = walletAddress;
    document.getElementById("userBio").textContent =
      userData.bio || "No bio provided";
    if (userData.avatar) {
      document.getElementById("userAvatar").src = userData.avatar;
    }

    // Cập nhật title của trang
    document.title = `${username}'s Profile | NFT Mall`;
  } catch (error) {
    console.error("Error loading user info:", error);
    // Nếu không load được user info, dùng địa chỉ ví cho title
    document.title = `${walletAddress.slice(0, 6)}...${walletAddress.slice(
      -4
    )} | NFT Mall`;
  }

  // Load NFTs
  try {
    document.getElementById("onSaleLoading").style.display = "block";
    document.getElementById("ownedLoading").style.display = "block";

    await Promise.all([
      loadOnSaleNFTs(walletAddress),
      loadOwnedNFTs(walletAddress),
    ]);
  } catch (error) {
    console.error("Error loading NFTs:", error);
  }

  // Tab switching
  const tabBtns = document.querySelectorAll(".tab-btn");
  tabBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      tabBtns.forEach((b) => b.classList.remove("active"));
      document.querySelectorAll(".tab-content").forEach((content) => {
        content.classList.remove("active");
      });

      btn.classList.add("active");
      const tabId = btn.getAttribute("data-tab");
      document.getElementById(tabId).classList.add("active");
    });
  });

  // Copy wallet address functionality
  const walletAddressElement = document.getElementById("walletAddress");
  if (walletAddressElement) {
    walletAddressElement.addEventListener("click", async function () {
      try {
        await navigator.clipboard.writeText(this.textContent);
        this.classList.add("copied");
        setTimeout(() => {
          this.classList.remove("copied");
        }, 2000);
      } catch (err) {
        console.error("Failed to copy:", err);
      }
    });
  }
});

async function loadOnSaleNFTs(walletAddress) {
  const grid = document.getElementById("onSaleGrid");
  const loading = document.getElementById("onSaleLoading");

  try {
    loading.style.display = "flex";
    const response = await fetch(`http://localhost:8000/api/nfts`);
    const allNfts = await response.json();

    const onSaleNfts = allNfts.filter(
      (nft) =>
        nft &&
        nft.walletAddress &&
        nft.walletAddress.toLowerCase() === walletAddress.toLowerCase() &&
        nft.is_listed === true
    );

    loading.style.display = "none";

    if (onSaleNfts.length === 0) {
      grid.innerHTML = `
        <div class="no-nfts-message">
          <p>No NFTs currently on sale</p>
          <small>When you list your NFTs for sale, they will appear here</small>
        </div>
      `;
      return;
    }

    await renderNFTs(onSaleNfts, grid);
  } catch (error) {
    console.error("Error loading on sale NFTs:", error);
    loading.innerHTML = `
      <div class="loading-container loading-error">
        <div class="loading-text">Error loading NFTs</div>
      </div>
    `;
  }
}

async function loadOwnedNFTs(walletAddress) {
  const grid = document.getElementById("ownedGrid");
  const loading = document.getElementById("ownedLoading");

  try {
    loading.style.display = "flex";
    const response = await fetch(`http://localhost:8000/api/nfts`);
    const allNfts = await response.json();

    const ownedNfts = allNfts.filter(
      (nft) =>
        nft &&
        nft.walletAddress &&
        nft.walletAddress.toLowerCase() === walletAddress.toLowerCase()
    );

    loading.style.display = "none";

    if (ownedNfts.length === 0) {
      grid.innerHTML = `
        <div class="no-nfts-message">
          <p>No NFTs owned</p>
          <small>NFTs you own will appear here</small>
        </div>
      `;
      return;
    }

    await renderNFTs(ownedNfts, grid);
  } catch (error) {
    console.error("Error loading owned NFTs:", error);
    loading.innerHTML =
      '<i class="fas fa-exclamation-circle"></i> Error loading NFTs';
    loading.style.color = "#dc3545";
  }
}

async function renderNFTs(nfts, container) {
  container.innerHTML = "";

  if (!Array.isArray(nfts) || nfts.length === 0) {
    container.innerHTML = '<p class="no-nfts">No NFTs found</p>';
    return;
  }

  for (const nft of nfts) {
    try {
      const nftCard = document.createElement("div");
      nftCard.className = "nft-card";

      nftCard.innerHTML = `
        <div class="nft-image">
          <img src="${
            nft.image
              ? nft.image.replace("ipfs://", "https://ipfs.io/ipfs/")
              : "../assets/placeholder.jpg"
          }" 
               alt="${nft.name || "NFT"}" 
               onerror="this.src='../assets/placeholder.jpg'">
          ${nft.is_listed ? '<span class="on-sale-badge">On Sale</span>' : ""}
        </div>
        <div class="nft-details">
          <div class="collection-name">
            <h3>${nft.name || `NFT #${nft.tokenId}`}</h3>
            ${
              nft.verified
                ? '<i class="fas fa-check-circle verified-badge"></i>'
                : ""
            }
          </div>
          <div class="price-container">
            <div class="price-row">
              <span class="label">Price</span>
              <span class="value">${
                nft.is_listed ? `${nft.price || 0} TIA` : "Not for sale"
              }</span>
            </div>
            <div class="stats-row">
              <span class="views">
                <i class="fas fa-eye"></i> ${nft.views || 0}
              </span>
              <span class="created-at">
                ${
                  nft.created_at
                    ? new Date(nft.created_at).toLocaleDateString()
                    : ""
                }
              </span>
            </div>
          </div>
        </div>
      `;

      // Chuyển hướng khi click vào NFT card
      nftCard.addEventListener("click", () => {
        window.location.href = `../html/nft-details.html?tokenId=${nft.tokenId}`;
      });

      container.appendChild(nftCard);
    } catch (error) {
      console.error(`Error rendering NFT ${nft?.tokenId}:`, error);
    }
  }
}
