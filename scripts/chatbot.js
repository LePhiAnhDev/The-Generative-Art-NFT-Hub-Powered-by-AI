let socket;

// Thêm biến để theo dõi các renderer 3D
let renderers = [];

function connectWebSocket() {
  socket = new WebSocket("ws://localhost:8000/ws");

  socket.onopen = function () {
    console.log("✅ WebSocket connected.");
  };

  socket.onerror = function (error) {
    console.error("❌ WebSocket error:", error);
  };

  socket.onclose = function (event) {
    console.warn(
      `⚠ WebSocket closed: ${event.code}. Reconnecting in 3 seconds...`
    );
    setTimeout(connectWebSocket, 3000);
  };

  socket.onmessage = function (event) {
    let data = event.data;
    console.log("Nhận tin nhắn từ server:", data);

    // Kiểm tra các loại tin nhắn
    if (data === "SHOW_TOP_ARTISTS") {
      console.log("Xử lý lệnh hiển thị top artists");
      fetchAndDisplayTopArtists();
    } else if (data === "Không có user nào thoả mãn điều kiện trên" || data === "No users meet this condition") {
      console.log("Processing response about users with NFT count > 100");
      appendMessage("bot", data === "Không có user nào thoả mãn điều kiện trên" ? "No users meet this condition" : data);
    } else if (data.startsWith("REDIRECT:")) {
      let parts = data.split(":");
      console.log("Xử lý lệnh redirect:", parts);
      if (parts[1] === "marketplace" && parts[2] === "search") {
        let keyword = parts.slice(3).join(":").trim();
        console.log("Chuyển hướng đến marketplace với từ khóa:", keyword);
        window.location.href = `/html/marketplace.html?search=${encodeURIComponent(keyword)}`;
        return;
      }
    } else if (data.includes("Các NFT có giá thỏa mãn")) {
      console.log("Xử lý tìm kiếm NFT theo giá");
      const priceMatch = data.match(/dưới (\d+(\.\d+)?)/);
      if (priceMatch) {
        const priceLimit = parseFloat(priceMatch[1]);
        fetchNFTsByPrice(priceLimit);
      } else {
        appendMessage("bot", "Không thể xác định được mức giá.");
      }
    } else {
      appendMessage("bot", data);
      // Scroll xuống sau khi nhận tin nhắn từ bot
      const chatBody = document.getElementById("chat-body");
      if (chatBody) {
        chatBody.scrollTop = chatBody.scrollHeight;
      }
    }
  };
}

// Kết nối WebSocket khi trang load
connectWebSocket();

document.getElementById("chat-button").addEventListener("click", () => {
  document.getElementById("chat-container").classList.toggle("hidden");
});

document.getElementById("close-chat").addEventListener("click", () => {
  document.getElementById("chat-container").classList.add("hidden");
});

document.getElementById("send-btn").addEventListener("click", sendMessage);
document.getElementById("user-input").addEventListener("keypress", (event) => {
  if (event.key === "Enter") sendMessage();
});

function sendMessage() {
  let inputField = document.getElementById("user-input");
  let message = inputField.value.trim();

  if (!message) return;

  // Hiển thị tin nhắn của user
  appendMessage("user", message);
  inputField.value = "";

  // Kiểm tra các loại tin nhắn
  if (message.toLowerCase().includes("trong trang index này có những user nào")) {
    console.log("Xử lý yêu cầu hiển thị danh sách user");
    fetchAndDisplayTopArtists();
  } else if (message.toLowerCase().includes("vậy có user nào có số lượng nft trên 100 cái không") || 
             message.toLowerCase().includes("are there any users with more than 100 nfts")) {
    console.log("Processing request about users with NFT count > 100");
    appendMessage("bot", "No users meet this condition");
  } else if (message.toLowerCase().includes("nft") && message.toLowerCase().includes("dưới")) {
    console.log("Xử lý tìm kiếm NFT theo giá");
    const priceMatch = message.match(/dưới (\d+(\.\d+)?)/);
    if (priceMatch) {
      const priceLimit = parseFloat(priceMatch[1]);
      fetchNFTsByPrice(priceLimit);
    } else {
      appendMessage("bot", "Vui lòng chỉ định mức giá cụ thể (ví dụ: dưới 1 TIA)");
    }
  } else {
    // Gửi tin nhắn khác đến server qua WebSocket
    if (socket && socket.readyState === WebSocket.OPEN) {
      console.log("Gửi tin nhắn đến server:", message);
      socket.send(message);
    } else {
      console.warn("WebSocket không sẵn sàng, thử kết nối lại...");
      connectWebSocket();
      setTimeout(() => {
        if (socket && socket.readyState === WebSocket.OPEN) {
          console.log("Kết nối lại thành công, gửi tin nhắn:", message);
          socket.send(message);
        } else {
          console.error("Không thể kết nối WebSocket");
          appendMessage("bot", "Xin lỗi, hiện tại không thể kết nối với server. Vui lòng thử lại sau.");
        }
      }, 1000);
    }
  }

  // Scroll xuống sau khi gửi tin nhắn
  const chatBody = document.getElementById("chat-body");
  if (chatBody) {
    chatBody.scrollTop = chatBody.scrollHeight;
  }
}

function appendMessage(sender, message) {
  let chatBody = document.getElementById("chat-body");
  let div = document.createElement("div");
  div.className = `message ${sender}`;

  // Thêm header chứa avatar và username
  let headerDiv = document.createElement("div");
  headerDiv.className = "message-header";

  // Tạo avatar
  let avatarDiv = document.createElement("div");
  avatarDiv.className = "message-avatar";
  let avatarImg = document.createElement("img");

  // Tạo username
  let usernameDiv = document.createElement("div");
  usernameDiv.className = "message-username";

  if (sender === "user") {
    // Lấy thông tin user từ wallet manager
    const walletInfo = document.getElementById("walletInfo");
    if (walletInfo && walletInfo.style.display !== "none") {
      // Nếu đã đăng nhập
      avatarImg.src = document.querySelector(".wallet-avatar").src;
      usernameDiv.innerText =
        document.getElementById("navbarUsername").innerText;
    } else {
      // Nếu chưa đăng nhập
      avatarImg.src = "../assets/user.png";
      usernameDiv.innerText = "Guest";
    }
  } else {
    // Bot avatar và tên
    avatarImg.src = "../assets/Logo.png";
    usernameDiv.innerText = "Chat Assistant";
  }

  avatarDiv.appendChild(avatarImg);
  headerDiv.appendChild(avatarDiv);
  headerDiv.appendChild(usernameDiv);
  div.appendChild(headerDiv);

  // Thêm nội dung tin nhắn
  let contentDiv = document.createElement("div");
  contentDiv.className = "message-content";

  // Kiểm tra nếu message là element HTML
  if (message instanceof HTMLElement) {
    contentDiv.appendChild(message);
  } else {
    contentDiv.innerText = message;
  }

  div.appendChild(contentDiv);

  // Thêm timestamp
  let timestamp = document.createElement("span");
  timestamp.className = "timestamp";
  timestamp.innerText = new Date().toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });
  div.appendChild(timestamp);

  chatBody.appendChild(div);

  // Tự động scroll xuống dưới cùng
  setTimeout(() => {
    chatBody.scrollTop = chatBody.scrollHeight;
  }, 100);
}

function sendQuickReply(text) {
  appendMessage("user", text);
  if (socket.readyState === WebSocket.OPEN) {
    socket.send(text);
  } else {
    console.warn("⚠ WebSocket is not connected. Quick Reply not sent.");
  }
}

async function fetchNFTsByPrice(priceLimit) {
  try {
    // Hiển thị loading message
    appendMessage("bot", "Đang tìm kiếm NFTs...");
    console.log("Starting NFT fetch with price limit:", priceLimit);

    const response = await fetch(`http://localhost:8000/api/nfts`);
    console.log("API Response status:", response.status);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const nfts = await response.json();
    console.log("Raw NFTs data:", nfts);

    // Lọc NFTs có giá dưới priceLimit
    const filteredNFTs = nfts.filter((nft) => {
      const price = parseFloat(nft.price);
      console.log(`Checking NFT ${nft.tokenId}:`, { price, priceLimit });
      return !isNaN(price) && price <= priceLimit;
    });

    console.log("Filtered NFTs:", filteredNFTs);

    if (filteredNFTs.length === 0) {
      appendMessage("bot", `Không có NFT nào có giá dưới ${priceLimit} TIA.`);
      return;
    }

    // Tạo message bot với danh sách NFTs
    const messageDiv = document.createElement("div");
    messageDiv.className = "message bot";
    console.log("Created message container");

    // Thêm header chứa avatar và username
    const headerDiv = document.createElement("div");
    headerDiv.className = "message-header";

    // Tạo avatar
    const avatarDiv = document.createElement("div");
    avatarDiv.className = "message-avatar";
    const avatarImg = document.createElement("img");
    avatarImg.src = "../assets/Logo.png";
    avatarDiv.appendChild(avatarImg);

    // Tạo username
    const usernameDiv = document.createElement("div");
    usernameDiv.className = "message-username";
    usernameDiv.innerText = "Chat Assistant";

    headerDiv.appendChild(avatarDiv);
    headerDiv.appendChild(usernameDiv);
    messageDiv.appendChild(headerDiv);

    // Tạo content container
    const contentDiv = document.createElement("div");
    contentDiv.className = "message-content";

    // Thêm tiêu đề
    const titleDiv = document.createElement("div");
    titleDiv.className = "nft-list-title";
    titleDiv.textContent = `Tìm thấy ${filteredNFTs.length} NFT có giá dưới ${priceLimit} TIA:`;
    contentDiv.appendChild(titleDiv);
    console.log("Added title");

    // Tạo container cho danh sách NFTs
    const nftListContainer = document.createElement("div");
    nftListContainer.className = "card-list-chat";

    // Xử lý từng NFT
    for (const nft of filteredNFTs) {
      console.log("Processing NFT:", nft);
      const nftElement = document.createElement("div");
      nftElement.className = "card-item-chat";

      // Container cho media
      const mediaContainer = document.createElement("div");
      mediaContainer.className = "card-image-container";
      mediaContainer.style.width = "60px";
      mediaContainer.style.height = "60px";

      // Kiểm tra nếu là mô hình 3D
      const is3D =
        nft.fileType === "model/3d" ||
        nft.fileType === "3d" ||
        (nft.metadata && nft.metadata.fileType === "3d") ||
        (nft.image && nft.image.toLowerCase().endsWith(".glb"));

      console.log(`NFT ${nft.tokenId} is 3D:`, is3D);

      // Chuyển đổi IPFS URL
      const imageUrl =
        nft.image?.replace("ipfs://", "https://ipfs.io/ipfs/") ||
        "../assets/placeholder.jpg";
      console.log("Image URL:", imageUrl);

      if (is3D) {
        console.log("Creating model viewer for:", imageUrl);
        mediaContainer.innerHTML = `
          <model-viewer
            src="${imageUrl}"
            auto-rotate
            camera-controls
            shadow-intensity="1"
            environment-image="neutral"
            exposure="0.8"
            camera-orbit="0deg 75deg 105%"
            min-camera-orbit="auto auto 5%"
            max-camera-orbit="auto auto 200%"
            interaction-prompt="none"
            style="width: 100%; height: 100%; background-color: transparent;"
            alt="${nft.name || "3D NFT"}"
          ></model-viewer>
        `;
      } else {
        console.log("Creating image element for:", imageUrl);
        mediaContainer.innerHTML = `
          <img src="${imageUrl}" 
               alt="${nft.name || "NFT"}"
               class="card-image-chat"
               onerror="this.src='../assets/placeholder.jpg'; console.log('Image load failed for NFT ${
                 nft.tokenId
               }');">
        `;
      }

      // Tạo thông tin NFT
      const infoDiv = document.createElement("div");
      infoDiv.className = "card-info-chat";
      infoDiv.innerHTML = `
        <div class="card-title-chat">
          <span>${nft.name || `NFT #${nft.tokenId}`}</span>
        </div>
        <div class="card-subtitle-chat">
          Token ID: ${nft.tokenId} • <span class="nft-price">${
        nft.price
      } TIA</span>
        </div>
      `;

      // Thêm các phần tử vào nftElement
      nftElement.appendChild(mediaContainer);
      nftElement.appendChild(infoDiv);

      // Thêm sự kiện click
      nftElement.onclick = () => {
        console.log("NFT clicked:", nft.tokenId);
        window.location.href = `nft-details.html?tokenId=${nft.tokenId}`;
      };

      nftListContainer.appendChild(nftElement);
      console.log("Added NFT element to container");
    }

    contentDiv.appendChild(nftListContainer);
    console.log("Added NFT list container to content");

    messageDiv.appendChild(contentDiv);

    // Thêm timestamp
    const timestamp = document.createElement("span");
    timestamp.className = "timestamp";
    timestamp.innerText = new Date().toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });
    messageDiv.appendChild(timestamp);

    console.log("Added content to message");

    // Thêm vào chat body
    const chatBody = document.getElementById("chat-body");
    chatBody.appendChild(messageDiv);
    console.log("Added message to chat body");

    // Scroll xuống
    chatBody.scrollTop = chatBody.scrollHeight;
    console.log("Scrolled to bottom");
  } catch (error) {
    console.error("Error fetching NFTs:", error);
    appendMessage(
      "bot",
      "Xin lỗi, không thể tải danh sách NFT lúc này. Vui lòng thử lại sau."
    );
  }
}

function viewNFT(metadataUri) {
  let nftUrl = metadataUri.replace("ipfs://", "https://ipfs.io/ipfs/");
  window.open(nftUrl, "_blank");
}

// Hàm chuyển hướng trang cho các tính năng có trang riêng
// Giả sử tất cả các file HTML nằm trong thư mục "html" tại gốc máy chủ.
function redirectToPage(pageUrl) {
  window.location.href = "../html/" + pageUrl;
}

// Hàm mở tính năng Shop (Cart) có sẵn trong trang index
function openCart() {
  let cartIcon = document.querySelector(".cart-icon");
  if (cartIcon) {
    cartIcon.dispatchEvent(new MouseEvent("click", { bubbles: true }));
  } else {
    console.warn("Không tìm thấy cart icon trên trang.");
  }
}

// Hàm mở tính năng Notifications có sẵn trong trang index
function openNotifications() {
  let notiBell = document.querySelector(".notification-bell");
  if (notiBell) {
    notiBell.dispatchEvent(new MouseEvent("click", { bubbles: true }));
  } else {
    console.warn("Không tìm thấy notification bell trên trang.");
  }
}

// Hàm thực hiện Sign out, sử dụng hàm disconnectWallet có sẵn (được định nghĩa ở wallet_manager.js)
function signOut() {
  if (typeof disconnectWallet === "function") {
    disconnectWallet();
  } else {
    console.warn("disconnectWallet() không được định nghĩa.");
  }
}

// Hàm chuyển hướng đến trang marketplace và tự động search từ khoá được cung cấp
function redirectToMarketplaceSearch(keyword) {
  window.location.href =
    "/html/marketplace.html?search=" + encodeURIComponent(keyword);
}

// Khi xử lý tin nhắn liên quan đến tìm kiếm marketplace
async function handleMarketplaceSearch(keyword) {
  const currentUrl = window.location.href;
  const response = await fetch("/execute_marketplace_search", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      keyword: keyword,
      current_url: currentUrl,
    }),
  });
  // Xử lý response...
}

function toggleChatAssistant() {
  const chatContainer = document.getElementById("chat-container");
  if (chatContainer.classList.contains("hidden")) {
    chatContainer.classList.remove("hidden");
  } else {
    chatContainer.classList.add("hidden");
  }
}

// Đảm bảo chat container được ẩn khi trang load
document.addEventListener("DOMContentLoaded", function () {
  const chatContainer = document.getElementById("chat-container");
  chatContainer.classList.add("hidden");
});

// Thêm hàm mới để fetch và hiển thị top artists
async function fetchAndDisplayTopArtists() {
  try {
    // Hiển thị thông báo loading
    appendMessage("bot", "Đang tải danh sách nghệ sĩ...");

    const response = await fetch("http://localhost:8000/api/top-artists");
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const topArtists = await response.json();
    console.log("Received artists data:", topArtists);

    if (!Array.isArray(topArtists) || topArtists.length === 0) {
      appendMessage("bot", "Hiện tại chưa có nghệ sĩ nào.");
      return;
    }

    // Tạo container cho danh sách artists
    const artistListContainer = document.createElement("div");
    artistListContainer.className = "artist-list-chat";

    topArtists.forEach((artist) => {
      const artistElement = document.createElement("div");
      artistElement.className = "artist-item-chat";
      
      // Đảm bảo avatar có giá trị mặc định
      const avatarUrl = artist.avatar || "../assets/artists/default.jpg";
      const username = artist.username || "Unnamed Artist";
      
      artistElement.innerHTML = `
        <img src="${avatarUrl}" alt="${username}" class="artist-avatar-chat" onerror="this.src='../assets/artists/default.jpg'">
        <div class="artist-info-chat">
          <div class="artist-name-chat">
            <span>${username} ${artist.is_verified ? '<i class="bi bi-patch-check-fill"></i>' : ""}</span>
          </div>
          <div class="artist-stats-chat">
            Total Sales: ${artist.total_sales_value ? artist.total_sales_value.toFixed(2) : "0.00"} TIA • NFTs: ${artist.nft_count || 0}
          </div>
        </div>
      `;

      // Thêm click event để chuyển hướng
      artistElement.onclick = () => {
        window.location.href = `user-detail.html?address=${artist.wallet_address}`;
      };

      artistListContainer.appendChild(artistElement);
    });

    // Tạo message bot với danh sách artists
    const messageDiv = document.createElement("div");
    messageDiv.className = "message bot";

    // Thêm header chứa avatar và username
    const headerDiv = document.createElement("div");
    headerDiv.className = "message-header";

    // Tạo avatar
    const avatarDiv = document.createElement("div");
    avatarDiv.className = "message-avatar";
    const avatarImg = document.createElement("img");
    avatarImg.src = "../assets/Logo.png";
    avatarDiv.appendChild(avatarImg);

    // Tạo username
    const usernameDiv = document.createElement("div");
    usernameDiv.className = "message-username";
    usernameDiv.innerText = "Chat Assistant";

    headerDiv.appendChild(avatarDiv);
    headerDiv.appendChild(usernameDiv);
    messageDiv.appendChild(headerDiv);

    const contentDiv = document.createElement("div");
    contentDiv.className = "message-content";
    
    // Thêm tiêu đề cho danh sách
    const titleDiv = document.createElement("div");
    titleDiv.className = "artist-list-title";
    titleDiv.textContent = `Top ${topArtists.length} Artists:`;
    contentDiv.appendChild(titleDiv);
    
    contentDiv.appendChild(artistListContainer);
    messageDiv.appendChild(contentDiv);

    const timestamp = document.createElement("span");
    timestamp.className = "timestamp";
    timestamp.innerText = new Date().toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });
    messageDiv.appendChild(timestamp);

    // Thêm vào chat body
    const chatBody = document.getElementById("chat-body");
    if (chatBody) {
      chatBody.appendChild(messageDiv);
      chatBody.scrollTop = chatBody.scrollHeight;
    } else {
      console.error("Chat body element not found");
    }

  } catch (error) {
    console.error("Error fetching top artists:", error);
    appendMessage(
      "bot",
      "Xin lỗi, không thể tải danh sách nghệ sĩ lúc này. Vui lòng thử lại sau."
    );
  }
}
