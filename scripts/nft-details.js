// Copy contractABI và contractAddress từ marketplace.js
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
const contractAddress = "0xDeE9B116D1D712B4147A8a85A5B960f048D99ff8";

// Sửa lại hàm fetchMetadata
async function fetchMetadata(tokenURI) {
  const gateway = "https://ipfs.io/ipfs/";
  try {
    const response = await fetch(tokenURI.replace("ipfs://", gateway), {
      timeout: 3000,
    });

    if (!response.ok) throw new Error("Fetch failed");
    const metadata = await response.json();

    // Determine file type based on metadata
    let fileType;
    if (
      metadata.modelType === "GLB" ||
      metadata.modelDetails?.fileExtension === "glb" ||
      metadata.modelDetails?.fileExtension === "gltf"
    ) {
      fileType = "3d";
    } else if (
      metadata.fileType === "video/mp4" ||
      metadata.image?.toLowerCase().endsWith(".mp4")
    ) {
      fileType = "video";
    } else {
      fileType = "image";
    }

    const processedMetadata = {
      name: metadata.name || "Unknown NFT",
      description: metadata.description || "No description",
      image:
        metadata.image?.replace("ipfs://", gateway) ||
        "../assets/placeholder.jpg",
      attributes: metadata.attributes || [],
      fileType: fileType,
      modelDetails: metadata.modelDetails || null,
    };

    return processedMetadata;
    } catch (error) {
        console.warn(`Failed to fetch metadata: ${error}`);
        return {
      name: "Unknown NFT",
      description: "Metadata unavailable",
      image: "../assets/placeholder.jpg",
      fileType: "image",
      attributes: [],
        };
    }
}

function toggleSection(sectionId) {
    const section = document.getElementById(sectionId);
    const header = section.previousElementSibling;
  const isOpen = section.style.display !== "none";

    // Toggle content
  section.style.display = isOpen ? "none" : "block";

    // Toggle header active state
    if (isOpen) {
    header.classList.remove("active");
    } else {
    header.classList.add("active");
    }
}

// Sửa lại hàm openTab
function openTab(event, tabName) {
    // Ẩn tất cả nội dung tab
  const tabContents = document.getElementsByClassName("tab-content");
    for (let content of tabContents) {
    content.style.display = "none";
    }

    // Xóa class active khỏi tất cả các nút tab
  const tabButtons = document.getElementsByClassName("tab-btn");
    for (let button of tabButtons) {
    button.classList.remove("active");
    }

    // Hiển thị tab được chọn
  document.getElementById(tabName).style.display = "block";
    
    // Thêm class active cho nút được click
  event.currentTarget.classList.add("active");
}

async function loadNFTDetails() {
    const urlParams = new URLSearchParams(window.location.search);
  const tokenId = urlParams.get("tokenId");

    if (!tokenId) {
    window.location.href = "marketplace.html";
        return;
    }

    try {
        await fetch(`http://localhost:8000/api/update-views/${tokenId}`, {
      method: "POST",
            headers: {
        "Content-Type": "application/json",
      },
        });

        const web3 = new Web3(window.ethereum);
        const contract = new web3.eth.Contract(contractABI, contractAddress);

        const tokenURI = await contract.methods.tokenURI(tokenId).call();
        const metadata = await fetchMetadata(tokenURI);
        const listing = await contract.methods.getListingInfo(tokenId).call();
        const owner = await contract.methods.ownerOf(tokenId).call();

        try {
      const response = await fetch("http://localhost:8000/api/users");
            if (response.ok) {
                const users = await response.json();
        const ownerData = users.find(
          (user) =>
            user.walletAddress &&
                    (user.walletAddress === owner || 
                    user.walletAddress.toLowerCase() === owner.toLowerCase())
                );
                
                if (ownerData) {
          document.getElementById("ownerUsername").textContent =
            ownerData.username || "Unknown User";
          document.getElementById(
            "ownerUsername"
          ).href = `profile.html?address=${owner}`;

                    if (ownerData.avatar) {
            document.getElementById("ownerAvatar").src = ownerData.avatar;
                    }
                } else {
          document.getElementById(
            "ownerUsername"
          ).textContent = `User${owner.substring(0, 6)}`;
        }

        document.getElementById(
          "ownerAddress"
        ).textContent = `${owner.substring(0, 6)}...${owner.substring(38)}`;
            }
        } catch (error) {
      document.getElementById("ownerUsername").textContent = `${owner.substring(
        0,
        6
      )}...${owner.substring(38)}`;
    }

    // Xử lý hiển thị media dựa trên loại file
    const mediaContainer = document.querySelector(".nft-preview");
    const fileType = metadata.fileType;
    const imageUrl = metadata.image.replace("ipfs://", "https://ipfs.io/ipfs/");

    let mediaHTML;
    switch (fileType) {
      case "3d":
        mediaHTML = `
          <model-viewer
            src="${imageUrl}"
            poster="../assets/placeholder.jpg"
            auto-rotate
            camera-controls
            shadow-intensity="1"
            environment-image="neutral"
            exposure="0.8"
            loading="eager"
            reveal="auto"
            camera-orbit="0deg 75deg 105%"
            min-camera-orbit="auto auto 5%"
            max-camera-orbit="auto auto 200%"
            interaction-prompt="none"
            ar
            ar-modes="webxr scene-viewer quick-look"
            style="width: 100%; height: 100%;"
            alt="${metadata.name}"
          ></model-viewer>`;
        break;

      case "video":
        mediaHTML = `
          <video autoplay muted loop playsinline class="nft-media">
            <source src="${imageUrl}" type="video/mp4">
          </video>`;
        break;

      default:
        mediaHTML = `<img id="nftImage" src="${imageUrl}" alt="${metadata.name}" class="nft-media">`;
    }

    mediaContainer.innerHTML = mediaHTML;

    // Xử lý các sự kiện cho model-viewer nếu là 3D NFT
    if (fileType === "3d") {
      const modelViewer = mediaContainer.querySelector("model-viewer");
      if (modelViewer) {
        modelViewer.addEventListener("error", (error) => {
          console.error("Model viewer error:", error);
          modelViewer.style.display = "none";
          const placeholder = document.createElement("img");
          placeholder.src = "../assets/placeholder.jpg";
          placeholder.alt = "Failed to load 3D model";
          placeholder.style.width = "100%";
          placeholder.style.height = "100%";
          placeholder.style.objectFit = "cover";
          modelViewer.parentNode.insertBefore(placeholder, modelViewer);
        });

        modelViewer.addEventListener("load", () => {
          modelViewer.style.display = "block";
          modelViewer.dismissPoster();
          modelViewer.autoRotate = true;
          modelViewer.cameraOrbit = "auto auto 105%";
          modelViewer.autoRotateDelay = 0;
          modelViewer.rotationPerSecond = "30deg";
        });
      }
    }

    // Update remaining UI elements
    document.getElementById("nftName").textContent = metadata.name;
    document.getElementById("nftDescription").textContent =
      metadata.description || "No description available";
    document.getElementById(
      "contractAddress"
    ).textContent = `${contractAddress.substring(
      0,
      6
    )}...${contractAddress.substring(38)}`;
    document.getElementById(
      "contractAddress"
    ).href = `https://explorer.forma.art/address/${contractAddress}`;
    document.getElementById("tokenId").textContent = tokenId;
    document.getElementById("nftPrice").innerHTML = `
            <img src="../assets/celestia-icon.png" alt="Celestia" class="celestia-icon">
      ${web3.utils.fromWei(listing.price, "ether")}
            <span class="currency"></span>
        `;

        // Add buy button handler
    const buyButton = document.getElementById("buyButton");
        buyButton.onclick = async () => {
            try {
                const accounts = await web3.eth.requestAccounts();
                const userAddress = accounts[0];

                if (userAddress.toLowerCase() === owner.toLowerCase()) {
          showNotification("You cannot buy your own NFT", "error");
                    return;
                }

        showNotification("Processing your purchase...", "info");

                const buyTx = await contract.methods.buyNFT(tokenId).send({
                    from: userAddress,
                    value: listing.price,
          gasPrice: "25000000000",
          gas: "250000",
                });

                if (buyTx.status) {
                    try {
            const updateResponse = await fetch(
              "http://localhost:8000/api/record-nft-purchase",
              {
                method: "POST",
                            headers: {
                  "Content-Type": "application/json",
                            },
                            body: JSON.stringify({
                                tokenId: parseInt(tokenId),
                  buyer_address: userAddress,
                }),
              }
            );

                        if (!updateResponse.ok) {
              throw new Error("Failed to update NFT status in database");
                        }

            showNotification("NFT purchased successfully!", "success");

                        if (window.notificationManager) {
              await window.notificationManager.addSellerNotification(
                listing.seller,
                {
                  message: `Your NFT "${
                    metadata.name
                  }" has been purchased for ${web3.utils.fromWei(
                    listing.price,
                    "ether"
                  )} TIA`,
                                type: "success",
                  icon: "bi bi-cash-coin",
                }
              );
                        }

            setTimeout(() => (window.location.href = "marketplace.html"), 2000);
                    } catch (dbError) {
            showNotification(
              "Purchase recorded on blockchain but database update failed",
              "warning"
            );
                    }
                }
            } catch (error) {
        showNotification(error.message, "error");
      }
    };

    // Load properties
        if (metadata.attributes) {
      const propertiesGrid = document.querySelector(".properties-grid");
      propertiesGrid.innerHTML = metadata.attributes
        .map(
          (attr) => `
                <div class="property-item">
                    <span class="property-type">${attr.trait_type}</span>
                    <span class="property-value">${attr.value}</span>
                </div>
          `
        )
        .join("");
    }

    // Load transaction history
    loadTransactionHistory(contract, tokenId, web3);
                    } catch (error) {
    showNotification("Error loading NFT details: " + error.message, "error");
  }
}

function showNotification(message, type = "info") {
  const notification = document.createElement("div");
    notification.className = `notification ${type}`;
    notification.textContent = message;
    document.body.appendChild(notification);

    setTimeout(() => {
        notification.remove();
    }, 3000);
}

// Sửa lại phần event listener
document.addEventListener("DOMContentLoaded", function () {
    loadNFTDetails();
    
    // Thêm event listeners cho các nút tab
  const tabButtons = document.getElementsByClassName("tab-btn");
    for (let button of tabButtons) {
    button.addEventListener("click", function (e) {
      const tabName = this.getAttribute("data-tab");
            openTab(e, tabName);
        });
    }
});

// Thêm các hàm mới
function expandImage() {
  const img = document.getElementById("nftImage");
  const modal = document.createElement("div");
  modal.className = "image-modal";
    modal.innerHTML = `
        <div class="modal-content">
            <span class="close-modal" onclick="this.parentElement.parentElement.remove()">
                <i class="fas fa-times"></i>
            </span>
            <img src="${img.src}" alt="Expanded NFT">
        </div>
    `;

  modal.addEventListener("click", (e) => {
        if (e.target === modal) {
            modal.remove();
        }
    });

    document.body.appendChild(modal);
  modal.style.display = "flex";
}

async function refreshMetadata() {
    const button = event.currentTarget;
    const originalText = button.innerHTML;

    try {
        button.innerHTML = '<i class="fas fa-spinner fa-spin"></i>';
        button.disabled = true;

        const urlParams = new URLSearchParams(window.location.search);
    const tokenId = urlParams.get("tokenId");
        const web3 = new Web3(window.ethereum);
        const contract = new web3.eth.Contract(contractABI, contractAddress);

        const tokenURI = await contract.methods.tokenURI(tokenId).call();
        const metadata = await fetchMetadata(tokenURI);

    // Cập nhật UI dựa trên loại file
    const mediaContainer = document.querySelector(".nft-preview");
    const fileType = metadata.fileType;

    // Chuyển đổi URL IPFS thành HTTP URL
    const imageUrl = metadata.image.replace("ipfs://", "https://ipfs.io/ipfs/");

    let mediaHTML;
    switch (fileType) {
      case "3d":
        mediaHTML = `
          <model-viewer
            src="${imageUrl}"
            poster="../assets/placeholder.jpg"
            auto-rotate
            camera-controls
            shadow-intensity="1"
            environment-image="neutral"
            exposure="0.8"
            loading="eager"
            reveal="auto"
            camera-orbit="0deg 75deg 105%"
            min-camera-orbit="auto auto 5%"
            max-camera-orbit="auto auto 200%"
            interaction-prompt="none"
            ar
            ar-modes="webxr scene-viewer quick-look"
            style="width: 100%; height: 100%;"
            alt="${metadata.name}"
          ></model-viewer>`;
        break;

      case "video":
        mediaHTML = `
          <video autoplay muted loop playsinline class="nft-media">
            <source src="${imageUrl}" type="video/mp4">
          </video>`;
        break;

      default:
        mediaHTML = `<img id="nftImage" src="${imageUrl}" alt="${metadata.name}" class="nft-media">`;
    }

    mediaContainer.innerHTML = mediaHTML;

    // Handle 3D model events if needed
    if (fileType === "3d") {
      const modelViewer = mediaContainer.querySelector("model-viewer");
      if (modelViewer) {
        modelViewer.addEventListener("error", (error) => {
          console.error("Model viewer error:", error);
          modelViewer.style.display = "none";
          const placeholder = document.createElement("img");
          placeholder.src = "../assets/placeholder.jpg";
          placeholder.alt = "Failed to load 3D model";
          placeholder.style.width = "100%";
          placeholder.style.height = "100%";
          placeholder.style.objectFit = "cover";
          modelViewer.parentNode.insertBefore(placeholder, modelViewer);
        });

        modelViewer.addEventListener("load", () => {
          console.log("Model loaded successfully");
          modelViewer.style.display = "block";
          modelViewer.dismissPoster();
          modelViewer.autoRotate = true;
          modelViewer.cameraOrbit = "auto auto 105%";
          modelViewer.autoRotateDelay = 0;
          modelViewer.rotationPerSecond = "30deg";
        });
      }
    }

    // Update other UI elements
    document.getElementById("nftName").textContent = metadata.name;
    document.getElementById("nftDescription").textContent =
      metadata.description || "No description available";

        if (metadata.attributes) {
      const propertiesGrid = document.querySelector(".properties-grid");
      propertiesGrid.innerHTML = metadata.attributes
        .map(
          (attr) => `
                <div class="property-item">
                    <span class="property-type">${attr.trait_type}</span>
                    <span class="property-value">${attr.value}</span>
                </div>
          `
        )
        .join("");
        }

    showNotification("Metadata refreshed successfully!", "success");
    } catch (error) {
    console.error("Error refreshing metadata:", error);
    showNotification("Error refreshing metadata", "error");
    } finally {
        button.innerHTML = originalText;
        button.disabled = false;
    }
}

async function getUsernameFromAddress(address, users) {
  const user = users.find(
    (u) =>
      u.walletAddress && u.walletAddress.toLowerCase() === address.toLowerCase()
  );
  return user
    ? user.username
    : `${address.substring(0, 6)}...${address.substring(38)}`;
}

async function loadTransactionHistory(contract, tokenId, web3) {
  try {
    const transactionList = document.querySelector(".transaction-list");
    transactionList.innerHTML = ""; // Clear existing content

    // Get all relevant events
    const [mintEvents, listEvents, soldEvents, cancelEvents] =
      await Promise.all([
        contract.getPastEvents("Transfer", {
          filter: {
            tokenId: tokenId,
            from: "0x0000000000000000000000000000000000000000",
          },
          fromBlock: 0,
          toBlock: "latest",
        }),
        contract.getPastEvents("NFTListed", {
          filter: { tokenId: tokenId },
          fromBlock: 0,
          toBlock: "latest",
        }),
        contract.getPastEvents("NFTSold", {
          filter: { tokenId: tokenId },
          fromBlock: 0,
          toBlock: "latest",
        }),
        contract.getPastEvents("ListingCanceled", {
          filter: { tokenId: tokenId },
          fromBlock: 0,
          toBlock: "latest",
        }),
      ]);

    // Combine all events and sort by block number
    const allEvents = [
      ...mintEvents,
      ...listEvents,
      ...soldEvents,
      ...cancelEvents,
    ].sort((a, b) => b.blockNumber - a.blockNumber);

    if (allEvents.length === 0) {
      transactionList.innerHTML = `
        <div class="no-transactions">
          No transaction history available
        </div>
      `;
      return;
    }

    // Get user data for username display
    const response = await fetch("http://localhost:8000/api/users");
    const users = await response.json();

    // Process each event
    for (const event of allEvents) {
      const block = await web3.eth.getBlock(event.blockNumber);
      const timestamp = block.timestamp * 1000; // Convert to milliseconds
      const date = new Date(timestamp);

      let transactionHTML = "";

      switch (event.event) {
        case "Transfer":
          if (
            event.returnValues.from ===
            "0x0000000000000000000000000000000000000000"
          ) {
            const minterUsername = await getUsernameFromAddress(
              event.returnValues.to,
              users
            );
            transactionHTML = `
              <div class="transaction-item">
                <div class="transaction-left">
                  <div class="transaction-icon">
                    <i class="fas fa-paint-brush"></i>
                  </div>
                  <div class="transaction-info">
                    <span class="transaction-type">Minted</span>
                    <span class="transaction-from">by <a href="profile.html?address=${
                      event.returnValues.to
                    }">${minterUsername}</a></span>
                  </div>
                </div>
                <div class="transaction-right">
                  <div class="transaction-date">${date.toLocaleString()}</div>
                </div>
              </div>
            `;
          }
          break;

        case "NFTListed":
          const sellerUsername = await getUsernameFromAddress(
            event.returnValues.seller,
            users
          );
          transactionHTML = `
            <div class="transaction-item">
              <div class="transaction-left">
                <div class="transaction-icon">
                  <i class="fas fa-tag"></i>
                </div>
                <div class="transaction-info">
                  <span class="transaction-type">Listed</span>
                  <span class="transaction-from">by <a href="profile.html?address=${
                    event.returnValues.seller
                  }">${sellerUsername}</a></span>
                </div>
              </div>
              <div class="transaction-right">
                <div class="transaction-price">${web3.utils.fromWei(
                  event.returnValues.price,
                  "ether"
                )} TIA</div>
                <div class="transaction-date">${date.toLocaleString()}</div>
              </div>
            </div>
          `;
          break;

        case "NFTSold":
          const buyerUsername = await getUsernameFromAddress(
            event.returnValues.buyer,
            users
          );
          const soldSellerUsername = await getUsernameFromAddress(
            event.returnValues.seller,
            users
          );
          transactionHTML = `
            <div class="transaction-item">
              <div class="transaction-left">
                <div class="transaction-icon">
                  <i class="fas fa-shopping-cart"></i>
                </div>
                <div class="transaction-info">
                  <span class="transaction-type">Sold</span>
                  <span class="transaction-from">to <a href="profile.html?address=${
                    event.returnValues.buyer
                  }">${buyerUsername}</a></span>
                  <span class="transaction-from">from <a href="profile.html?address=${
                    event.returnValues.seller
                  }">${soldSellerUsername}</a></span>
                </div>
              </div>
              <div class="transaction-right">
                <div class="transaction-price">${web3.utils.fromWei(
                  event.returnValues.price,
                  "ether"
                )} TIA</div>
                <div class="transaction-date">${date.toLocaleString()}</div>
              </div>
            </div>
          `;
          break;

        case "ListingCanceled":
          const cancellerUsername = await getUsernameFromAddress(
            event.returnValues.seller,
            users
          );
          transactionHTML = `
            <div class="transaction-item">
              <div class="transaction-left">
                <div class="transaction-icon">
                  <i class="fas fa-times-circle"></i>
                </div>
                <div class="transaction-info">
                  <span class="transaction-type">Listing Canceled</span>
                  <span class="transaction-from">by <a href="profile.html?address=${
                    event.returnValues.seller
                  }">${cancellerUsername}</a></span>
                </div>
              </div>
              <div class="transaction-right">
                <div class="transaction-date">${date.toLocaleString()}</div>
              </div>
            </div>
          `;
          break;
      }

      if (transactionHTML) {
        transactionList.innerHTML += transactionHTML;
      }
    }
  } catch (error) {
    console.error("Error loading transaction history:", error);
    const transactionList = document.querySelector(".transaction-list");
    transactionList.innerHTML = `
      <div class="no-transactions">
        Error loading transaction history
      </div>
    `;
  }
}
