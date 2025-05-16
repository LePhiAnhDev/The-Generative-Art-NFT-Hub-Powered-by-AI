window.onload = function () {
  checkWalletConnection();
};

function checkWalletConnection() {
  const savedAddress = localStorage.getItem("walletAddress");
  const userProfile = localStorage.getItem("userProfile");

  if (savedAddress) {
    const shortAddress = `${savedAddress.substring(
      0,
      6
    )}...${savedAddress.substring(savedAddress.length - 4)}`;

    // Ẩn nút connect và hiển thị wallet info
    document.getElementById("connectWalletBtn").style.display = "none";
    document.getElementById("walletInfo").style.display = "block";

    // Kiểm tra và hiển thị username hoặc address
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
      // Nếu chưa có profile, hiển thị short address
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

function disconnectWallet() {
  localStorage.removeItem("walletAddress");
  showConnectButton();
  console.log("Wallet disconnected");
}

// Khi connect lại, chỉ cần kiểm tra và sử dụng profile cũ nếu có
async function connectWallet() {
  try {
    const accounts = await window.ethereum.request({
      method: "eth_requestAccounts",
    });
    const account = accounts[0];
    localStorage.setItem("walletAddress", account);

    // Kiểm tra xem có profile cũ không
    const existingProfile = localStorage.getItem("userProfile");
    if (!existingProfile) {
      // Nếu chưa có profile, tạo profile mới với địa chỉ ví
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

// Lắng nghe sự kiện thay đổi tài khoản từ MetaMask
if (typeof window.ethereum !== "undefined") {
  window.ethereum.on("accountsChanged", function (accounts) {
    if (accounts.length === 0) {
      disconnectWallet();
    } else {
      localStorage.setItem("walletAddress", accounts[0]);
      checkWalletConnection();
    }
  });
}

document.addEventListener("DOMContentLoaded", async function () {
  // Tách thành hai hàm riêng biệt
  async function fetchTopArtists() {
    try {
      console.log("Fetching top artists...");
      const artistsResponse = await fetch(
        "http://localhost:8000/api/top-artists"
      );
      
      if (!artistsResponse.ok) {
        throw new Error(`HTTP error! Status: ${artistsResponse.status}`);
      }
      
      const topArtists = await artistsResponse.json();
      console.log("API Response:", topArtists);
  
      const artistsGrid = document.querySelector(".artists-grid");
      if (!artistsGrid) {
        console.error("Artists grid not found in DOM");
        return;
      }
  
      artistsGrid.innerHTML = "";
  
      if (!Array.isArray(topArtists) || topArtists.length === 0) {
        console.log("No artists data returned from API");
        artistsGrid.innerHTML =
          '<div class="error-message">Không có nghệ sĩ nào.</div>';
        return;
      }
  
      console.log(`Processing ${topArtists.length} artists...`);
  
      topArtists.forEach((artist, index) => {
        console.log(`Artist ${index}:`, artist);
        
        // Handle both snake_case and camelCase field names
        const walletAddress = artist.walletAddress || artist.wallet_address || "unknown";
        const username = artist.username || "Unnamed Artist";
        const avatar = artist.avatar || "../assets/artists/default.jpg";
        const isVerified = artist.isVerified || artist.is_verified || false;
        const totalSales = artist.totalSalesValue || artist.total_sales_value || 0;
        const nftCount = artist.nftCount || artist.nft_count || 0;
  
        console.log(`Processed Artist ${index}:`, {
          walletAddress,
          username,
          avatar,
          totalSales,
          nftCount
        });
  
        const artistCard = `
          <div class="artist-card" data-wallet-address="${walletAddress}">
              <div class="artist-avatar">
                  <img src="${avatar}" alt="${username}" 
                       onerror="this.onerror=null; this.src='../assets/artists/default.jpg';" />
              </div>
              <div class="artist-info" data-wallet-address="${walletAddress}">
                  <div class="artist-name">
                      <h3>${username}</h3>
                      ${
                        isVerified
                          ? '<i class="bi bi-patch-check-fill artist-verified-badge"></i>'
                          : ""
                      }
                  </div>
                  <div class="artist-stats">
                      <span class="floor">Total Sales: <span>${
                        typeof totalSales === 'number' ? totalSales.toFixed(2) : "0.00"
                      } TIA</span></span>
                      <span class="volume">NFTs: <span>${nftCount}</span></span>
                  </div>
              </div>
          </div>
        `;
        artistsGrid.innerHTML += artistCard;
      });
  
      console.log(`Successfully rendered ${topArtists.length} artists`);
  
      // Setup profile redirects after rendering
      if (window.setupProfileRedirects) {
        window.setupProfileRedirects();
      }
    } catch (error) {
      console.error("Error in fetchTopArtists:", error);
      const artistsGrid = document.querySelector(".artists-grid");
      if (artistsGrid) {
        artistsGrid.innerHTML =
          '<div class="error-message">Không thể tải thông tin nghệ sĩ. Vui lòng thử lại sau.</div>';
      }
    }
  }

  async function fetchTopNFTs() {
    try {
      console.log("Starting to fetch top NFTs...");
      const nftsResponse = await fetch("http://localhost:8000/api/top-nfts");
      const topNFTs = await nftsResponse.json();
      console.log("Received top NFTs from API:", topNFTs);

      const nftGrid = document.querySelector(".nft-grid");
      if (!nftGrid) {
        console.error("NFT grid container not found in DOM");
        return;
      }

      nftGrid.innerHTML = "";

      if (!Array.isArray(topNFTs) || topNFTs.length === 0) {
        console.log("No NFTs found in response");
        nftGrid.innerHTML =
          '<div class="error-message">Không có NFT nào.</div>';
        return;
      }

      console.log(`Processing ${topNFTs.length} NFTs...`);

      for (const nft of topNFTs) {
        if (!nft.metadataUri) {
          console.warn(`NFT ${nft.tokenId} has no metadata URI, skipping...`);
          continue;
        }

        try {
          console.log(`\nProcessing NFT ${nft.tokenId}:`);
          console.log("Original metadata URI:", nft.metadataUri);

          const metadata = await fetchMetadata(nft.metadataUri);
          console.log("Fetched metadata:", metadata);

          // Tạo media element dựa trên loại file
          let mediaElement;
          switch (metadata.fileType) {
            case "3d":
              console.log("Creating 3D model viewer element");
              mediaElement = `
                <div class="nft-image">
                  <model-viewer
                    src="${metadata.image}"
                    auto-rotate
                    camera-controls
                    shadow-intensity="1"
                    environment-image="neutral"
                    exposure="0.8"
                    camera-orbit="0deg 75deg 105%"
                    min-camera-orbit="auto auto 5%"
                    max-camera-orbit="auto auto 200%"
                    interaction-prompt="none"
                    ar
                    ar-modes="webxr scene-viewer quick-look"
                    style="width: 100%; height: 100%; background-color: transparent;"
                    crossorigin="anonymous"
                    alt="${metadata.name}"
                  ></model-viewer>
                </div>`;
              break;
            case "video":
              console.log("Creating video element");
              mediaElement = `
                <div class="nft-image">
                  <video class="nft-media" autoplay muted loop playsinline>
                    <source src="${metadata.image}" type="video/mp4">
                    <img src="../assets/placeholder.jpg" alt="Video fallback" class="nft-media">
                  </video>
                </div>`;
              break;
            case "audio":
              console.log("Creating audio element with cover");
              console.log("Cover image URL:", metadata.cover);
              mediaElement = `
                <div class="nft-image">
                  <div class="audio-cover-container" style="position: relative; width: 100%; height: 100%;">
                    ${metadata.cover ? 
                      `<img src="${metadata.cover}" 
                           alt="${metadata.name}" 
                           class="nft-media" 
                           style="width: 100%; height: 100%; object-fit: cover;" 
                           onerror="this.onerror=null; this.src='../assets/placeholder.jpg'; console.log('Cover image load failed:', this.src);">` :
                      `<div class="audio-placeholder" style="width: 100%; height: 100%; display: flex; align-items: center; justify-content: center; background-color: #f8f9fa;">
                        <svg width="50%" height="50%" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
                          <path d="M9 18V5l12-2v13" stroke="#0066FF" stroke-linecap="round" stroke-linejoin="round"/>
                          <circle cx="6" cy="18" r="3" stroke="#0066FF"/>
                          <circle cx="18" cy="16" r="3" stroke="#0066FF"/>
                        </svg>
                      </div>`
                    }
                  </div>
                </div>`;
              break;
            default:
              console.log("Creating image element");
              mediaElement = `
                <div class="nft-image">
                  <img src="${metadata.image}" 
                    alt="${metadata.name || "Unnamed NFT"}" 
                    class="nft-media"
                    onerror="this.onerror=null; this.src='../assets/placeholder.jpg'; console.log('Image load failed, using placeholder');">
                </div>`;
          }

          console.log("Generated media element:", mediaElement);

          const nftCard = `
            <div class="nft-item ${
              metadata.fileType === "3d" ? "model-3d" : ""
            }">
              <a href="nft-details.html?tokenId=${
                nft.tokenId
              }" class="nft-card">
                ${mediaElement}
                <div class="nft-details">
                  <div class="collection-name">
                    <h3>${metadata.name || "Unnamed NFT"}</h3>
                  </div>
                  <div class="price-container">
                    <div class="price-row">
                      <span class="label">Views</span>
                      <span class="label">Price</span>
                    </div>
                    <div class="price-row">
                      <span class="value">${nft.views || 0}</span>
                      <span class="value">${
                        nft.price ? Number(nft.price).toFixed(2) : "0.00"
                      } TIA</span>
                    </div>
                  </div>
                </div>
              </a>
            </div>
          `;

          console.log("Adding NFT card to grid");
          nftGrid.innerHTML += nftCard;

          // Xử lý sự kiện cho model-viewer nếu là 3D NFT
          if (metadata.fileType === "3d") {
            console.log("Setting up 3D model viewer events");
            const modelViewer = nftGrid.querySelector(
              `model-viewer[src="${metadata.image}"]`
            );

            if (modelViewer) {
              modelViewer.addEventListener("error", () => {
                console.error("Model viewer error");
                modelViewer.style.display = "none";
                const placeholder = document.createElement("div");
                placeholder.className = "nft-media-wrapper";
                placeholder.innerHTML = `
                  <img src="../assets/placeholder.jpg" 
                       alt="Failed to load 3D model" 
                       class="nft-media">
                `;
                console.log("Replacing failed 3D model with placeholder");
                modelViewer.parentElement.insertBefore(
                  placeholder,
                  modelViewer
                );
                modelViewer.remove();
              });

              modelViewer.addEventListener("load", () => {
                console.log("3D model loaded successfully");
                modelViewer.style.display = "block";
                modelViewer.dismissPoster();
                modelViewer.autoRotate = true;
                modelViewer.cameraOrbit = "auto auto 105%";
                modelViewer.autoRotateDelay = 0;
                modelViewer.rotationPerSecond = "30deg";
              });
            } else {
              console.warn("Model viewer element not found after creation");
            }
          }
        } catch (metadataError) {
          console.error(`Error processing NFT ${nft.tokenId}:`, metadataError);
          console.log("Creating fallback card for failed NFT");

          // Thêm fallback khi có lỗi metadata
          const fallbackCard = `
            <div class="nft-item">
              <a href="nft-details.html?tokenId=${
                nft.tokenId
              }" class="nft-card">
                <div class="nft-image">
                  <div class="nft-media-wrapper">
                    <img src="../assets/placeholder.jpg" 
                      alt="Failed to load NFT" 
                      class="nft-media">
                  </div>
                </div>
                <div class="nft-details">
                  <div class="collection-name">
                    <h3>Unknown NFT</h3>
                  </div>
                  <div class="price-container">
                    <div class="price-row">
                      <span class="label">Views</span>
                      <span class="label">Price</span>
                    </div>
                    <div class="price-row">
                      <span class="value">${nft.views || 0}</span>
                      <span class="value">${
                        nft.price ? Number(nft.price).toFixed(2) : "0.00"
                      } TIA</span>
                    </div>
                  </div>
                </div>
              </a>
            </div>
          `;
          nftGrid.innerHTML += fallbackCard;
        }
      }
      console.log("Finished processing all NFTs");
    } catch (error) {
      console.error("Fatal error fetching top NFTs:", error);
      const nftGrid = document.querySelector(".nft-grid");
      if (nftGrid) {
        nftGrid.innerHTML =
          '<div class="error-message">Không thể tải thông tin NFT. Vui lòng thử lại sau.</div>';
      }
    }
  }

  // Gọi cả hai hàm độc lập với nhau
  await Promise.all([fetchTopArtists(), fetchTopNFTs()]).catch((error) => {
    console.error("Error executing fetch operations:", error);
  });
});

// Khi render creator info
function renderCreatorInfo(creator) {
  return `
        <div class="creator-info" data-wallet-address="${
          creator.walletAddress
        }">
            <img src="${creator.avatar || "../assets/user.png"}" alt="${
    creator.username
  }" class="creator-avatar">
            <div class="creator-details">
                <h3>${creator.username}</h3>
                <p class="creator-stats">${creator.totalSales} Sales</p>
            </div>
        </div>
    `;
}

async function fetchMetadata(tokenURI) {
  const gateway = "https://ipfs.io/ipfs/";

  try {
    const url = tokenURI.replace("ipfs://", gateway);
    const response = await fetch(url, {
      timeout: 3000,
      headers: { Accept: "application/json" },
    });

    if (!response.ok) throw new Error("Fetch failed");
    const metadata = await response.json();
    console.log("Raw metadata:", metadata);

    // Determine file type based on metadata
    let fileType = "image"; // Default to image
    if (
      metadata.modelType === "GLB" ||
      metadata.modelDetails?.fileExtension?.toLowerCase() === "glb" ||
      metadata.modelDetails?.fileExtension?.toLowerCase() === "gltf" ||
      metadata.fileType === "model/3d" ||
      metadata.fileType === "3d"
    ) {
      fileType = "3d";
      console.log("Detected 3D model");
    } else if (
      metadata.fileType === "video/mp4" ||
      metadata.image?.toLowerCase().endsWith(".mp4")
    ) {
      fileType = "video";
      console.log("Detected video");
    } else if (
      metadata.fileType === "audio/mpeg" ||
      metadata.image?.toLowerCase().endsWith(".mp3")
    ) {
      fileType = "audio";
      console.log("Detected audio");
    }

    // Handle cover image with multiple possible metadata fields
    let coverImage = null;
    if (metadata.coverImage) {
      coverImage = metadata.coverImage;
    } else if (metadata.cover) {
      coverImage = metadata.cover;
    } else if (metadata.thumbnail) {
      coverImage = metadata.thumbnail;
    }

    // Convert cover image URL if it exists
    if (coverImage) {
      coverImage = coverImage.replace("ipfs://", gateway);
      console.log("Found cover image:", coverImage);
    }

    const processedMetadata = {
      name: metadata.name || "Unnamed NFT",
      image:
        metadata.image?.replace("ipfs://", gateway) ||
        "../assets/placeholder.jpg",
      description: metadata.description || "No description",
      attributes: metadata.attributes || [],
      fileType: fileType,
      modelDetails: metadata.modelDetails || null,
      cover: coverImage,
    };

    console.log("Processed metadata:", processedMetadata);
    return processedMetadata;
  } catch (error) {
    console.warn(`Failed to fetch metadata: ${error}`);
    return {
      name: "Unknown NFT",
      image: "../assets/placeholder.jpg",
      description: "Metadata unavailable",
      attributes: [],
      fileType: "image",
      cover: null,
    };
  }
}

// Add CSS styles for loading indicator and model-viewer
const style = document.createElement("style");
style.textContent = `
  /* Regular NFT card styles */
  .nft-item {
    width: 100%;
    position: relative;
    border-radius: 16px;
    background: white;
    overflow: hidden;
    border: 1px solid rgba(0, 0, 0, 0.15);
    transition: all 0.3s ease;
  }

  .nft-item:hover {
    transform: translateY(-5px);
    box-shadow: 0 12px 30px rgba(0, 0, 0, 0.15);
    border-color: rgba(0, 0, 0, 0.2);
  }

  .nft-card {
    background: white;
    border: none;
    border-radius: 16px;
    overflow: hidden;
    transition: all 0.3s ease;
    cursor: pointer;
    position: relative;
    height: 100%;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.04);
  }

  .nft-image {
    position: relative;
    width: 100%;
    padding-top: 100%;
    overflow: hidden;
    border-radius: 16px 16px 0 0;
    background: #f8f9fa;
  }

  .nft-media {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  /* Audio NFT specific styles */
  .audio-cover-container {
    position: absolute !important;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: #f8f9fa;
  }

  .audio-placeholder {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #f8f9fa;
  }

  .audio-placeholder svg {
    width: 60%;
    height: 60%;
    opacity: 0.7;
  }

  .audio-indicator {
    position: absolute;
    bottom: 10px;
    right: 10px;
    background: rgba(0,0,0,0.6);
    color: white;
    padding: 5px 10px;
    border-radius: 12px;
    font-size: 12px;
    z-index: 2;
  }

  /* 3D model specific styles */
  .nft-item.model-3d .nft-image {
    background: #f8f9fa;
  }

  .nft-item.model-3d model-viewer {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    --poster-color: transparent;
    background-color: transparent;
  }

  /* NFT details styles */
  .nft-details {
    padding: 16px;
    background: white;
  }

  .collection-name {
    margin-bottom: 8px;
  }

  .collection-name h3 {
    font-size: 15px;
    font-weight: 600;
    color: #000;
    margin: 0;
  }

  .price-container {
    display: flex;
    flex-direction: column;
    gap: 2px;
  }

  .price-row {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .price-row .label {
    font-size: 13px;
    color: #707a83;
  }

  .price-row .value {
    font-size: 14px;
    color: #000;
    font-weight: 500;
  }
`;
document.head.appendChild(style);
