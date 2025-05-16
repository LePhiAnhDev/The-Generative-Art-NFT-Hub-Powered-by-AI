let allNFTs = [];
let isLoading = false;
let hasInitialized = false;
let currentPage = 0;
let totalNFTs = 0;
const PAGE_SIZE = 20;

// Thêm biến để theo dõi filter hiện tại
let activeFilters = {
  status: "all",
  blockchain: [],
  minPrice: null,
  maxPrice: null
};

// Lưu cache NFT metadata để tránh load lại
const metadataCache = {};

// Khởi tạo các event listeners
document.addEventListener("DOMContentLoaded", function () {
  if (hasInitialized) return;
  hasInitialized = true;

  initializeFilters();
  setupPriceInputs();
  loadListedNFTs(true);  // true = reset pagination
  
  // Add intersection observer for infinite scrolling
  setupInfiniteScroll();
});

function setupInfiniteScroll() {
  // Thêm sentinel element để detect khi scroll đến cuối
  const sentinel = document.createElement('div');
  sentinel.id = 'sentinel';
  sentinel.style.height = '20px';
  document.querySelector('.explore-content-area').appendChild(sentinel);
  
  const observer = new IntersectionObserver((entries) => {
    if (entries[0].isIntersecting && !isLoading) {
      loadMoreNFTs();
    }
  });
  
  observer.observe(sentinel);
}

function initializeFilters() {
  document
    .querySelectorAll(".explore-blockchain-options input")
    .forEach((input) => {
      input.addEventListener("change", handleBlockchainFilter);
    });

  document
    .querySelectorAll(".explore-status-options input")
    .forEach((input) => {
      input.addEventListener("change", handleStatusFilter);
    });

  document
    .getElementById("applyPriceFilter")
    .addEventListener("click", handlePriceFilter);
}

async function loadListedNFTs(reset = false) {
  if (isLoading) return;
  
  const nftGrid = document.getElementById("nftGrid");
  const loadingSpinner = document.getElementById("loadingSpinner");
  const noNfts = document.getElementById("no-nfts");

  if (!nftGrid || !loadingSpinner || !noNfts) {
    console.error("Missing required DOM elements");
    return;
  }

  try {
    isLoading = true;
    loadingSpinner.style.display = "flex";
    loadingSpinner.style.opacity = "1";
    
    if (reset) {
      currentPage = 0;
      nftGrid.innerHTML = "";
      allNFTs = [];
    }
    
    noNfts.style.display = "none";

    // Xây dựng query params cho filters
    const params = new URLSearchParams();
    params.append('skip', currentPage * PAGE_SIZE);
    params.append('limit', PAGE_SIZE);
    
    if (activeFilters.minPrice !== null) {
      params.append('min_price', activeFilters.minPrice);
    }
    
    if (activeFilters.maxPrice !== null) {
      params.append('max_price', activeFilters.maxPrice);
    }
    
    if (activeFilters.status === 'buy-now') {
      params.append('is_listed', 'true');
    } else if (activeFilters.status === 'off-sale') {
      params.append('is_listed', 'false');
    }

    console.log("Fetching NFTs with params:", params.toString());

    // Sử dụng API filter thay vì API nfts
    const response = await fetch(`http://localhost:8000/api/nfts/filter?${params.toString()}`);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    console.log("Received data:", data);
    
    if (!Array.isArray(data) || data.length === 0) {
      if (currentPage === 0) {
        noNfts.style.display = "block";
      }
      return;
    }

    // Đây là sự khác biệt với code cũ - không mong đợi cấu trúc {items, total}
    // mà xử lý trực tiếp mảng nhận được
    totalNFTs = data.length; // Giả sử đây là tổng số có thể load được
    
    // Thêm NFTs mới vào mảng hiện tại
    allNFTs = [...allNFTs, ...data];
    currentPage++;
    
    // Render NFTs mới
    await renderNewNFTs(data);
    
    // Nếu không có NFTs hiển thị, hiển thị thông báo
    if (allNFTs.length === 0) {
      noNfts.style.display = "block";
    }
  } catch (error) {
    console.error("Error loading NFTs:", error);
    noNfts.textContent =
      "Unable to load NFTs. Please check your connection and try again.";
    noNfts.style.display = "block";
  } finally {
    isLoading = false;
    loadingSpinner.style.opacity = "0";
    setTimeout(() => {
      loadingSpinner.style.display = "none";
    }, 300);
  }
}

// Function để load thêm NFTs khi scroll
function loadMoreNFTs() {
  if (isLoading) return;
  loadListedNFTs(false);
}

// Render chỉ NFTs mới
async function renderNewNFTs(nfts) {
  const nftGrid = document.getElementById("nftGrid");
  if (!nftGrid) return;

  try {
    const BATCH_SIZE = 5; // Render theo batch nhỏ hơn
    for (let i = 0; i < nfts.length; i += BATCH_SIZE) {
      const batch = nfts.slice(i, i + BATCH_SIZE);
      
      // Sử dụng Promise.all để load metadata song song
      const batchHTML = await Promise.all(
        batch.map(async (nft) => {
          try {
            // Load metadata nếu cần
            if (!nft.name && nft.metadataUri) {
              await loadMetadata(nft);
            }
            return createNFTCard(nft);
          } catch (err) {
            console.error("Error creating NFT card:", err);
            return ""; // Return empty string if card creation fails
          }
        })
      );

      const validCards = batchHTML.filter((card) => card !== "");
      if (validCards.length > 0) {
        nftGrid.insertAdjacentHTML("beforeend", validCards.join(""));
        requestAnimationFrame(() => initializeMediaElements());
      }

      if (i + BATCH_SIZE < nfts.length) {
        await new Promise((resolve) => setTimeout(resolve, 50));
      }
    }

    initializeLazyLoading();
  } catch (error) {
    console.error("Error rendering NFTs:", error);
  }
}

// Thêm hàm load metadata riêng
async function loadMetadata(nft) {
  try {
    if (!nft.metadataUri) return;
    
    // Kiểm tra cache trước
    if (metadataCache[nft.metadataUri]) {
      Object.assign(nft, metadataCache[nft.metadataUri]);
      return;
    }
    
    // Convert IPFS uri to HTTP
    const http_url = nft.metadataUri.replace("ipfs://", "https://ipfs.io/ipfs/");
    
    // Sử dụng AbortController để set timeout
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 5000); // 5 seconds timeout
    
    const response = await fetch(http_url, { signal: controller.signal });
    clearTimeout(timeoutId);
    
    if (response.ok) {
      const metadata = await response.json();
      // Lưu vào cache
      metadataCache[nft.metadataUri] = {
        name: metadata.name || "Unnamed NFT",
        description: metadata.description || "",
        image: metadata.image || "../assets/placeholder.jpg",
        fileType: metadata.fileType || nft.fileType || "image"
      };
      
      // Update nft object
      Object.assign(nft, metadataCache[nft.metadataUri]);
    } else {
      throw new Error(`Failed to fetch metadata: ${response.status}`);
    }
  } catch (error) {
    console.warn(`Error loading metadata for NFT ${nft.tokenId}:`, error);
    // Set default values on error
    nft.name = nft.name || "Unnamed NFT";
    nft.description = nft.description || "No description available";
    nft.image = nft.image || "../assets/placeholder.jpg";
  }
}

function initializeLazyLoading() {
  if (!('IntersectionObserver' in window)) return;
  
  const imageObserver = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const img = entry.target;
          if (img.dataset.src) {
            // Preload image
            const preloadImg = new Image();
            preloadImg.onload = () => {
              img.src = img.dataset.src;
              img.removeAttribute("data-src");
              img.classList.remove("loading");
            };
            preloadImg.onerror = () => {
              img.src = "../assets/placeholder.jpg";
              img.removeAttribute("data-src");
              img.classList.remove("loading");
            };
            preloadImg.src = img.dataset.src;
            observer.unobserve(img);
          }
        }
      });
    },
    {
      rootMargin: "200px 0px", // Preload images 200px before they come into view
      threshold: 0.01,
    }
  );

  document.querySelectorAll(".explore-nft-preview[data-src]").forEach((img) => {
    imageObserver.observe(img);
  });
}

function determineFileType(nft) {
  // Sử dụng fileType từ server nếu có
  if (nft.fileType) {
    if (nft.fileType === "3d" || nft.fileType === "glb" || nft.fileType === "gltf") {
      return "3d";
    }
    if (nft.fileType === "video" || nft.fileType === "mp4") {
      return "video";
    }
  }
  
  // Fallback to URL check
  if (nft.image) {
    const extension = nft.image.split(".").pop().toLowerCase();
    
    // Check for 3D model files
    if (["glb", "gltf"].includes(extension)) {
      return "3d";
    }
    
    // Check for video files
    if (["mp4", "webm", "ogg"].includes(extension)) {
      return "video";
    }
  }
  
  // Default to image
  return "image";
}

function convertIpfsToHttp(url) {
  if (!url) return "../assets/placeholder.jpg";
  if (typeof url === 'string' && url.startsWith("ipfs://")) {
    return url.replace("ipfs://", "https://ipfs.io/ipfs/");
  }
  return url;
}

async function createNFTCard(nft) {
  try {
    if (!nft) return "";

    const {
      tokenId = "",
      price = 0,
      views = 0,
      name = "Unnamed NFT",
      description = "No description",
      image = "../assets/placeholder.jpg",
    } = nft;

    const mediaUrl = convertIpfsToHttp(image);
    const fileType = determineFileType(nft);
    let mediaElement;

    // Simplify media element to improve performance
    switch (fileType) {
      case "3d":
        // 3D models are expensive - use a thumbnail initially
        mediaElement = `
          <div class="nft-image">
            <img 
              class="explore-nft-preview loading"
              src="../assets/placeholder.jpg"
              data-src="${mediaUrl}"
              alt="${name || 'NFT'}"
              loading="lazy"
              onerror="this.onerror=null; this.src='../assets/placeholder.jpg';"
            >
            <div class="model-badge">3D</div>
          </div>`;
        break;

      case "video":
        // Videos are expensive - use a thumbnail initially
        mediaElement = `
          <div class="nft-image">
            <img 
              class="explore-nft-preview loading"
              src="../assets/placeholder.jpg"
              data-src="${mediaUrl.replace('.mp4', '.jpg') || mediaUrl}"
              alt="${name || 'NFT'}"
              loading="lazy"
              onerror="this.onerror=null; this.src='../assets/placeholder.jpg';"
            >
            <div class="video-badge"><i class="bi bi-play-fill"></i></div>
          </div>`;
        break;

      default:
        mediaElement = `
          <div class="nft-image">
            <img 
              class="explore-nft-preview loading"
              src="../assets/placeholder.jpg"
              data-src="${mediaUrl}"
              alt="${name || 'NFT'}"
              loading="lazy"
              onerror="this.onerror=null; this.src='../assets/placeholder.jpg';"
            >
          </div>`;
    }

    // Simplify card structure
    const card = `
      <div class="explore-nft-card" data-token-id="${tokenId}" data-file-type="${fileType}">
        <a href="../html/nft-details.html?tokenId=${tokenId}">
          <div class="explore-card-media">
            ${mediaElement}
          </div>
          <div class="explore-card-content">
            <div class="explore-card-header">
              <div class="explore-collection-info">
                <h6 class="explore-nft-name">${name || 'Unnamed NFT'}</h6>
              </div>
            </div>
            <div class="explore-price-info">
              <div class="explore-current-price">
                <span class="explore-price-label">Price</span>
                <span class="explore-price-value">${Number(price || 0).toFixed(3)} TIA</span>
              </div>
              <div class="explore-highest-bid">
                <span class="explore-price-label">Views</span>
                <span class="explore-price-value">${views || 0}</span>
              </div>
            </div>
          </div>
        </a>
      </div>`;

    return card;
  } catch (error) {
    console.error("Error creating NFT card:", error);
    return "";
  }
}

function initializeMediaElements() {
  // Hạn chế xử lý media elements để cải thiện hiệu suất
  // Sẽ load đầy đủ media chỉ khi user click vào chi tiết NFT
}

// Filter Handlers
function handleBlockchainFilter(event) {
  const blockchain = event.target.value;

  if (event.target.checked) {
    activeFilters.blockchain.push(blockchain);
  } else {
    activeFilters.blockchain = activeFilters.blockchain.filter(
      (b) => b !== blockchain
    );
  }

  loadListedNFTs(true); // Reset và load lại
}

function handleStatusFilter(event) {
  const status = event.target.value;
  activeFilters.status = status;
  loadListedNFTs(true); // Reset và load lại
}

function handlePriceFilter() {
  const minPriceInput = document.getElementById("minPrice");
  const maxPriceInput = document.getElementById("maxPrice");

  // Lấy giá trị và chuyển sang số
  const minPrice = parseFloat(minPriceInput.value);
  const maxPrice = parseFloat(maxPriceInput.value);

  // Kiểm tra giá trị hợp lệ
  if (minPrice && maxPrice && minPrice > maxPrice) {
    showNotification(
      "Minimum price cannot be greater than maximum price",
      "error"
    );
    return;
  }

  // Cập nhật filters
  activeFilters.minPrice = !isNaN(minPrice) ? minPrice : null;
  activeFilters.maxPrice = !isNaN(maxPrice) ? maxPrice : null;

  // Reset và load lại
  loadListedNFTs(true);
}

// Notification Helper
function showNotification(message, type = "info") {
  const notification = document.createElement("div");
  notification.className = `explore-notification ${type}`;
  notification.textContent = message;
  document.body.appendChild(notification);
  setTimeout(() => notification.remove(), 3000);
}

// Thêm validation cho input fields
function setupPriceInputs() {
  const priceInputs = document.querySelectorAll(".explore-price-input");

  priceInputs.forEach((input) => {
    // Chỉ cho phép nhập số và dấu chấm
    input.addEventListener("input", (e) => {
      e.target.value = e.target.value.replace(/[^0-9.]/g, "");

      // Đảm bảo chỉ có một dấu chấm
      const dots = e.target.value.match(/\./g);
      if (dots && dots.length > 1) {
        e.target.value = e.target.value.slice(0, -1);
      }

      // Giới hạn số chữ số thập phân
      const parts = e.target.value.split(".");
      if (parts[1] && parts[1].length > 3) {
        e.target.value = `${parts[0]}.${parts[1].slice(0, 3)}`;
      }
    });
  });
}

// Add CSS styles for optimized display
const optimizedStyles = document.createElement("style");
optimizedStyles.textContent = `
  .model-badge, .video-badge {
    position: absolute;
    top: 10px;
    right: 10px;
    background: rgba(0,0,0,0.7);
    color: white;
    padding: 3px 8px;
    border-radius: 4px;
    font-size: 12px;
  }
  
  .video-badge {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 30px;
    height: 30px;
    border-radius: 50%;
  }
  
  #sentinel {
    width: 100%;
    height: 20px;
  }
  
  .nft-image {
    position: relative;
    width: 100%;
    padding-top: 100%;
    background: #f8f9fa;
    overflow: hidden;
  }
  
  .explore-nft-preview {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.3s ease;
  }
  
  .explore-nft-preview.loading {
    filter: blur(5px);
  }
  
  .explore-nft-card:hover .explore-nft-preview {
    transform: scale(1.05);
  }
  
  /* Error notification styles */
  .explore-notification {
    position: fixed;
    bottom: 20px;
    right: 20px;
    padding: 12px 20px;
    background: #333;
    color: white;
    border-radius: 4px;
    z-index: 1000;
    box-shadow: 0 4px 8px rgba(0,0,0,0.2);
    animation: fadeIn 0.3s forwards;
  }
  
  .explore-notification.error {
    background: #f44336;
  }
  
  .explore-notification.success {
    background: #4caf50;
  }
  
  @keyframes fadeIn {
    from { opacity: 0; transform: translateY(10px); }
    to { opacity: 1; transform: translateY(0); }
  }
`;

document.head.appendChild(optimizedStyles);