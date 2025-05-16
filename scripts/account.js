let currentTab = "collected"; // Mặc định tab

// Thêm biến contract vào đầu file
const contractABI = [
    {
        inputs: [],
        stateMutability: "nonpayable",
        type: "constructor",
    },
    {
        inputs: [],
        name: "ERC721EnumerableForbiddenBatchMint",
        type: "error",
    },
    {
        inputs: [
            {
                internalType: "address",
                name: "sender",
                type: "address",
            },
            {
                internalType: "uint256",
                name: "tokenId",
                type: "uint256",
            },
            {
                internalType: "address",
                name: "owner",
                type: "address",
            },
        ],
        name: "ERC721IncorrectOwner",
        type: "error",
    },
    {
        inputs: [
            {
                internalType: "address",
                name: "operator",
                type: "address",
            },
            {
                internalType: "uint256",
                name: "tokenId",
                type: "uint256",
            },
        ],
        name: "ERC721InsufficientApproval",
        type: "error",
    },
    {
        inputs: [
            {
                internalType: "address",
                name: "approver",
                type: "address",
            },
        ],
        name: "ERC721InvalidApprover",
        type: "error",
    },
    {
        inputs: [
            {
                internalType: "address",
                name: "operator",
                type: "address",
            },
        ],
        name: "ERC721InvalidOperator",
        type: "error",
    },
    {
        inputs: [
            {
                internalType: "address",
                name: "owner",
                type: "address",
            },
        ],
        name: "ERC721InvalidOwner",
        type: "error",
    },
    {
        inputs: [
            {
                internalType: "address",
                name: "receiver",
                type: "address",
            },
        ],
        name: "ERC721InvalidReceiver",
        type: "error",
    },
    {
        inputs: [
            {
                internalType: "address",
                name: "sender",
                type: "address",
            },
        ],
        name: "ERC721InvalidSender",
        type: "error",
    },
    {
        inputs: [
            {
                internalType: "uint256",
                name: "tokenId",
                type: "uint256",
            },
        ],
        name: "ERC721NonexistentToken",
        type: "error",
    },
    {
        inputs: [
            {
                internalType: "address",
                name: "owner",
                type: "address",
            },
            {
                internalType: "uint256",
                name: "index",
                type: "uint256",
            },
        ],
        name: "ERC721OutOfBoundsIndex",
        type: "error",
    },
    {
        inputs: [
            {
                internalType: "address",
                name: "owner",
                type: "address",
            },
        ],
        name: "OwnableInvalidOwner",
        type: "error",
    },
    {
        inputs: [
            {
                internalType: "address",
                name: "account",
                type: "address",
            },
        ],
        name: "OwnableUnauthorizedAccount",
        type: "error",
    },
    {
        anonymous: false,
        inputs: [
            {
                indexed: true,
                internalType: "address",
                name: "owner",
                type: "address",
            },
            {
                indexed: true,
                internalType: "address",
                name: "approved",
                type: "address",
            },
            {
                indexed: true,
                internalType: "uint256",
                name: "tokenId",
                type: "uint256",
            },
        ],
        name: "Approval",
        type: "event",
    },
    {
        anonymous: false,
        inputs: [
            {
                indexed: true,
                internalType: "address",
                name: "owner",
                type: "address",
            },
            {
                indexed: true,
                internalType: "address",
                name: "operator",
                type: "address",
            },
            {
                indexed: false,
                internalType: "bool",
                name: "approved",
                type: "bool",
            },
        ],
        name: "ApprovalForAll",
        type: "event",
    },
    {
        anonymous: false,
        inputs: [
            {
                indexed: false,
                internalType: "uint256",
                name: "_fromTokenId",
                type: "uint256",
            },
            {
                indexed: false,
                internalType: "uint256",
                name: "_toTokenId",
                type: "uint256",
            },
        ],
        name: "BatchMetadataUpdate",
        type: "event",
    },
    {
        anonymous: false,
        inputs: [
            {
                indexed: true,
                internalType: "uint256",
                name: "tokenId",
                type: "uint256",
            },
            {
                indexed: true,
                internalType: "address",
                name: "seller",
                type: "address",
            },
        ],
        name: "ListingCanceled",
        type: "event",
    },
    {
        anonymous: false,
        inputs: [
            {
                indexed: false,
                internalType: "uint256",
                name: "_tokenId",
                type: "uint256",
            },
        ],
        name: "MetadataUpdate",
        type: "event",
    },
    {
        anonymous: false,
        inputs: [
            {
                indexed: true,
                internalType: "uint256",
                name: "tokenId",
                type: "uint256",
            },
            {
                indexed: true,
                internalType: "address",
                name: "seller",
                type: "address",
            },
        ],
        name: "NFTListed",
        type: "event",
    },
    {
        anonymous: false,
        inputs: [
            {
                indexed: true,
                internalType: "uint256",
                name: "tokenId",
                type: "uint256",
            },
            {
                indexed: true,
                internalType: "address",
                name: "seller",
                type: "address",
            },
            {
                indexed: true,
                internalType: "address",
                name: "buyer",
                type: "address",
            },
            {
                indexed: false,
                internalType: "uint256",
                name: "price",
                type: "uint256",
            },
        ],
        name: "NFTSold",
        type: "event",
    },
    {
        anonymous: false,
        inputs: [
            {
                indexed: true,
                internalType: "address",
                name: "previousOwner",
                type: "address",
            },
            {
                indexed: true,
                internalType: "address",
                name: "newOwner",
                type: "address",
            },
        ],
        name: "OwnershipTransferred",
        type: "event",
    },
    {
        anonymous: false,
        inputs: [
            {
                indexed: true,
                internalType: "address",
                name: "from",
                type: "address",
            },
            {
                indexed: true,
                internalType: "address",
                name: "to",
                type: "address",
            },
            {
                indexed: true,
                internalType: "uint256",
                name: "tokenId",
                type: "uint256",
            },
        ],
        name: "Transfer",
        type: "event",
    },
    {
        inputs: [
            {
                internalType: "address",
                name: "to",
                type: "address",
            },
            {
                internalType: "uint256",
                name: "tokenId",
                type: "uint256",
            },
        ],
        name: "approve",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        inputs: [],
        name: "approveMarketplace",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "address",
                name: "owner",
                type: "address",
            },
        ],
        name: "balanceOf",
        outputs: [
            {
                internalType: "uint256",
                name: "",
                type: "uint256",
            },
        ],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "uint256",
                name: "tokenId",
                type: "uint256",
            },
        ],
        name: "burn",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "uint256",
                name: "tokenId",
                type: "uint256",
            },
        ],
        name: "buyNFT",
        outputs: [],
        stateMutability: "payable",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "uint256",
                name: "tokenId",
                type: "uint256",
            },
        ],
        name: "cancelListing",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "uint256",
                name: "tokenId",
                type: "uint256",
            },
        ],
        name: "getApproved",
        outputs: [
            {
                internalType: "address",
                name: "",
                type: "address",
            },
        ],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "uint256",
                name: "tokenId",
                type: "uint256",
            },
        ],
        name: "getListingInfo",
        outputs: [
            {
                internalType: "address",
                name: "seller",
                type: "address",
            },
            {
                internalType: "uint256",
                name: "price",
                type: "uint256",
            },
            {
                internalType: "bool",
                name: "isListed",
                type: "bool",
            },
        ],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "address",
                name: "owner",
                type: "address",
            },
            {
                internalType: "address",
                name: "operator",
                type: "address",
            },
        ],
        name: "isApprovedForAll",
        outputs: [
            {
                internalType: "bool",
                name: "",
                type: "bool",
            },
        ],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "uint256",
                name: "tokenId",
                type: "uint256",
            },
            {
                internalType: "uint256",
                name: "price",
                type: "uint256",
            },
        ],
        name: "listNFTForSale",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "uint256",
                name: "",
                type: "uint256",
            },
        ],
        name: "listings",
        outputs: [
            {
                internalType: "uint256",
                name: "price",
                type: "uint256",
            },
            {
                internalType: "address",
                name: "seller",
                type: "address",
            },
            {
                internalType: "bool",
                name: "isListed",
                type: "bool",
            },
        ],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "address",
                name: "recipient",
                type: "address",
            },
            {
                internalType: "string",
                name: "metadataURI",
                type: "string",
            },
        ],
        name: "mint",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        inputs: [],
        name: "mintPrice",
        outputs: [
            {
                internalType: "uint256",
                name: "",
                type: "uint256",
            },
        ],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [],
        name: "name",
        outputs: [
            {
                internalType: "string",
                name: "",
                type: "string",
            },
        ],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [],
        name: "owner",
        outputs: [
            {
                internalType: "address",
                name: "",
                type: "address",
            },
        ],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "uint256",
                name: "tokenId",
                type: "uint256",
            },
        ],
        name: "ownerOf",
        outputs: [
            {
                internalType: "address",
                name: "",
                type: "address",
            },
        ],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "string",
                name: "metadataURI",
                type: "string",
            },
        ],
        name: "publicMint",
        outputs: [],
        stateMutability: "payable",
        type: "function",
    },
    {
        inputs: [],
        name: "renounceOwnership",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "address",
                name: "from",
                type: "address",
            },
            {
                internalType: "address",
                name: "to",
                type: "address",
            },
            {
                internalType: "uint256",
                name: "tokenId",
                type: "uint256",
            },
        ],
        name: "safeTransferFrom",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "address",
                name: "from",
                type: "address",
            },
            {
                internalType: "address",
                name: "to",
                type: "address",
            },
            {
                internalType: "uint256",
                name: "tokenId",
                type: "uint256",
            },
            {
                internalType: "bytes",
                name: "data",
                type: "bytes",
            },
        ],
        name: "safeTransferFrom",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "address",
                name: "operator",
                type: "address",
            },
            {
                internalType: "bool",
                name: "approved",
                type: "bool",
            },
        ],
        name: "setApprovalForAll",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "uint256",
                name: "newMintPrice",
                type: "uint256",
            },
        ],
        name: "setMintPrice",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "uint256",
                name: "newTransactionFeePercentage",
                type: "uint256",
            },
        ],
        name: "setTransactionFeePercentage",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "bytes4",
                name: "interfaceId",
                type: "bytes4",
            },
        ],
        name: "supportsInterface",
        outputs: [
            {
                internalType: "bool",
                name: "",
                type: "bool",
            },
        ],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [],
        name: "symbol",
        outputs: [
            {
                internalType: "string",
                name: "",
                type: "string",
            },
        ],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "uint256",
                name: "index",
                type: "uint256",
            },
        ],
        name: "tokenByIndex",
        outputs: [
            {
                internalType: "uint256",
                name: "",
                type: "uint256",
            },
        ],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "address",
                name: "owner",
                type: "address",
            },
            {
                internalType: "uint256",
                name: "index",
                type: "uint256",
            },
        ],
        name: "tokenOfOwnerByIndex",
        outputs: [
            {
                internalType: "uint256",
                name: "",
                type: "uint256",
            },
        ],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "uint256",
                name: "tokenId",
                type: "uint256",
            },
        ],
        name: "tokenURI",
        outputs: [
            {
                internalType: "string",
                name: "",
                type: "string",
            },
        ],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "address",
                name: "owner",
                type: "address",
            },
        ],
        name: "tokensOfOwner",
        outputs: [
            {
                internalType: "uint256[]",
                name: "",
                type: "uint256[]",
            },
        ],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [],
        name: "totalSupply",
        outputs: [
            {
                internalType: "uint256",
                name: "",
                type: "uint256",
            },
        ],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [],
        name: "transactionFeePercentage",
        outputs: [
            {
                internalType: "uint256",
                name: "",
                type: "uint256",
            },
        ],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "address",
                name: "from",
                type: "address",
            },
            {
                internalType: "address",
                name: "to",
                type: "address",
            },
            {
                internalType: "uint256",
                name: "tokenId",
                type: "uint256",
            },
        ],
        name: "transferFrom",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "address",
                name: "from",
                type: "address",
            },
            {
                internalType: "address",
                name: "to",
                type: "address",
            },
            {
                internalType: "uint256",
                name: "tokenId",
                type: "uint256",
            },
            {
                internalType: "uint256",
                name: "salePrice",
                type: "uint256",
            },
        ],
        name: "transferNFT",
        outputs: [],
        stateMutability: "payable",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "address",
                name: "newOwner",
                type: "address",
            },
        ],
        name: "transferOwnership",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "uint256",
                name: "tokenId",
                type: "uint256",
            },
            {
                internalType: "uint256",
                name: "newPrice",
                type: "uint256",
            },
        ],
        name: "updateListingPrice",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        inputs: [],
        name: "withdraw",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
    },
];

const contractAddress = "0xDeE9B116D1D712B4147A8a85A5B960f048D99ff8"; // Thay thế bằng địa chỉ contract NFT của bạn

const PINATA_GATEWAY = "https://gateway.pinata.cloud/ipfs/";

let allNFTs = []; // Lưu trữ tất cả NFTs

// Thêm hàm này vào phạm vi global để có thể gọi từ HTML
window.handleListNFT = async function (tokenId, modalElement) {
    // Lấy giá từ input
    const priceInput = modalElement.querySelector("#listing-price");
    const price = parseFloat(priceInput.value);

    // Kiểm tra giá hợp lệ
    if (!price || price <= 0) {
        showNotification("Vui lòng nhập giá hợp lệ", "error");
        return;
    }

    try {
        // Hiển thị thông báo đang xử lý
        const confirmButton = modalElement.querySelector(".confirm-listing-btn");
        const originalText = confirmButton.textContent;
        confirmButton.textContent = "Processing...";
        confirmButton.disabled = true;

        // Lấy thông tin Web3
        const web3 = new Web3(window.ethereum);
        const accounts = await window.ethereum.request({
            method: "eth_requestAccounts",
        });
        const userAddress = accounts[0];

        // Khởi tạo contract
        const nftContract = new web3.eth.Contract(contractABI, contractAddress);

        // Chuyển đổi giá từ TIA sang Wei
        const priceInWei = web3.utils.toWei(price.toString(), "ether");

        // Kiểm tra phê duyệt và thiết lập nếu cần
        const isApprovedForAll = await nftContract.methods.isApprovedForAll(userAddress, contractAddress).call();
        if (!isApprovedForAll) {
            showNotification("Approving permissions for marketplace...", "info");
            await nftContract.methods.setApprovalForAll(contractAddress, true).send({
                from: userAddress
            });
            showNotification("Successfully approved!", "success");
        }

        // Gọi hàm listNFTForSale từ smart contract
        const tx = await nftContract.methods.listNFTForSale(tokenId, priceInWei).send({
            from: userAddress,
        });

        console.log("Listing transaction:", tx);
        
        // THÊM MỚI: Gọi API để cập nhật cơ sở dữ liệu MongoDB
        try {
            // Xác định baseUrl
            const apiBaseUrl = window.location.hostname.includes('localhost') || 
                               window.location.hostname.includes('127.0.0.1') 
                               ? 'http://localhost:8000' : '';
                               
            const response = await fetch(`${apiBaseUrl}/api/update-nft-listing/${tokenId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    price: price,
                }),
            });
            
            if (!response.ok) {
                const errorText = await response.text();
                console.error("Database update failed:", errorText);
                showNotification("The NFT was posted on the blockchain but the database update failed", "warning");
            } else {
                console.log("Database updated successfully");
            }
        } catch (dbError) {
            console.error("Error updating database:", dbError);
            showNotification("The NFT was posted on the blockchain but the database update failed", "warning");
        }

        // Đóng modal
        modalElement.classList.add("closing");
        setTimeout(() => {
            document.body.removeChild(modalElement);
        }, 300);

        // Hiển thị thông báo thành công
        showNotification("NFT has been successfully listed!", "success");

        // Tải lại danh sách NFT
        loadCollectedNFTs();
    } catch (error) {
        console.error("Error listing NFT:", error);
        showNotification("An error has occurred: " + (error.message || "NFTs cannot be listed for sale"), "error");

        // Khôi phục nút
        const confirmButton = modalElement.querySelector(".confirm-listing-btn");
        confirmButton.textContent = "Confirm Listing";
        confirmButton.disabled = false;
    }
};

// Thêm hàm showNotification nếu chưa có
function showNotification(message, type = "info") {
    // Kiểm tra xem đã có thông báo tương tự chưa để tránh hiển thị trùng lặp
    const existingNotifications = document.querySelectorAll(".notification");
    for (let notif of existingNotifications) {
        if (notif.textContent === message) {
            return; // Nếu đã có thông báo giống hệt thì không hiển thị nữa
        }
    }

    const notification = document.createElement("div");
    notification.className = `notification ${type}`;

    // Thêm icon phù hợp theo loại thông báo
    let icon = "";
    switch (type) {
        case "success":
            icon = '<i class="fas fa-check-circle"></i> ';
            break;
        case "error":
            icon = '<i class="fas fa-exclamation-circle"></i> ';
            break;
        case "info":
            icon = '<i class="fas fa-info-circle"></i> ';
            break;
        default:
            icon = "";
    }

    notification.innerHTML = icon + message;
    document.body.appendChild(notification);

    // Thêm animation hiển thị
    setTimeout(() => {
        notification.classList.add("show");
    }, 10);

    // Tự động ẩn thông báo sau 3 giây
    setTimeout(() => {
        notification.classList.remove("show");
        notification.classList.add("hide");

        // Xóa phần tử khỏi DOM sau khi animation kết thúc
        setTimeout(() => {
            notification.remove();
        }, 300);
    }, 3000);
}

// Initialize tabs
function initializeTabs() {
    console.log("Initializing tabs");
    const tabLinks = document.querySelectorAll(".tabs-nav a");

    tabLinks.forEach((link) => {
        link.addEventListener("click", function (e) {
            e.preventDefault();
            console.log("Tab clicked:", this.getAttribute("href"));

            // Remove active class from all tabs
            document.querySelectorAll(".tabs-nav li").forEach((tab) => {
                tab.classList.remove("active");
            });

            // Add active class to clicked tab
            this.parentElement.classList.add("active");

            // Hide all tab contents
            document.querySelectorAll(".tab-content").forEach((content) => {
                content.style.display = "none";
            });

            // Show selected content
            const tabId = this.getAttribute("href").substring(1);
            const selectedContent = document.getElementById(tabId);
            if (selectedContent) {
                selectedContent.style.display = "block";
                console.log("Showing tab:", tabId);

                // Load appropriate content
                if (tabId === "collected") {
                    loadCollectedNFTs();
                }
            }
        });
    });
}

async function loadCollectedNFTs() {
    const collectedNftsDiv = document.getElementById("collected-nfts");
    const loadingDiv = document.getElementById("loading-nfts");
    const noNftsDiv = document.getElementById("no-nfts");

    try {
        // Hiển thị loading
        loadingDiv.style.display = "block";
        collectedNftsDiv.innerHTML = "";
        noNftsDiv.style.display = "none";

        const web3 = new Web3(window.ethereum);
        const accounts = await window.ethereum.request({
            method: "eth_requestAccounts",
        });
        const userAddress = accounts[0];

        // Lấy NFTs từ smart contract
        const nftContract = new web3.eth.Contract(contractABI, contractAddress);

        // Lấy tổng số NFT của user
        const balance = await nftContract.methods.balanceOf(userAddress).call();
        console.log("NFT balance:", balance);

        if (balance == 0) {
            loadingDiv.style.display = "none";
            noNftsDiv.style.display = "block";
            return;
        }

        // Lấy danh sách token IDs của user
        const tokenIds = await nftContract.methods.tokensOfOwner(userAddress).call();
        console.log("Token IDs:", tokenIds);

        // Load metadata cho từng NFT
        const nftPromises = tokenIds.map(async (tokenId) => {
            try {
                const tokenURI = await nftContract.methods.tokenURI(tokenId).call();
                const metadata = await fetchMetadataWithTimeout(tokenURI);
                const listingInfo = await nftContract.methods.getListingInfo(tokenId).call();

                return {
                    tokenId,
                    metadata,
                    isListed: listingInfo.isListed,
                    price: listingInfo.price,
                };
            } catch (error) {
                console.error(`Error loading NFT ${tokenId}:`, error);
                return null;
            }
        });

        // Chờ tất cả promises hoàn thành
        const nftResults = await Promise.allSettled(nftPromises);

        // Lọc kết quả hợp lệ
        allNFTs = nftResults.filter((result) => result.status === "fulfilled" && result.value).map((result) => result.value);

        // Render NFTs asynchronously
        await renderNFTs(allNFTs);
    } catch (error) {
        console.error("Error loading NFTs:", error);
        collectedNftsDiv.innerHTML = `<p class="error">Error loading NFTs: ${error.message}</p>`;
    } finally {
        loadingDiv.style.display = "none";
    }
}

async function renderNFTs(nfts) {
    const collectedNftsDiv = document.getElementById("collected-nfts");
    collectedNftsDiv.innerHTML = "";

    if (nfts.length === 0) {
        const noResultsDiv = document.createElement("div");
        noResultsDiv.className = "no-results";
        noResultsDiv.textContent = "No NFTs found matching your search";
        collectedNftsDiv.appendChild(noResultsDiv);
        return;
    }

    // Create and append NFT cards
    const cardPromises = nfts.map((nft) => createNFTCard(nft.tokenId, nft.metadata));
    const cards = await Promise.all(cardPromises);

    cards.forEach((card) => {
        collectedNftsDiv.appendChild(card);
    });

    // Initialize videos after all cards are rendered
    setTimeout(() => {
        initializeVideoElements();
    }, 100);
}

// Add this function after renderNFTs function
function initializeVideoElements() {
    // Find all video elements in NFT cards
    const videos = document.querySelectorAll(".nft-card video");

    console.log("Initializing video elements, found:", videos.length);

    videos.forEach((video) => {
        // Make sure video is muted to allow autoplay
        video.muted = true;
        video.loop = true;

        // Add loading event listener
        video.addEventListener("loadeddata", () => {
            console.log("Video loaded successfully in initializeVideoElements");
            const videoContainer = video.closest(".video-container");
            const loadingIndicator = videoContainer?.querySelector(".video-loading");
            if (loadingIndicator) {
                loadingIndicator.style.display = "none";
            }
        });

        // Handle video loading errors
        video.addEventListener("error", (e) => {
            console.error("Error loading video in initializeVideoElements:", e);
            const videoContainer = video.closest(".video-container");
            if (videoContainer) {
                const loadingIndicator = videoContainer.querySelector(".video-loading");
                if (loadingIndicator) {
                    loadingIndicator.style.display = "none";
                }

                videoContainer.innerHTML = `
          <div class="video-error">
            <i class="fas fa-exclamation-triangle"></i>
            <span>Video could not be loaded</span>
          </div>
        `;
            }
        });

        // Try to play the video
        video.play().catch((err) => {
            console.warn("Auto-play was prevented in initializeVideoElements:", err);
            // Add a play button overlay that users can click
            const videoContainer = video.closest(".video-container");
            if (videoContainer) {
                const playButton = document.createElement("div");
                playButton.className = "video-play-button";
                playButton.innerHTML = '<i class="fas fa-play"></i>';
                playButton.addEventListener("click", () => {
                    video.play();
                    playButton.style.display = "none";
                });
                videoContainer.appendChild(playButton);
            }
        });
    });
}

// Sửa lại phần khởi tạo khi trang load
document.addEventListener("DOMContentLoaded", async function () {
    console.log("DOM Content Loaded");

    try {
        await initializeWallet();
        initializeTabs();

        // Thêm event listener cho input search
        const filterInput = document.querySelector(".filter-input");
        if (filterInput) {
            filterInput.addEventListener("input", async function (e) {
                await filterNFTs(e.target.value);
            });
        }

        // Activate first tab by default
        const firstTab = document.querySelector(".tabs-nav a");
        if (firstTab) {
            firstTab.click();
        }
    } catch (error) {
        console.error("Initialization error:", error);
    }
});

async function filterNFTs(searchTerm) {
    if (!searchTerm.trim()) {
        await renderNFTs(allNFTs); // Nếu search term trống, hiển thị tất cả
        return;
    }

    const filteredNFTs = allNFTs.filter((nft) => nft.metadata.name.toLowerCase().includes(searchTerm.toLowerCase()) || nft.tokenId.toString().includes(searchTerm));

    await renderNFTs(filteredNFTs);
}

// Initialize wallet and profile
async function initializeWallet() {
    console.log("Initializing wallet");
    const savedAddress = localStorage.getItem("walletAddress");
    const userProfile = localStorage.getItem("userProfile");

    if (!savedAddress) {
        console.log("No saved wallet address, redirecting to login");
        window.location.href = "login.html";
        return;
    }

    console.log("Wallet address found:", savedAddress);
    const shortAddress = WalletManager.formatAddress(savedAddress);

    const shortAddressElement = document.getElementById("shortAddressDisplay");
    if (shortAddressElement) {
        shortAddressElement.textContent = shortAddress;
    }

    if (userProfile) {
        console.log("User profile found");
        const profile = JSON.parse(userProfile);
        updateProfileUI(profile);
    } else {
        console.log("No user profile, using wallet address");
        updateUIWithWalletAddress(shortAddress);
    }
}

function updateProfileUI(profile) {
    console.log("Updating UI with profile");
    const elements = {
        walletAddress: document.getElementById("walletAddress"),
        navbarAvatar: document.getElementById("navbarUserAvatar"),
        profileName: document.getElementById("profileName"),
        profileBio: document.getElementById("profileBio"),
        profileImage: document.getElementById("profileImage"),
    };

    if (elements.walletAddress) elements.walletAddress.textContent = profile.name;
    if (elements.navbarAvatar && profile.profilePicture) elements.navbarAvatar.src = profile.profilePicture;
    if (elements.profileName) elements.profileName.textContent = profile.name;
    if (elements.profileBio) elements.profileBio.textContent = profile.bio || "No bio yet";
    if (elements.profileImage && profile.profilePicture) elements.profileImage.src = profile.profilePicture;
}

function updateUIWithWalletAddress(address) {
    const shortAddress = WalletManager.formatAddress(address);
    const elements = {
        walletAddress: document.getElementById("walletAddress"),
        profileName: document.getElementById("profileName"),
        profileBio: document.getElementById("profileBio"),
    };

    if (elements.walletAddress) elements.walletAddress.textContent = shortAddress;
    if (elements.profileName) elements.profileName.textContent = shortAddress;
    if (elements.profileBio) elements.profileBio.textContent = "You haven't added a bio yet. Edit your profile to add one.";
}

function copyAddress() {
    const address = WalletManager.getAddress();
    if (address) {
        navigator.clipboard
            .writeText(address)
            .then(() => {
                const copyIcon = document.querySelector(".copy-address i");
                const originalClass = copyIcon.className;
                copyIcon.className = "fas fa-check me-1";

                const tooltip = bootstrap.Tooltip.getInstance(document.querySelector(".copy-address"));
                if (tooltip) {
                    tooltip.setContent({ ".tooltip-inner": "Copied!" });
                }

                setTimeout(() => {
                    copyIcon.className = originalClass;
                    if (tooltip) {
                        tooltip.setContent({ ".tooltip-inner": "Copy address" });
                    }
                }, 2000);
            })
            .catch((err) => console.error("Failed to copy:", err));
    }
}

// NFT loading code (giữ nguyên phần code NFT đã có)

// Hàm phụ trợ để load chi tiết NFT
async function loadNFTDetails(nftContract, userAddress, index) {
    try {
        const tokenId = await nftContract.methods.tokenOfOwnerByIndex(userAddress, index).call();

        // Kiểm tra ownership
        const owner = await nftContract.methods.ownerOf(tokenId).call();
        if (owner.toLowerCase() !== userAddress.toLowerCase()) {
            return null;
        }

        const tokenURI = await nftContract.methods.tokenURI(tokenId).call();
        const metadata = await fetchMetadataWithTimeout(tokenURI);

        // Kiểm tra tính hợp lệ của metadata
        if (!metadata.name || !metadata.image) {
            console.warn(`Skipping NFT ${tokenId} due to invalid metadata`);
            return null;
        }

        return {
            tokenId,
            metadata,
            owner,
            tokenURI,
        };
    } catch (error) {
        console.error(`Error loading NFT details for index ${index}:`, error);
        return null;
    }
}

// Hàm fetch metadata với timeout và fallback
async function fetchMetadataWithTimeout(tokenURI, timeout = 5000) {
    if (!tokenURI) {
        console.warn("Empty tokenURI");
        return getDefaultMetadata();
    }

    const ipfsGateway = "https://ipfs.io/ipfs/";
    const url = tokenURI.replace("ipfs://", ipfsGateway);

    try {
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), timeout);

        const response = await fetch(url, {
            signal: controller.signal,
            headers: { Accept: "application/json" },
        });

        clearTimeout(timeoutId);

        if (!response.ok) throw new Error("Network response was not ok");

        const metadata = await response.json();
        console.log("Fetched metadata:", metadata);

        // Process metadata based on file type
        const fileType = metadata.fileType || "Unknown";
        const isAudio = fileType === "audio/mpeg" || (metadata.image && metadata.image.toLowerCase().endsWith(".mp3"));
        const isVideo = fileType === "video/mp4" || (metadata.image && metadata.image.toLowerCase().endsWith(".mp4"));

        // Create the normalized metadata object
        const normalizedMetadata = {
            name: metadata.name || "Unnamed NFT",
            description: metadata.description || "No description available",
            image: normalizeIpfsUrl(metadata.image),
            attributes: Array.isArray(metadata.attributes) ? metadata.attributes : [],
            fileType: fileType,
        };

        // Add audio-specific metadata if available
        if (isAudio) {
            // Check for cover image in different possible properties
            const coverImage = metadata.cover || metadata.coverImage || metadata.thumbnail || null;
            console.log("Original audio cover image:", coverImage);

            normalizedMetadata.cover = coverImage ? normalizeIpfsUrl(coverImage) : null;
            console.log("Normalized audio cover image:", normalizedMetadata.cover);

            normalizedMetadata.audioDuration = metadata.audioDuration || metadata.duration || null;
            normalizedMetadata.audioBitrate = metadata.audioBitrate || metadata.bitrate || null;
        }

        // Add video-specific metadata if available
        if (isVideo) {
            normalizedMetadata.videoDuration = metadata.videoDuration || metadata.duration || null;
            normalizedMetadata.videoResolution = metadata.videoResolution || metadata.resolution || null;
        }

        return normalizedMetadata;
    } catch (error) {
        console.error("Error fetching metadata:", error);
        return getDefaultMetadata();
    }
}

// Helper functions
function isValidMetadata(metadata) {
    return metadata && typeof metadata === "object" && (metadata.name || metadata.image);
}

function normalizeImageUrl(imageUrl) {
    if (!imageUrl) return "../assets/placeholder.jpg";

    if (imageUrl.startsWith("ipfs://")) {
        return imageUrl.replace("ipfs://", "https://ipfs.io/ipfs/");
    }

    return imageUrl;
}

function getDefaultMetadata() {
    return {
        name: "Unknown NFT",
        description: "Metadata unavailable",
        image: "../assets/placeholder.jpg",
        attributes: [],
        fileType: "Unknown",
        // Audio-specific default metadata
        cover: null,
        audioDuration: null,
        audioBitrate: null,
        // Video-specific default metadata
        videoDuration: null,
        videoResolution: null,
    };
}

async function createNFTCard(tokenId, metadata) {
    const nftCard = document.createElement("div");
    nftCard.className = "nft-card";

    // Check if NFT is listed
    const web3 = new Web3(window.ethereum);
    const contract = new web3.eth.Contract(contractABI, contractAddress);
    const listingInfo = await contract.methods.getListingInfo(tokenId).call();

    const isModel3D = metadata.fileType === "model/3d" || (metadata.image && metadata.image.toLowerCase().endsWith(".glb"));
    const isVideo = metadata.fileType === "video/mp4" || (metadata.image && metadata.image.toLowerCase().endsWith(".mp4"));
    const isAudio = metadata.fileType === "audio/mpeg" || (metadata.image && metadata.image.toLowerCase().endsWith(".mp3"));

    let mediaContent = "";

    if (isModel3D) {
        mediaContent = `<model-viewer src="${normalizeIpfsUrl(metadata.image)}"
                     alt="${metadata.name}"
                     auto-rotate camera-controls
                     style="width: 100%; height: 200px;"></model-viewer>`;
    } else if (isVideo) {
        // Sửa lại container video để đảm bảo hiển thị đúng
        mediaContent = `<div class="video-container" style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; z-index: 2;">
                      <video src="${normalizeIpfsUrl(metadata.image)}" 
                        alt="${metadata.name}"
                        style="width: 100%; height: 100%; object-fit: cover; position: absolute; top: 0; left: 0;"
                        autoplay loop muted playsinline controlsList="nodownload"></video>
                      <div class="video-indicator" style="z-index: 5;"><i class="fas fa-video"></i></div>
                      <div class="video-loading">
                        <div class="spinner"></div>
                      </div>
                    </div>`;
        console.log("Creating video NFT card for:", metadata.name, "URL:", normalizeIpfsUrl(metadata.image));
    } else if (isAudio) {
        // Đảm bảo ảnh cover được hiển thị đúng
        const coverImage = metadata.cover ? normalizeIpfsUrl(metadata.cover) : null;
        console.log("Audio NFT cover image:", coverImage);

        if (coverImage) {
            mediaContent = `<div class="audio-cover-container" style="position: absolute; top: 0; left: 0; width: 100%; height: 100%;">
                        <img src="${coverImage}" alt="${metadata.name}" style="width: 100%; height: 100%; object-fit: cover;">
                        <div class="audio-indicator" style="z-index: 5;"><i class="fas fa-music"></i></div>
                      </div>`;
        } else {
            mediaContent = `<div class="audio-placeholder" style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; display: flex; align-items: center; justify-content: center; background-color: #f8f9fa;">
                        <svg width="50%" height="50%" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
                          <rect x="2" y="6" width="20" height="12" rx="2" ry="2"></rect>
                          <circle cx="12" cy="12" r="4"></circle>
                          <circle cx="12" cy="12" r="1"></circle>
                          <line x1="9" y1="12" x2="9" y2="12.01"></line>
                          <line x1="15" y1="12" x2="15" y2="12.01"></line>
                          <path d="M6 12h0.01"></path>
                          <path d="M18 12h0.01"></path>
                        </svg>
                        <div class="audio-indicator" style="z-index: 5;"><i class="fas fa-music"></i></div>
                      </div>`;
        }
    } else {
        // Default image display
        mediaContent = `<img src="${normalizeIpfsUrl(metadata.image)}" 
            alt="${metadata.name}" style="width: 100%; height: 100%; object-fit: cover;">`;
    }

    nftCard.innerHTML = `
    ${listingInfo.isListed ? '<div class="listed-badge">Listed</div>' : ""}
    <div class="nft-image" style="position: relative; height: 200px; overflow: hidden;">
      ${mediaContent}
      <div class="nft-overlay">
        <div class="nft-buttons">
          <button class="nft-button primary list-for-sale" data-token-id="${tokenId}">List for sale</button>
          <button class="nft-button secondary show-details" data-token-id="${tokenId}">...</button>
        </div>
      </div>
    </div>
    <div class="nft-info">
      <h3>${metadata.name}</h3>
      <p class="nft-description">${metadata.description || "No description"}</p>
    </div>
  `;

    // Add event listeners
    const listButton = nftCard.querySelector(".list-for-sale");
    listButton.addEventListener("click", (e) => {
        e.stopPropagation();
        showListingModal(tokenId, metadata);
    });

    const detailsButton = nftCard.querySelector(".show-details");
    detailsButton.addEventListener("click", (e) => {
        e.stopPropagation();
        showNFTModal(tokenId, metadata, contract);
    });

    // Initialize videos if present
    if (isVideo) {
        const video = nftCard.querySelector("video");
        if (video) {
            // Make sure video is muted to allow autoplay
            video.muted = true;
            video.loop = true;

            // Add loading event listener
            video.addEventListener("loadeddata", () => {
                console.log("Video loaded successfully:", metadata.name);
                const loadingIndicator = video.parentElement.querySelector(".video-loading");
                if (loadingIndicator) {
                    loadingIndicator.style.display = "none";
                }
            });

            // Handle video loading errors
            video.addEventListener("error", (e) => {
                console.error("Error loading video:", e.target.error, "for NFT:", metadata.name);
                const videoContainer = video.closest(".video-container");
                const loadingIndicator = videoContainer.querySelector(".video-loading");
                if (loadingIndicator) {
                    loadingIndicator.style.display = "none";
                }

                if (videoContainer) {
                    videoContainer.innerHTML = `
            <div class="video-error">
              <i class="fas fa-exclamation-triangle"></i>
              <span>Video could not be loaded</span>
            </div>
          `;
                }
            });

            // Try to play the video
            video.play().catch((err) => {
                console.warn("Auto-play was prevented:", err, "for NFT:", metadata.name);
                // Add a play button overlay that users can click
                const videoContainer = video.closest(".video-container");
                if (videoContainer) {
                    const playButton = document.createElement("div");
                    playButton.className = "video-play-button";
                    playButton.innerHTML = '<i class="fas fa-play"></i>';
                    playButton.addEventListener("click", () => {
                        video.play();
                        playButton.style.display = "none";
                    });
                    videoContainer.appendChild(playButton);
                }
            });
        } else {
            console.error("Video element not found for NFT:", metadata.name);
        }
    }

    return nftCard;
}

// Add listing modal and functions
function showListingModal(tokenId, metadata) {
    const modal = document.createElement("div");
    modal.className = "listing-modal";

    // Kiểm tra loại file
    const isModel3D = metadata.fileType === "model/3d" || (metadata.image && metadata.image.toLowerCase().endsWith(".glb"));
    const isVideo = metadata.fileType === "video/mp4" || (metadata.image && metadata.image.toLowerCase().endsWith(".mp4"));
    const isAudio = metadata.fileType === "audio/mpeg" || (metadata.image && metadata.image.toLowerCase().endsWith(".mp3"));

    // Chuẩn hóa URL IPFS
    const imageUrl = normalizeIpfsUrl(metadata.image);

    // Tạo nội dung media phù hợp
    let mediaPreview = "";

    if (isModel3D) {
        mediaPreview = `<model-viewer src="${imageUrl}" 
                     alt="${metadata.name}"
                     auto-rotate camera-controls
                     style="width: 100%; height: 200px;"></model-viewer>`;
    } else if (isVideo) {
        mediaPreview = `<div class="video-container">
                      <video src="${imageUrl}" 
                       style="width: 100%; height: 200px; object-fit: cover;"
                       alt="${metadata.name}" muted loop controlsList="nodownload"></video>
                      <div class="video-indicator"><i class="fas fa-video"></i></div>
                    </div>`;
    } else if (isAudio) {
        // Với audio, hiển thị ảnh bìa hoặc placeholder
        const coverImage = metadata.cover ? normalizeIpfsUrl(metadata.cover) : null;
        mediaPreview = coverImage
            ? `<img src="${coverImage}" alt="${metadata.name}" style="width: 100%; height: 200px; object-fit: cover;">
         <div class="audio-indicator"><i class="fas fa-music"></i></div>`
            : `<div class="audio-placeholder" style="width: 100%; height: 200px; display: flex; align-items: center; justify-content: center; background-color: #f8f9fa;">
           <svg width="50%" height="50%" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
             <rect x="2" y="6" width="20" height="12" rx="2" ry="2"></rect>
             <circle cx="12" cy="12" r="4"></circle>
             <circle cx="12" cy="12" r="1"></circle>
             <line x1="9" y1="12" x2="9" y2="12.01"></line>
             <line x1="15" y1="12" x2="15" y2="12.01"></line>
             <path d="M6 12h0.01"></path>
             <path d="M18 12h0.01"></path>
           </svg>
           <div class="audio-indicator"><i class="fas fa-music"></i></div>
         </div>`;
    } else {
        // Hiển thị ảnh mặc định
        mediaPreview = `<img src="${imageUrl}" alt="${metadata.name}">`;
    }

    modal.innerHTML = `
        <div class="modal-content">
            <span class="close-button">&times;</span>
            <h2>List NFT for Sale</h2>
            
            <div class="nft-preview">
                ${mediaPreview}
                <h3>${metadata.name}</h3>
            </div>
            
            <div class="listing-form">
                <div class="price-input-container">
                    <div class="price-header">
                        <h3>Price</h3>
                    </div>
                    <div class="price-input-wrapper">
                        <input type="number" id="listing-price" min="0.001" step="0.001" placeholder="Enter price in TIA">
                        <span class="currency-label">TIA</span>
                    </div>
                    <div class="price-details">
                        <div class="price-detail-row">
                            <span class="detail-label">
                                Platform Fee
                                <span class="info-icon" title="1% fee goes to the platform">
                                    <i class="fas fa-info-circle"></i>
                            </span>
                            </span>
                            <span class="fee-percentage">1%</span>
                        </div>
                        <div class="price-detail-row">
                            <span class="detail-label">You'll receive</span>
                            <span id="final-amount">0 TIA</span>
                        </div>
                    </div>
                </div>

                <div class="duration-input-container">
                    <label for="listing-duration">Duration</label>
                    <select id="listing-duration">
                        <option value="1">1 day</option>
                        <option value="3">3 days</option>
                        <option value="7" selected>7 days</option>
                        <option value="30">30 days</option>
                        <option value="90">90 days</option>
                    </select>
                </div>
                
                <button class="confirm-listing-btn" onclick="window.handleListNFT(${tokenId}, this.closest('.listing-modal'))">
                    Confirm Listing
                </button>
            </div>
        </div>
    `;

    document.body.appendChild(modal);

    // Hiển thị modal với animation
    setTimeout(() => {
        modal.style.display = "flex";
    }, 10);

    // Xử lý đóng modal
    const closeButton = modal.querySelector(".close-button");
    closeButton.addEventListener("click", () => {
        modal.classList.add("closing");
        setTimeout(() => {
            document.body.removeChild(modal);
        }, 300);
    });

    // Xử lý click bên ngoài modal
    modal.addEventListener("click", (e) => {
        if (e.target === modal) {
            modal.classList.add("closing");
            setTimeout(() => {
                document.body.removeChild(modal);
            }, 300);
        }
    });

    // Cập nhật số tiền nhận được khi giá thay đổi
    const priceInput = modal.querySelector("#listing-price");
    priceInput.addEventListener("input", () => {
        const price = parseFloat(priceInput.value) || 0;
        const fee = price * 0.01; // 1% fee
        const finalAmount = price - fee;
        document.getElementById("final-amount").textContent = `${finalAmount.toFixed(3)} TIA`;
    });

    // Hàm hiển thị thông báo
    function showNotification(message, type = "info") {
        // Kiểm tra xem đã có thông báo tương tự chưa để tránh hiển thị trùng lặp
        const existingNotifications = document.querySelectorAll(".notification");
        for (let notif of existingNotifications) {
            if (notif.textContent === message) {
                return; // Nếu đã có thông báo giống hệt thì không hiển thị nữa
            }
        }

        const notification = document.createElement("div");
        notification.className = `notification ${type}`;

        // Thêm icon phù hợp theo loại thông báo
        let icon = "";
        switch (type) {
            case "success":
                icon = '<i class="fas fa-check-circle"></i> ';
                break;
            case "error":
                icon = '<i class="fas fa-exclamation-circle"></i> ';
                break;
            case "info":
                icon = '<i class="fas fa-info-circle"></i> ';
                break;
            default:
                icon = "";
        }

        notification.innerHTML = icon + message;
        document.body.appendChild(notification);

        // Thêm animation hiển thị
        setTimeout(() => {
            notification.classList.add("show");
        }, 10);

        // Tự động ẩn thông báo sau 3 giây
        setTimeout(() => {
            notification.classList.remove("show");
            notification.classList.add("hide");

            // Xóa phần tử khỏi DOM sau khi animation kết thúc
            setTimeout(() => {
                notification.remove();
            }, 300);
        }, 3000);
    }
}

// Show NFT Modal
function showNFTModal(tokenId, metadata, contract) {
    const modalBackdrop = document.getElementById("modal-backdrop");
    const modal = document.getElementById("nft-info-modal");
    const modalContent = document.getElementById("nft-info-content");

    // Check if NFT is listed
    let isListed = false;
    let listingPrice = 0;

    // We'll check the listing status asynchronously and update the UI
    contract.methods
        .getListingInfo(tokenId)
        .call()
        .then((listingInfo) => {
            if (listingInfo && listingInfo.isListed) {
                isListed = true;
                listingPrice = Web3.utils.fromWei(listingInfo.price, "ether");

                // Update the listing badge if it exists
                const listingBadge = modal.querySelector(".listing-badge");
                if (listingBadge) {
                    listingBadge.style.display = "flex";
                    const priceElement = listingBadge.querySelector(".price");
                    if (priceElement) {
                        priceElement.textContent = `${listingPrice} TIA`;
                    }
                }
            }
        })
        .catch((error) => console.error("Error checking listing status:", error));

    const isModel3D = metadata.fileType === "model/3d" || (metadata.image && metadata.image.toLowerCase().endsWith(".glb"));
    const isVideo = metadata.fileType === "video/mp4" || (metadata.image && metadata.image.toLowerCase().endsWith(".mp4"));
    const isAudio = metadata.fileType === "audio/mpeg" || (metadata.image && metadata.image.toLowerCase().endsWith(".mp3"));

    let mediaPreview = "";
    let fileTypeDisplay = "";

    if (isModel3D) {
        mediaPreview = `<model-viewer src="${normalizeIpfsUrl(metadata.image)}"
                     alt="${metadata.name}"
                     auto-rotate camera-controls
                     style="width: 100%; height: 300px;"></model-viewer>`;
        fileTypeDisplay = "3D Model (GLB)";
    } else if (isVideo) {
        mediaPreview = `<div class="video-container modal-video">
                      <video src="${normalizeIpfsUrl(metadata.image)}" 
                       controls controlsList="nodownload"
                       style="width: 100%; height: 300px; object-fit: contain;"
                       alt="${metadata.name}"></video>
                      <div class="video-loading">
                        <div class="spinner"></div>
                      </div>
                      <div class="video-error" style="display: none;">
                        <i class="fas fa-exclamation-triangle"></i>
                        <span>Video could not be loaded</span>
                      </div>
                    </div>`;
        fileTypeDisplay = "Video (MP4)";
    } else if (isAudio) {
        // For audio, we'll show either the cover image if available or a placeholder SVG
        const coverImage = metadata.cover ? normalizeIpfsUrl(metadata.cover) : null;

        mediaPreview = `
      <div style="width: 100%; height: 250px; background-color: #f8f9fa; display: flex; align-items: center; justify-content: center; margin-bottom: 10px; border-radius: 8px;">
        ${
            coverImage
                ? `<img src="${coverImage}" alt="${metadata.name}" style="max-width: 100%; max-height: 100%; object-fit: contain; border-radius: 8px;">`
                : `<svg class="audio-placeholder-svg" width="50%" height="50%" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
              <rect x="2" y="6" width="20" height="12" rx="2" ry="2"></rect>
              <circle cx="12" cy="12" r="4"></circle>
              <circle cx="12" cy="12" r="1"></circle>
              <line x1="9" y1="12" x2="9" y2="12.01"></line>
              <line x1="15" y1="12" x2="15" y2="12.01"></line>
              <path d="M6 12h0.01"></path>
              <path d="M18 12h0.01"></path>
            </svg>`
        }
      </div>
      <audio src="${normalizeIpfsUrl(metadata.image)}" controls controlsList="nodownload" style="width: 100%; border-radius: 8px;"></audio>`;
        fileTypeDisplay = "Audio (MP3)";
    } else {
        // Default image display
        mediaPreview = `<img src="${normalizeIpfsUrl(metadata.image)}" alt="${metadata.name}" style="border-radius: 8px;">`;
        fileTypeDisplay = metadata.fileType || "Image";
    }

    modalContent.innerHTML = `
    <div class="modal-header">
      <h3>NFT Details</h3>
      <button class="modal-close-btn" onclick="closeNFTModal()">×</button>
    </div>
    <div class="nft-success-info">
      ${
          isListed
              ? `<div class="listed-badge" style="display: flex;">
        <i class="fas fa-tag"></i>
        <span>Listed for <span class="price">${listingPrice} TIA</span></span>
      </div>`
              : ""
      }
      
      <div class="nft-preview-section">
        <div class="nft-image-preview">
          ${mediaPreview}
        </div>
        <div class="nft-basic-info">
          <h2>${metadata.name}</h2>
          <p class="description">${metadata.description || "No description"}</p>
        </div>
      </div>

      <div class="tabs-container">
        <div class="tabs">
          <button class="tab-btn active" data-tab="details">Details</button>
          <button class="tab-btn" data-tab="properties">Properties</button>
          <button class="tab-btn" data-tab="blockchain">Blockchain Info</button>
        </div>

        <div class="tab-content active" id="details">
          <div class="info-group">
            <div class="info-row">
              <span class="info-label">Token ID</span>
              <span class="info-value">#${tokenId}</span>
            </div>
            <div class="info-row">
              <span class="info-label">Token Standard</span>
              <span class="info-value">ERC-721</span>
            </div>
            <div class="info-row">
              <span class="info-label">File Type</span>
              <span class="info-value">${fileTypeDisplay}</span>
            </div>
            ${
                isVideo && metadata.videoDuration
                    ? `
            <div class="info-row">
              <span class="info-label">Duration</span>
              <span class="info-value">${metadata.videoDuration}</span>
            </div>`
                    : ""
            }
            ${
                isVideo && metadata.videoResolution
                    ? `
            <div class="info-row">
              <span class="info-label">Resolution</span>
              <span class="info-value">${metadata.videoResolution}</span>
            </div>`
                    : ""
            }
            ${
                isAudio && metadata.audioDuration
                    ? `
            <div class="info-row">
              <span class="info-label">Duration</span>
              <span class="info-value">${metadata.audioDuration}</span>
            </div>`
                    : ""
            }
            ${
                isAudio && metadata.audioBitrate
                    ? `
            <div class="info-row">
              <span class="info-label">Bitrate</span>
              <span class="info-value">${metadata.audioBitrate}</span>
            </div>`
                    : ""
            }
          </div>
        </div>

        <div class="tab-content" id="properties">
          <div class="properties-grid">
            ${
                metadata.attributes && metadata.attributes.length > 0
                    ? metadata.attributes
                          .map(
                              (attr) => `
                  <div class="property-item">
                    <span class="property-type">${attr.trait_type}</span>
                    <span class="property-value">${attr.value}</span>
                  </div>
                `
                          )
                          .join("")
                    : '<p class="no-properties">No properties</p>'
            }
          </div>
        </div>

        <div class="tab-content" id="blockchain">
          <div class="info-group">
            <div class="info-row">
              <span class="info-label">Contract Address</span>
              <span class="info-value">
                <a href="https://explorer.sketchpad-1.forma.art/address/${contract._address}" 
                   target="_blank">
                  ${contract._address.substring(0, 6)}...${contract._address.substring(38)}
                </a>
              </span>
            </div>
            <div class="info-row">
              <span class="info-label">IPFS ${isAudio || isVideo ? "Media" : "Image"}</span>
              <span class="info-value">
                <a href="${normalizeIpfsUrl(metadata.image)}" target="_blank">View on IPFS</a>
              </span>
            </div>
            ${
                isAudio && metadata.cover
                    ? `
            <div class="info-row">
              <span class="info-label">IPFS Cover Image</span>
              <span class="info-value">
                <a href="${normalizeIpfsUrl(metadata.cover)}" target="_blank">View on IPFS</a>
              </span>
            </div>`
                    : ""
            }
            <div class="info-row">
              <span class="info-label">View on Explorer</span>
              <span class="info-value">
                <a href="https://explorer.sketchpad-1.forma.art/token/${contract._address}/${tokenId}" 
                   target="_blank">View on Explorer</a>
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  `;

    // Thêm xử lý cho tabs
    const tabBtns = modal.querySelectorAll(".tab-btn");
    const tabContents = modal.querySelectorAll(".tab-content");

    tabBtns.forEach((btn) => {
        btn.addEventListener("click", () => {
            const tabId = btn.dataset.tab;

            // Remove active class from all buttons and contents
            tabBtns.forEach((b) => b.classList.remove("active"));
            tabContents.forEach((c) => c.classList.remove("active"));

            // Add active class to clicked button and corresponding content
            btn.classList.add("active");
            document.getElementById(tabId).classList.add("active");
        });
    });

    // Initialize video if present
    if (isVideo) {
        const video = modalContent.querySelector("video");
        const loadingIndicator = modalContent.querySelector(".video-loading");
        const errorIndicator = modalContent.querySelector(".video-error");

        if (video) {
            // Handle video loaded successfully
            video.addEventListener("loadeddata", () => {
                if (loadingIndicator) loadingIndicator.style.display = "none";
            });

            // Handle video error
            video.addEventListener("error", () => {
                if (loadingIndicator) loadingIndicator.style.display = "none";
                if (errorIndicator) errorIndicator.style.display = "flex";
            });
        }
    }

    // Initialize audio if present
    if (isAudio) {
        const audio = modalContent.querySelector("audio");

        if (audio) {
            // Handle audio error
            audio.addEventListener("error", () => {
                console.error("Error loading audio file");
                audio.insertAdjacentHTML("afterend", '<div style="color: #dc3545; text-align: center; margin-top: 10px;"><i class="fas fa-exclamation-triangle"></i> Audio could not be loaded</div>');
            });
        }
    }

    modalBackdrop.style.display = "block";
    modal.style.display = "block";
}

function closeNFTModal() {
    const modalBackdrop = document.getElementById("modal-backdrop");
    const modal = document.getElementById("nft-info-modal");

    if (modalBackdrop && modal) {
        // Thêm class closing để trigger animation
        modalBackdrop.classList.add("closing");
        modal.classList.add("closing");

        // Đợi animation hoàn thành rồi mới ẩn modal
        setTimeout(() => {
            modalBackdrop.style.display = "none";
            modal.style.display = "none";
            // Xóa class closing để chuẩn bị cho lần sau
            modalBackdrop.classList.remove("closing");
            modal.classList.remove("closing");
        }, 300); // 300ms = thời gian animation
    }
}

// Thêm hàm helper để chuẩn hóa IPFS URL
function normalizeIpfsUrl(url) {
    if (!url) {
        console.log("Empty URL passed to normalizeIpfsUrl");
        return "#";
    }

    console.log("Normalizing IPFS URL:", url);

    // Nếu URL đã bắt đầu bằng https://ipfs.io/ipfs/
    if (url.startsWith("https://ipfs.io/ipfs/")) {
        return url;
    }

    // Nếu URL bắt đầu bằng https://gateway.pinata.cloud/ipfs/
    if (url.startsWith("https://gateway.pinata.cloud/ipfs/")) {
        return url;
    }

    // Nếu URL bắt đầu bằng ipfs://
    if (url.startsWith("ipfs://")) {
        return url.replace("ipfs://", "https://ipfs.io/ipfs/");
    }

    // Nếu URL bắt đầu bằng ipfs/
    if (url.startsWith("ipfs/")) {
        return `https://ipfs.io/ipfs/${url.substring(5)}`;
    }

    // Nếu URL là CID trực tiếp (bắt đầu bằng Qm hoặc ba)
    if (url.match(/^(Qm[1-9A-HJ-NP-Za-km-z]{44,}|ba[a-zA-Z0-9]{58,})/)) {
        return `https://ipfs.io/ipfs/${url}`;
    }

    return url;
}

// Function to cancel an NFT listing
async function cancelListing(tokenId) {
    try {
        // Check if MetaMask is installed
        if (typeof window.ethereum === "undefined") {
            showNotification("Please install MetaMask to cancel listings", "error");
            return;
        }

        // Check if connected to the correct network
        if (!(await checkNetwork())) {
            return;
        }

        showLoadingNotification("Canceling listing...");

        const web3 = new Web3(window.ethereum);
        const accounts = await web3.eth.requestAccounts();
        const userAddress = accounts[0];
        const contract = new web3.eth.Contract(contractABI, contractAddress);

        // Check if user is the owner of the NFT
        const listingInfo = await contract.methods.getListingInfo(tokenId).call();
        if (listingInfo.seller.toLowerCase() !== userAddress.toLowerCase()) {
            showNotification("You are not the seller of this NFT", "error");
            return;
        }

        // Cancel the listing
        const tx = await contract.methods.cancelListing(tokenId).send({
            from: userAddress,
            maxPriorityFeePerGas: null,
            maxFeePerGas: null,
        });

        console.log("Listing canceled:", tx);

        // Update the NFT status in the database
        const response = await fetch(`/api/nfts/${tokenId}/listing`, {
            method: "DELETE",
        });

        if (response.ok) {
            showNotification("Listing canceled successfully", "success");
            // Refresh the NFTs display
            await fetchUserNFTs();
        } else {
            showNotification("Error canceling listing", "error");
        }
    } catch (error) {
        console.error("Error canceling listing:", error);
        showNotification("Error: " + error.message, "error");
    } finally {
        hideLoadingNotification();
    }
}
