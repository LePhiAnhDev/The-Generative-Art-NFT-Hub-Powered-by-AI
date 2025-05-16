// ABI
const contractAddress = '0xDeE9B116D1D712B4147A8a85A5B960f048D99ff8';
const contractABI = [
  {
    "inputs": [],
    "stateMutability": "nonpayable",
    "type": "constructor"
  },
  {
    "inputs": [],
    "name": "ERC721EnumerableForbiddenBatchMint",
    "type": "error"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "sender",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "tokenId",
        "type": "uint256"
      },
      {
        "internalType": "address",
        "name": "owner",
        "type": "address"
      }
    ],
    "name": "ERC721IncorrectOwner",
    "type": "error"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "operator",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "tokenId",
        "type": "uint256"
      }
    ],
    "name": "ERC721InsufficientApproval",
    "type": "error"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "approver",
        "type": "address"
      }
    ],
    "name": "ERC721InvalidApprover",
    "type": "error"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "operator",
        "type": "address"
      }
    ],
    "name": "ERC721InvalidOperator",
    "type": "error"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "owner",
        "type": "address"
      }
    ],
    "name": "ERC721InvalidOwner",
    "type": "error"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "receiver",
        "type": "address"
      }
    ],
    "name": "ERC721InvalidReceiver",
    "type": "error"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "sender",
        "type": "address"
      }
    ],
    "name": "ERC721InvalidSender",
    "type": "error"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "tokenId",
        "type": "uint256"
      }
    ],
    "name": "ERC721NonexistentToken",
    "type": "error"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "owner",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "index",
        "type": "uint256"
      }
    ],
    "name": "ERC721OutOfBoundsIndex",
    "type": "error"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "owner",
        "type": "address"
      }
    ],
    "name": "OwnableInvalidOwner",
    "type": "error"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "account",
        "type": "address"
      }
    ],
    "name": "OwnableUnauthorizedAccount",
    "type": "error"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "address",
        "name": "owner",
        "type": "address"
      },
      {
        "indexed": true,
        "internalType": "address",
        "name": "approved",
        "type": "address"
      },
      {
        "indexed": true,
        "internalType": "uint256",
        "name": "tokenId",
        "type": "uint256"
      }
    ],
    "name": "Approval",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "address",
        "name": "owner",
        "type": "address"
      },
      {
        "indexed": true,
        "internalType": "address",
        "name": "operator",
        "type": "address"
      },
      {
        "indexed": false,
        "internalType": "bool",
        "name": "approved",
        "type": "bool"
      }
    ],
    "name": "ApprovalForAll",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "_fromTokenId",
        "type": "uint256"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "_toTokenId",
        "type": "uint256"
      }
    ],
    "name": "BatchMetadataUpdate",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "uint256",
        "name": "tokenId",
        "type": "uint256"
      },
      {
        "indexed": true,
        "internalType": "address",
        "name": "seller",
        "type": "address"
      }
    ],
    "name": "ListingCanceled",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "_tokenId",
        "type": "uint256"
      }
    ],
    "name": "MetadataUpdate",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "uint256",
        "name": "tokenId",
        "type": "uint256"
      },
      {
        "indexed": true,
        "internalType": "address",
        "name": "seller",
        "type": "address"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "price",
        "type": "uint256"
      }
    ],
    "name": "NFTListed",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "uint256",
        "name": "tokenId",
        "type": "uint256"
      },
      {
        "indexed": true,
        "internalType": "address",
        "name": "seller",
        "type": "address"
      },
      {
        "indexed": true,
        "internalType": "address",
        "name": "buyer",
        "type": "address"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "price",
        "type": "uint256"
      }
    ],
    "name": "NFTSold",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "address",
        "name": "previousOwner",
        "type": "address"
      },
      {
        "indexed": true,
        "internalType": "address",
        "name": "newOwner",
        "type": "address"
      }
    ],
    "name": "OwnershipTransferred",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "address",
        "name": "from",
        "type": "address"
      },
      {
        "indexed": true,
        "internalType": "address",
        "name": "to",
        "type": "address"
      },
      {
        "indexed": true,
        "internalType": "uint256",
        "name": "tokenId",
        "type": "uint256"
      }
    ],
    "name": "Transfer",
    "type": "event"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "to",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "tokenId",
        "type": "uint256"
      }
    ],
    "name": "approve",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "approveMarketplace",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "owner",
        "type": "address"
      }
    ],
    "name": "balanceOf",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "tokenId",
        "type": "uint256"
      }
    ],
    "name": "burn",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "tokenId",
        "type": "uint256"
      }
    ],
    "name": "buyNFT",
    "outputs": [],
    "stateMutability": "payable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "tokenId",
        "type": "uint256"
      }
    ],
    "name": "cancelListing",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "tokenId",
        "type": "uint256"
      }
    ],
    "name": "getApproved",
    "outputs": [
      {
        "internalType": "address",
        "name": "",
        "type": "address"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "tokenId",
        "type": "uint256"
      }
    ],
    "name": "getListingInfo",
    "outputs": [
      {
        "internalType": "address",
        "name": "seller",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "price",
        "type": "uint256"
      },
      {
        "internalType": "bool",
        "name": "isListed",
        "type": "bool"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "owner",
        "type": "address"
      },
      {
        "internalType": "address",
        "name": "operator",
        "type": "address"
      }
    ],
    "name": "isApprovedForAll",
    "outputs": [
      {
        "internalType": "bool",
        "name": "",
        "type": "bool"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "tokenId",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "price",
        "type": "uint256"
      }
    ],
    "name": "listNFTForSale",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "name": "listings",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "price",
        "type": "uint256"
      },
      {
        "internalType": "address",
        "name": "seller",
        "type": "address"
      },
      {
        "internalType": "bool",
        "name": "isListed",
        "type": "bool"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "recipient",
        "type": "address"
      },
      {
        "internalType": "string",
        "name": "metadataURI",
        "type": "string"
      }
    ],
    "name": "mint",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "mintPrice",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "name",
    "outputs": [
      {
        "internalType": "string",
        "name": "",
        "type": "string"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "owner",
    "outputs": [
      {
        "internalType": "address",
        "name": "",
        "type": "address"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "tokenId",
        "type": "uint256"
      }
    ],
    "name": "ownerOf",
    "outputs": [
      {
        "internalType": "address",
        "name": "",
        "type": "address"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "string",
        "name": "metadataURI",
        "type": "string"
      }
    ],
    "name": "publicMint",
    "outputs": [],
    "stateMutability": "payable",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "renounceOwnership",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "from",
        "type": "address"
      },
      {
        "internalType": "address",
        "name": "to",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "tokenId",
        "type": "uint256"
      }
    ],
    "name": "safeTransferFrom",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "from",
        "type": "address"
      },
      {
        "internalType": "address",
        "name": "to",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "tokenId",
        "type": "uint256"
      },
      {
        "internalType": "bytes",
        "name": "data",
        "type": "bytes"
      }
    ],
    "name": "safeTransferFrom",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "operator",
        "type": "address"
      },
      {
        "internalType": "bool",
        "name": "approved",
        "type": "bool"
      }
    ],
    "name": "setApprovalForAll",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "newMintPrice",
        "type": "uint256"
      }
    ],
    "name": "setMintPrice",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "newTransactionFeePercentage",
        "type": "uint256"
      }
    ],
    "name": "setTransactionFeePercentage",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "bytes4",
        "name": "interfaceId",
        "type": "bytes4"
      }
    ],
    "name": "supportsInterface",
    "outputs": [
      {
        "internalType": "bool",
        "name": "",
        "type": "bool"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "symbol",
    "outputs": [
      {
        "internalType": "string",
        "name": "",
        "type": "string"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "index",
        "type": "uint256"
      }
    ],
    "name": "tokenByIndex",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "owner",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "index",
        "type": "uint256"
      }
    ],
    "name": "tokenOfOwnerByIndex",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "tokenId",
        "type": "uint256"
      }
    ],
    "name": "tokenURI",
    "outputs": [
      {
        "internalType": "string",
        "name": "",
        "type": "string"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "owner",
        "type": "address"
      }
    ],
    "name": "tokensOfOwner",
    "outputs": [
      {
        "internalType": "uint256[]",
        "name": "",
        "type": "uint256[]"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "totalSupply",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "transactionFeePercentage",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "from",
        "type": "address"
      },
      {
        "internalType": "address",
        "name": "to",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "tokenId",
        "type": "uint256"
      }
    ],
    "name": "transferFrom",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "from",
        "type": "address"
      },
      {
        "internalType": "address",
        "name": "to",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "tokenId",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "salePrice",
        "type": "uint256"
      }
    ],
    "name": "transferNFT",
    "outputs": [],
    "stateMutability": "payable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "newOwner",
        "type": "address"
      }
    ],
    "name": "transferOwnership",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "tokenId",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "newPrice",
        "type": "uint256"
      }
    ],
    "name": "updateListingPrice",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "withdraw",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  }
];


// Pinata config
const PINATA_API_KEY = 'ef9f0688072357aba6de';
const PINATA_SECRET_KEY = '97a00dae6e62898d2279bb033bccd9383e8d9888094d316a91df2fb66f5a2f35';
const PINATA_ENDPOINT = 'https://api.pinata.cloud/pinning/pinFileToIPFS';
const PINATA_JSON_ENDPOINT = 'https://api.pinata.cloud/pinning/pinJSONToIPFS';

// Forma Testnet config
const FORMA_CHAIN_ID = 984123;
const FORMA_RPC = 'https://rpc.sketchpad-1.forma.art';
const FORMA_EXPLORER = 'https://explorer.sketchpad-1.forma.art/';
const MIN_GAS = '18';
const MINT_PRICE = '0.01';
let web3;
let nftContract;
let userAddress;

// Biến để kiểm tra trạng thái đang generate
let isGeneratingVideo = false;

// Định nghĩa hàm handleGenerateVideo
async function handleGenerateVideo(e) {
  e.preventDefault();

  if (isGeneratingVideo) return;

  const previewImageContainer = document.querySelector(".preview-image");
  const prompt = document.getElementById("prompt").value.trim();

  if (!prompt) {
    alert("Please enter a prompt to generate the video");
    return;
  }

  try {
    isGeneratingVideo = true;

    // Reset container và hiện spinner
    previewImageContainer.innerHTML = `
      <div class="loading-spinner" id="loadingSpinner"></div>
      <svg id="preview-placeholder" width="100" height="100" viewBox="0 0 24 24" fill="none" 
          stroke="currentColor" stroke-width="2">
          <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
          <circle cx="8.5" cy="8.5" r="1.5" />
          <polyline points="21 15 16 10 5 21" />
      </svg>
    `;

    // Hiện spinner và ẩn placeholder
    document.getElementById("loadingSpinner").classList.add('show');
    document.getElementById("preview-placeholder").style.display = 'none';

    // Lấy các thông số từ form
    const formData = {
      num_inference_steps: parseInt(document.getElementById("inferenceSteps").value),
      guidance_scale: parseFloat(document.getElementById("guidanceScale").value),
      user_prompt: prompt
    };

    console.log("Sending video generation request with data:", formData);

    const response = await fetch("http://127.0.0.1:8000/api/generate-video", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const result = await response.json();
    console.log("Received video response");

    // Khi có kết quả, ẩn spinner và hiện video
    if (result.video) {
      previewImageContainer.innerHTML = '';
      const videoElement = document.createElement("video");
      videoElement.src = result.video;
      videoElement.controls = true;
      videoElement.autoplay = true;
      videoElement.loop = true;
      videoElement.style.width = "100%";
      videoElement.style.height = "auto";
      videoElement.style.maxHeight = "300px";
      videoElement.style.borderRadius = "8px";
      previewImageContainer.appendChild(videoElement);
    }

  } catch (error) {
    console.error("Error generating video:", error);
    alert("Failed to generate video. Please try again.");

    // Reset về placeholder khi có lỗi
    previewImageContainer.innerHTML = `
      <svg id="preview-placeholder" width="100" height="100" viewBox="0 0 24 24" fill="none" 
          stroke="currentColor" stroke-width="2">
          <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
          <circle cx="8.5" cy="8.5" r="1.5" />
          <polyline points="21 15 16 10 5 21" />
      </svg>
    `;
  } finally {
    isGeneratingVideo = false;
  }
}

// Khởi tạo khi DOM đã tải xong
document.addEventListener('DOMContentLoaded', function() {
  // Cập nhật giao diện khi thay đổi các thông số
  const inferenceStepsInput = document.getElementById("inferenceSteps");
  const guidanceScaleInput = document.getElementById("guidanceScale");
  const itemNameInput = document.getElementById("itemName");
  const descriptionInput = document.getElementById("description");
  const generateBtn = document.getElementById("generateBtn");
  const createNFTBtn = document.querySelector('.create-nft-btn');

  if (inferenceStepsInput) {
    inferenceStepsInput.addEventListener("input", function(e) {
      const stepsValue = document.getElementById("stepsValue");
      // Giá trị chỉ được chọn từ 1, 2, 4, 8
      const validSteps = [1, 2, 4, 8];
      const currentValue = parseInt(e.target.value);
      
      // Tìm giá trị gần nhất
      let nearestValid = validSteps.reduce((prev, curr) => {
        return (Math.abs(curr - currentValue) < Math.abs(prev - currentValue) ? curr : prev);
      });
      
      e.target.value = nearestValid;
      if (stepsValue) {
        stepsValue.textContent = nearestValid;
      }
    });
  }

  if (guidanceScaleInput) {
    guidanceScaleInput.addEventListener("input", function(e) {
      const scaleValue = document.getElementById("scaleValue");
      if (scaleValue) {
        scaleValue.textContent = e.target.value;
      }
    });
  }

  if (itemNameInput) {
    itemNameInput.addEventListener("input", function(e) {
      const previewName = document.getElementById("previewName");
      if (previewName) {
        previewName.textContent = e.target.value || "NFT Name";
      }
    });
  }

  if (descriptionInput) {
    descriptionInput.addEventListener("input", function(e) {
      const previewDescription = document.getElementById("previewDescription");
      if (previewDescription) {
        previewDescription.textContent = e.target.value || "Description will appear here...";
      }
    });
  }

  // Handle generate video button click
  if (generateBtn) {
    generateBtn.addEventListener("click", handleGenerateVideo);
  }

  // Initialize Web3 when the page loads
  initWeb3().catch(error => {
    console.error('Failed to initialize Web3:', error);
    showNotification(error.message, 'error');
  });

  // Handle create NFT button click
  if (createNFTBtn) {
    createNFTBtn.addEventListener('click', handleCreateVideoNFT);
  }
});

// Web3 initialization
async function initWeb3() {
  if (typeof window.ethereum !== 'undefined') {
    try {
      await window.ethereum.request({ method: 'eth_requestAccounts' });
      web3 = new Web3(window.ethereum);
      const accounts = await web3.eth.getAccounts();
      userAddress = accounts[0];
      
      // Initialize contract
      nftContract = new web3.eth.Contract(contractABI, contractAddress);
      
      await checkNetwork();
    } catch (error) {
      console.error('Error initializing Web3:', error);
      throw error;
    }
  } else {
    throw new Error('Please install MetaMask!');
  }
}

// Check and switch network if needed
async function checkNetwork() {
  try {
    await window.ethereum.request({
      method: 'wallet_switchEthereumChain',
      params: [{ chainId: web3.utils.toHex(FORMA_CHAIN_ID) }],
    });
  } catch (switchError) {
    if (switchError.code === 4902) {
      try {
        await window.ethereum.request({
          method: 'wallet_addEthereumChain',
          params: [{
            chainId: web3.utils.toHex(FORMA_CHAIN_ID),
            chainName: 'Forma Testnet (Sketchpad-1)',
            nativeCurrency: {
              name: 'TIA',
              symbol: 'TIA',
              decimals: 18
            },
            rpcUrls: [FORMA_RPC],
            blockExplorerUrls: [FORMA_EXPLORER]
          }]
        });
      } catch (addError) {
        throw addError;
      }
    }
    throw switchError;
  }
}

// Các hàm tiện ích
function showLoadingModal() {
  const modal = document.createElement('div');
  modal.className = 'loading-modal';
  modal.id = 'loading-modal';

  modal.innerHTML = `
      <div class="loading-content">
          <div class="loading-title">Creating Your NFT</div>
          <div class="loading-steps">
              <div class="loading-step" id="step-image">
                  <div class="step-status step-pending">
                      <i class="bi bi-circle"></i>
                  </div>
                  <div class="step-text">
                      <i class="bi bi-cloud-upload me-2"></i>
                      Uploading video to IPFS
                  </div>
              </div>
              <div class="loading-step" id="step-metadata">
                  <div class="step-status step-pending">
                      <i class="bi bi-circle"></i>
                  </div>
                  <div class="step-text">
                      <i class="bi bi-file-earmark-text me-2"></i>
                      Uploading metadata to IPFS
                  </div>
              </div>
              <div class="loading-step" id="step-mint">
                  <div class="step-status step-pending">
                      <i class="bi bi-circle"></i>
                  </div>
                  <div class="step-text">
                      <i class="bi bi-coin me-2"></i>
                      Minting NFT on blockchain
                  </div>
              </div>
          </div>
      </div>
  `;

  document.body.appendChild(modal);
}

function updateLoadingStep(step, status) {
  const stepElement = document.getElementById(`step-${step}`);
  if (!stepElement) return;

  const statusElement = stepElement.querySelector('.step-status');
  statusElement.className = 'step-status';

  switch (status) {
    case 'loading':
      statusElement.className += ' step-loading';
      statusElement.innerHTML = '<i class="bi bi-arrow-repeat"></i>';
      break;
    case 'success':
      statusElement.className += ' step-success';
      statusElement.innerHTML = '<i class="bi bi-check-circle-fill"></i>';
      break;
    default:
      statusElement.className += ' step-pending';
      statusElement.innerHTML = '<i class="bi bi-circle"></i>';
  }
}

function hideLoadingModal() {
  const modal = document.getElementById('loading-modal');
  if (modal) {
    document.body.removeChild(modal);
  }
}

function showSuccessModal(result) {
  const modalBackdrop = document.getElementById('modal-backdrop');
  const modal = document.getElementById('nft-info-modal');
  const modalContent = document.getElementById('nft-info-content');

  modalContent.innerHTML = `
      <div class="modal-header">
          <h3>NFT Created Successfully!</h3>
          <button class="modal-close-btn" onclick="closeNFTModal()">×</button>
      </div>
      <div class="nft-success-info">
          <div class="nft-preview-section">
              <div class="nft-video-preview">
                  <video src="${result.metadata.image.replace('ipfs://', 'https://ipfs.io/ipfs/')}" 
                       controls autoplay loop
                       alt="${result.metadata.name}">
                  </video>
              </div>
              <div class="nft-basic-info">
                  <h2>${result.metadata.name}</h2>
                  <p class="description">${result.metadata.description || 'No description'}</p>
                  <div class="token-id">
                      <span class="label">Token ID:</span>
                      <span class="value">#${result.tokenId}</span>
                  </div>
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
                          <span class="info-label">Contract</span>
                          <span class="info-value">
                              <a href="https://explorer.sketchpad-1.forma.art/address/${result.contractAddress}" 
                                target="_blank" title="${result.contractAddress}">
                                  ${result.contractAddress.substring(0, 6)}...${result.contractAddress.substring(38)}
                              </a>
                          </span>
                      </div>
                      <div class="info-row">
                          <span class="info-label">Token Standard</span>
                          <span class="info-value">ERC-721</span>
                      </div>
                      <div class="info-row">
                          <span class="info-label">Type</span>
                          <span class="info-value">Video NFT</span>
                      </div>
                  </div>
              </div>

              <div class="tab-content" id="properties">
                  <div class="properties-grid">
                      ${result.metadata.attributes && result.metadata.attributes.length > 0 ?
                        result.metadata.attributes.map(attr => `
                            <div class="property-item">
                                <span class="property-type">${attr.trait_type}</span>
                                <span class="property-value">${attr.value}</span>
                            </div>
                        `).join('') :
                        '<p class="no-properties">No properties</p>'
                      }
                  </div>
              </div>

              <div class="tab-content" id="blockchain">
                  <div class="info-group">
                      <div class="info-row">
                          <span class="info-label">Transaction</span>
                          <span class="info-value">
                              <a href="https://explorer.sketchpad-1.forma.art/tx/${result.tx.transactionHash}" 
                                target="_blank" title="${result.tx.transactionHash}">
                                  View on Explorer
                              </a>
                          </span>
                      </div>
                      <div class="info-row">
                          <span class="info-label">IPFS Video</span>
                          <span class="info-value">
                              <a href="https://ipfs.io/ipfs/${result.imageHash.replace('ipfs://', '')}" 
                                target="_blank">View on IPFS</a>
                          </span>
                      </div>
                      <div class="info-row">
                          <span class="info-label">IPFS Metadata</span>
                          <span class="info-value">
                              <a href="https://ipfs.io/ipfs/${result.metadataHash.replace('ipfs://', '')}" 
                                target="_blank">View on IPFS</a>
                          </span>
                      </div>
                  </div>
              </div>
          </div>
      </div>
  `;

  // Thêm xử lý cho tabs
  setTimeout(() => {
    const tabBtns = modal.querySelectorAll('.tab-btn');
    const tabContents = modal.querySelectorAll('.tab-content');

    tabBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        const tabId = btn.getAttribute('data-tab');

        // Remove active class from all buttons and contents
        tabBtns.forEach(b => b.classList.remove('active'));
        tabContents.forEach(c => c.classList.remove('active'));

        // Add active class to clicked button and corresponding content
        btn.classList.add('active');
        document.getElementById(tabId).classList.add('active');
      });
    });
  }, 100);

  modalBackdrop.style.display = 'block';
  modal.style.display = 'block';
}

function closeNFTModal() {
  const modalBackdrop = document.getElementById('modal-backdrop');
  const modal = document.getElementById('nft-info-modal');

  if (modalBackdrop) {
    modalBackdrop.style.display = 'none';
  }
  if (modal) {
    modal.style.display = 'none';
  }
}

function showNotification(message, type = 'success') {
  const notification = document.createElement('div');
  notification.className = `notification ${type}`;
  notification.textContent = message;
  document.body.appendChild(notification);

  setTimeout(() => {
    notification.remove();
  }, 3000);
}

// Hàm để tải lên IPFS
async function uploadToIPFS(file) {
  try {
    const formData = new FormData();

    if (file instanceof File || file instanceof Blob) {
      formData.append('file', file);
    } else if (typeof file === 'object') {
      // Nếu là metadata, chuyển thành JSON
      const blob = new Blob([JSON.stringify(file)], { type: 'application/json' });
      formData.append('file', blob);
    } else {
      throw new Error('Invalid file format');
    }

    const config = {
      headers: {
        'Content-Type': 'multipart/form-data',
        'pinata_api_key': PINATA_API_KEY,
        'pinata_secret_api_key': PINATA_SECRET_KEY
      }
    };

    const response = await axios.post(PINATA_ENDPOINT, formData, config);

    if (response.status === 200) {
      return response.data.IpfsHash;
    } else {
      throw new Error(`Pinata upload failed: ${response.statusText}`);
    }
  } catch (error) {
    console.error('Error uploading to IPFS:', error);
    showNotification('Failed to upload to IPFS: ' + error.message, 'error');
    throw error;
  }
}

// Create NFT handler
async function handleCreateVideoNFT() {
  try {
    // Kiểm tra đã kết nối ví chưa
    if (!userAddress) {
      throw new Error('Please connect your wallet first');
    }

    // Kiểm tra xem đã có video được generate chưa
    const previewVideo = document.querySelector('.preview-image video');
    if (!previewVideo) {
      throw new Error('Please generate a video first');
    }

    // Lấy thông tin từ form
    const name = document.getElementById('itemName').value.trim();
    const description = document.getElementById('description').value.trim();
    const royalty = document.getElementById('nft-royalty').value;

    // Validate
    if (!name) throw new Error('Please enter NFT name');
    if (!description) throw new Error('Please enter NFT description');
    if (royalty && (royalty < 0 || royalty > 15)) {
      throw new Error('Royalty must be between 0 and 15%');
    }

    // Hiển thị loading modal
    showLoadingModal();

    // Upload video đã generate lên IPFS
    updateLoadingStep('image', 'loading');
    
    // Lấy video dưới dạng blob
    const videoSrc = previewVideo.src;
    const fetchResponse = await fetch(videoSrc);
    const videoBlob = await fetchResponse.blob();
    const videoFile = new File([videoBlob], 'generated-video.mp4', { type: 'video/mp4' });
    
    const videoHash = await uploadToIPFS(videoFile);
    updateLoadingStep('image', 'success');

    // Thu thập attributes
    const attributes = [];
    const propertyRows = document.querySelectorAll('.property-row');
    propertyRows.forEach(row => {
      const nameInput = row.querySelector('.property-name');
      const valueInput = row.querySelector('.property-value');
      if (nameInput && valueInput && nameInput.value.trim() && valueInput.value.trim()) {
        attributes.push({
          trait_type: nameInput.value.trim(),
          value: valueInput.value.trim()
        });
      }
    });

    // Thêm thuộc tính mặc định cho video
    attributes.push({
      trait_type: "Type",
      value: "Video"
    });

    // Chuẩn bị metadata
    updateLoadingStep('metadata', 'loading');
    const metadata = {
      name: name,
      description: description,
      image: `ipfs://${videoHash}`, // Sử dụng cả image và animation_url
      animation_url: `ipfs://${videoHash}`, // Để hỗ trợ các marketplace hiển thị video
      attributes: attributes,
      fileType: "video/mp4"
    };

    // Upload metadata
    const metadataHash = await uploadToIPFS(metadata);
    updateLoadingStep('metadata', 'success');

    // Mint NFT
    updateLoadingStep('mint', 'loading');
    const tx = await nftContract.methods.publicMint(`ipfs://${metadataHash}`).send({
      from: userAddress,
      value: web3.utils.toWei(MINT_PRICE, 'ether')
    });

    // Lấy tokenId từ event Transfer
    const mintEvent = tx.events.Transfer;
    const tokenId = mintEvent.returnValues.tokenId;
    console.log('Token ID:', tokenId);
    updateLoadingStep('mint', 'success');

    // Lưu NFT vào database
    try {
      const response = await fetch('http://localhost:8000/api/save-nft', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          walletAddress: userAddress,
          metadataUri: `ipfs://${metadataHash}`,
          tokenId: parseInt(tokenId),
          fileType: "video/mp4"
        })
      });

      if (!response.ok) {
        throw new Error('Failed to save NFT to database');
      }
    } catch (dbError) {
      console.error('Error saving NFT to database:', dbError);
    }

    // Hiển thị thông báo thành công
    showSuccessModal({
      tx,
      tokenId,
      contractAddress,
      imageHash: videoHash,
      metadataHash,
      metadata
    });

  } catch (error) {
    console.error('Error creating NFT:', error);
    showNotification(error.message, 'error');
  } finally {
    hideLoadingModal();
  }
}