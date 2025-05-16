// ABI
const contractAddress = "0xDeE9B116D1D712B4147A8a85A5B960f048D99ff8";
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
      {
        indexed: false,
        internalType: "uint256",
        name: "price",
        type: "uint256",
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

let web3;
let nftContract;
let userAddress;

// Pinata config
const PINATA_API_KEY = "ef9f0688072357aba6de";
const PINATA_SECRET_KEY =
  "97a00dae6e62898d2279bb033bccd9383e8d9888094d316a91df2fb66f5a2f35";
const PINATA_ENDPOINT = "https://api.pinata.cloud/pinning/pinFileToIPFS";
const PINATA_JSON_ENDPOINT = "https://api.pinata.cloud/pinning/pinJSONToIPFS";

// Forma Testnet config
const FORMA_CHAIN_ID = 984123;
const FORMA_RPC = "https://rpc.sketchpad-1.forma.art";
const FORMA_EXPLORER = "https://explorer.sketchpad-1.forma.art/";
const MIN_GAS = "18";

const MINT_PRICE = "0.01";

// Đợi DOM load xong
document.addEventListener("DOMContentLoaded", function () {
  // Chỉ ngăn chặn form submit, không ngăn chặn tất cả các nút
  document.addEventListener("submit", function (e) {
    e.preventDefault();
    return false;
  });

  // Thêm event listener cho module switch
  const moduleSwitch = document.getElementById("generativeModule");
  if (moduleSwitch) {
    moduleSwitch.addEventListener("change", function (e) {
      const isVideo = e.target.checked;
      updateUIForModule(isVideo);
    });
  }

  // Update preview in real-time
  const itemNameInput = document.getElementById("itemName");
  const descriptionInput = document.getElementById("description");
  const inferenceStepsInput = document.getElementById("inferenceSteps");
  const guidanceScaleInput = document.getElementById("guidanceScale");
  const generateBtn = document.getElementById("generateBtn");

  if (itemNameInput) {
    itemNameInput.addEventListener("input", function (e) {
      const previewName = document.getElementById("previewName");
      if (previewName) {
        previewName.textContent = e.target.value || "NFT Name";
      }
    });
  }

  if (descriptionInput) {
    descriptionInput.addEventListener("input", function (e) {
      const previewDescription = document.getElementById("previewDescription");
      if (previewDescription) {
        previewDescription.textContent =
          e.target.value || "Description will appear here...";
      }
    });
  }

  // Update slider values
  if (inferenceStepsInput) {
    inferenceStepsInput.addEventListener("input", function (e) {
      const stepsValue = document.getElementById("stepsValue");
      if (stepsValue) {
        stepsValue.textContent = e.target.value;
      }
    });
  }

  if (guidanceScaleInput) {
    guidanceScaleInput.addEventListener("input", function (e) {
      const scaleValue = document.getElementById("scaleValue");
      if (scaleValue) {
        scaleValue.textContent = e.target.value;
      }
    });
  }

  // Handle generate button click
  if (generateBtn) {
    generateBtn.addEventListener("click", async function (e) {
      e.preventDefault();
      if (!isGenerating) {
        await handleGenerate();
      }
    });
  }

  // Initialize Web3
  initWeb3().catch((error) => {
    console.error("Failed to initialize Web3:", error);
    showNotification(error.message, "error");
  });

  // Click outside để đóng modal
  const modalBackdrop = document.getElementById("modal-backdrop");
  if (modalBackdrop) {
    modalBackdrop.addEventListener("click", function (e) {
      if (e.target === modalBackdrop) {
        closeNFTModal();
      }
    });
  }

  // Click nút close để đóng modal
  const closeButtons = document.querySelectorAll(".close-button");
  closeButtons.forEach((button) => {
    button.addEventListener("click", closeNFTModal);
  });
});

// Biến để kiểm tra trạng thái đang generate
let isGenerating = false;

// Thêm biến để theo dõi trạng thái loading
let isLoadingModels = false;

// Thêm biến để lưu lỗi gần nhất
let lastError = null;

// Hàm cập nhật UI dựa trên module được chọn
function updateUIForModule(isVideo) {
  const generateBtn = document.getElementById("generateBtn");
  const previewImageContainer = document.querySelector(".preview-image");
  const inferenceStepsInput = document.getElementById("inferenceSteps");
  const guidanceScaleInput = document.getElementById("guidanceScale");
  const stepsValue = document.getElementById("stepsValue");
  const scaleValue = document.getElementById("scaleValue");

  if (generateBtn) {
    generateBtn.textContent = isVideo ? "Generate Video" : "Generate Image";
  }

  // Cập nhật các input controls dựa trên module
  if (isVideo) {
    // Video mode
    if (inferenceStepsInput) {
      inferenceStepsInput.min = "1";
      inferenceStepsInput.max = "8";
      inferenceStepsInput.step = "1";
      inferenceStepsInput.value = "4"; // Default value for video
      if (stepsValue) stepsValue.textContent = "4";

      // Chỉ cho phép các giá trị 1, 2, 4, 8
      inferenceStepsInput.addEventListener("input", function (e) {
        const value = parseInt(e.target.value);
        const validValues = [1, 2, 4, 8];
        const closest = validValues.reduce((prev, curr) => {
          return Math.abs(curr - value) < Math.abs(prev - value) ? curr : prev;
        });
        e.target.value = closest;
        if (stepsValue) stepsValue.textContent = closest;
      });
    }

    if (guidanceScaleInput) {
      guidanceScaleInput.min = "1.0";
      guidanceScaleInput.max = "10.0";
      guidanceScaleInput.step = "0.5";
      guidanceScaleInput.value = "1.0"; // Default value for video
      if (scaleValue) scaleValue.textContent = "1.0";
    }
  } else {
    // Image mode
    if (inferenceStepsInput) {
      inferenceStepsInput.min = "20";
      inferenceStepsInput.max = "100";
      inferenceStepsInput.step = "1";
      inferenceStepsInput.value = "50"; // Default value for image
      if (stepsValue) stepsValue.textContent = "50";
    }

    if (guidanceScaleInput) {
      guidanceScaleInput.min = "1.0";
      guidanceScaleInput.max = "10.0";
      guidanceScaleInput.step = "0.5";
      guidanceScaleInput.value = "8.5"; // Default value for image
      if (scaleValue) scaleValue.textContent = "8.5";
    }
  }

  // Cập nhật container preview dựa trên loại module
  if (previewImageContainer) {
    if (isVideo) {
      previewImageContainer.innerHTML = `
        <video id="preview-video" controls autoplay loop muted style="width: 100%; height: 100%; object-fit: cover; display: none;">
          Your browser does not support the video tag.
        </video>
        <div class="loading-spinner" id="loadingSpinner"></div>
        <svg id="preview-placeholder" width="100" height="100" viewBox="0 0 24 24" fill="none" 
            stroke="currentColor" stroke-width="2">
            <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
            <circle cx="8.5" cy="8.5" r="1.5" />
            <polyline points="21 15 16 10 5 21" />
        </svg>
      `;
    } else {
      previewImageContainer.innerHTML = `
        <div class="loading-spinner" id="loadingSpinner"></div>
        <svg id="preview-placeholder" width="100" height="100" viewBox="0 0 24 24" fill="none" 
            stroke="currentColor" stroke-width="2">
            <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
            <circle cx="8.5" cy="8.5" r="1.5" />
            <polyline points="21 15 16 10 5 21" />
        </svg>
      `;
    }
  }
}

// Hàm xử lý generate chung
async function handleGenerate() {
  if (isGenerating) return;

  try {
    isGenerating = true;
    const isVideo = document.getElementById("generativeModule")?.checked;

    if (isVideo) {
      await handleGenerateVideo();
    } else {
      await handleGenerateImage();
    }
  } catch (error) {
    console.error("Error in handleGenerate:", error);
  } finally {
    isGenerating = false;
  }
}

// Định nghĩa hàm handleGenerateImage
async function handleGenerateImage() {
  const loadingSpinner = document.getElementById("loadingSpinner");
  const previewPlaceholder = document.getElementById("preview-placeholder");
  const previewImageContainer = document.querySelector(".preview-image");
  const prompt = document.getElementById("prompt").value.trim();

  if (!prompt) {
    alert("Please enter a prompt to generate the image");
    return;
  }

  try {
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
    document.getElementById("loadingSpinner").classList.add("show");
    document.getElementById("preview-placeholder").style.display = "none";

    const formData = {
      num_inference_steps: parseInt(
        document.getElementById("inferenceSteps").value
      ),
      guidance_scale: parseFloat(
        document.getElementById("guidanceScale").value
      ),
      width: parseInt(document.getElementById("width").value || 512),
      height: parseInt(document.getElementById("height").value || 512),
      user_prompt: prompt,
    };

    console.log("Sending request with data:", formData);

    const response = await fetch("http://127.0.0.1:8000/api/generate-art", {
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
    console.log("Received response:", result);

    // Khi có kết quả, ẩn spinner và hiện ảnh
    if (result.image) {
      previewImageContainer.innerHTML = "";
      const previewImage = document.createElement("img");
      previewImage.src = result.image;
      previewImage.style.width = "100%";
      previewImage.style.height = "100%";
      previewImage.style.objectFit = "cover";
      previewImageContainer.appendChild(previewImage);
    }
  } catch (error) {
    console.error("Error generating image:", error);
    alert("Failed to generate image. Please try again.");

    // Reset về placeholder khi có lỗi
    previewImageContainer.innerHTML = `
      <svg id="preview-placeholder" width="100" height="100" viewBox="0 0 24 24" fill="none" 
          stroke="currentColor" stroke-width="2">
          <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
          <circle cx="8.5" cy="8.5" r="1.5" />
          <polyline points="21 15 16 10 5 21" />
      </svg>
    `;
  }
}

// Định nghĩa hàm handleGenerateVideo
async function handleGenerateVideo() {
  const generateBtn = document.getElementById('generateBtn');
  const previewContainer = document.querySelector('.preview-image');
  const prompt = document.getElementById('prompt').value;

  if (!prompt) {
    showNotification("Please enter a prompt", "error");
    return;
  }

  try {
    // Disable button and show loading state
    generateBtn.disabled = true;
    generateBtn.textContent = 'Generating...';

    // Reset preview container to show loading state
    previewContainer.innerHTML = `
      <div class="loading-spinner"></div>
      <div class="generation-progress">
        <div class="progress-text">Generating video...</div>
        <div class="elapsed-time">0:00</div>
      </div>
    `;

    // Start timer
    let startTime = Date.now();
    const timerInterval = setInterval(() => {
      const elapsedSeconds = Math.floor((Date.now() - startTime) / 1000);
      const minutes = Math.floor(elapsedSeconds / 60);
      const seconds = elapsedSeconds % 60;
      document.querySelector('.elapsed-time').textContent = 
        `${minutes}:${seconds.toString().padStart(2, '0')}`;
    }, 1000);

    // Get parameters
    const num_inference_steps = parseInt(document.getElementById('inferenceSteps').value);
    const guidance_scale = parseFloat(document.getElementById('guidanceScale').value);
    const width = parseInt(document.getElementById('width').value);
    const height = parseInt(document.getElementById('height').value);

    // Generate video
    const response = await fetch('http://127.0.0.1:8000/api/generate-video', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        num_inference_steps,
        guidance_scale,
        width,
        height,
        user_prompt: prompt
      })
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const result = await response.json();
    clearInterval(timerInterval);

    if (!result.video_data) {
      throw new Error('No video data received from server');
    }

    // Create video element
    const videoElement = document.createElement('video');
    videoElement.id = 'preview-video';
    videoElement.controls = true;
    videoElement.autoplay = true;
    videoElement.loop = true;
    videoElement.muted = true;
    videoElement.style.width = '100%';
    videoElement.style.height = '100%';
    videoElement.style.objectFit = 'contain';
    videoElement.style.display = 'none';

    // Add loading indicator for video
    previewContainer.innerHTML = `
      <div class="loading-spinner"></div>
      <div class="generation-progress">
        <div class="progress-text">Loading video...</div>
      </div>
    `;

    // Set up video event handlers
    videoElement.onloadeddata = function() {
      // Hide loading elements
      const spinner = previewContainer.querySelector('.loading-spinner');
      const progress = previewContainer.querySelector('.generation-progress');
      if (spinner) spinner.style.display = 'none';
      if (progress) progress.style.display = 'none';
      
      // Show video
      videoElement.style.display = 'block';
      
      // Show generation stats
      showNotification(
        `Video generated in ${result.generation_time.toFixed(1)}s (${result.num_frames} frames at ${result.fps} FPS)`, 
        "success"
      );
    };

    videoElement.onerror = function(e) {
      console.error("Video error:", e);
      showNotification("Error loading video", "error");
      previewContainer.innerHTML = `
        <svg id="preview-placeholder" width="100" height="100" viewBox="0 0 24 24" fill="none" 
            stroke="currentColor" stroke-width="2">
            <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
            <circle cx="8.5" cy="8.5" r="1.5" />
            <polyline points="21 15 16 10 5 21" />
        </svg>
      `;
    };

    // Set video source directly from base64
    videoElement.src = `data:video/mp4;base64,${result.video_data}`;
    
    // Add video element to container
    previewContainer.appendChild(videoElement);

  } catch (error) {
    console.error("Error generating video:", error);
    clearInterval(timerInterval);
    showNotification(error.message, "error");
    
    // Reset preview container on error
    previewContainer.innerHTML = `
      <svg id="preview-placeholder" width="100" height="100" viewBox="0 0 24 24" fill="none" 
          stroke="currentColor" stroke-width="2">
          <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
          <circle cx="8.5" cy="8.5" r="1.5" />
          <polyline points="21 15 16 10 5 21" />
      </svg>
    `;
  } finally {
    // Re-enable generate button
    generateBtn.disabled = false;
    generateBtn.textContent = 'Generate Video';
  }
}

// Hàm xử lý lỗi video riêng
function handleVideoError(error) {
  // Hiển thị placeholder
  const previewPlaceholder = document.getElementById("preview-placeholder");
  if (previewPlaceholder) {
    previewPlaceholder.style.display = "block";
  }

  // Xóa video cũ nếu có
  const oldVideo = document.getElementById("preview-video");
  if (oldVideo) {
    oldVideo.remove();
  }

  // Lưu thông tin lỗi
  const errorInfo = {
    message: error.message || "Error loading video",
    timestamp: new Date().toISOString(),
    details: typeof error === 'object' ? JSON.stringify(error, Object.getOwnPropertyNames(error)) : String(error),
    stack: error.stack || 'No stack trace available'
  };

  // Lưu vào localStorage
  localStorage.setItem('videoGenerationError', JSON.stringify(errorInfo));

  // Hiển thị thông báo lỗi
  showNotification(errorInfo.message, "error", 0);

  // Thêm nút xem lỗi
  addViewErrorButton();
}

// Hàm thêm nút xem lỗi
function addViewErrorButton() {
  const container = document.querySelector('.preview-container');
  if (!container) return;

  // Xóa nút cũ nếu có
  const oldButton = document.getElementById('view-error-btn');
  if (oldButton) {
    oldButton.remove();
  }

  const viewErrorBtn = document.createElement('button');
  viewErrorBtn.id = 'view-error-btn';
  viewErrorBtn.className = 'view-error-btn';
  viewErrorBtn.textContent = 'View Error Details';
  viewErrorBtn.onclick = showLastError;

  container.appendChild(viewErrorBtn);
}

// Hàm hiển thị lỗi gần nhất
function showLastError() {
  const errorData = localStorage.getItem('videoGenerationError');
  if (!errorData) return;

  try {
    const error = JSON.parse(errorData);
    const modalHtml = `
      <div id="error-modal" class="error-modal">
        <div class="error-modal-content">
          <div class="error-modal-header">
            <h3>Generation Error</h3>
            <button onclick="closeErrorModal()" class="close-error-modal">&times;</button>
          </div>
          <div class="error-modal-body">
            <p class="error-message">${error.message}</p>
            <div class="error-details">
              <p><strong>Time:</strong> ${new Date(error.timestamp).toLocaleString()}</p>
              <p><strong>Details:</strong></p>
              <pre>${error.details}</pre>
              ${error.stack ? `<p><strong>Stack:</strong></p><pre>${error.stack}</pre>` : ''}
            </div>
          </div>
          <div class="error-modal-footer">
            <button onclick="copyErrorDetails()" class="copy-error">Copy Details</button>
            <button onclick="closeErrorModal()" class="close-btn">Close</button>
          </div>
        </div>
      </div>
    `;

    document.body.insertAdjacentHTML('beforeend', modalHtml);
  } catch (e) {
    console.error('Error parsing saved error:', e);
  }
}

// Hàm đóng modal lỗi
function closeErrorModal() {
  const modal = document.getElementById('error-modal');
  if (modal) {
    modal.remove();
  }
}

// Hàm copy chi tiết lỗi
function copyErrorDetails() {
  const errorData = localStorage.getItem('videoGenerationError');
  if (errorData) {
    try {
      const error = JSON.parse(errorData);
      const errorText = `
Error Message: ${error.message}
Time: ${new Date(error.timestamp).toLocaleString()}
Details: ${error.details}
Stack: ${error.stack || 'N/A'}
      `.trim();

      navigator.clipboard.writeText(errorText).then(() => {
        showNotification("Error details copied to clipboard", "info");
      });
    } catch (e) {
      console.error('Error copying error details:', e);
    }
  }
}

// Thêm function để hiển thị thông báo loading progress
function updateLoadingProgress(message) {
  const loadingSpinner = document.getElementById("loadingSpinner");
  if (loadingSpinner) {
    const progressText = document.createElement("div");
    progressText.className = "loading-progress-text";
    progressText.textContent = message;
    loadingSpinner.appendChild(progressText);
  }
}

// Thêm các hàm utility
// Thêm các hàm utility cần thiết
async function initWeb3() {
  if (typeof window.ethereum !== "undefined") {
    try {
      await window.ethereum.request({ method: "eth_requestAccounts" });
      web3 = new Web3(window.ethereum);
      const accounts = await web3.eth.getAccounts();
      userAddress = accounts[0];
      nftContract = new web3.eth.Contract(contractABI, contractAddress);
      await checkNetwork();
    } catch (error) {
      console.error("Error initializing Web3:", error);
      throw error;
    }
  } else {
    throw new Error("Please install MetaMask!");
  }
}

async function uploadToIPFS(file) {
  try {
    const formData = new FormData();

    if (file instanceof File || file instanceof Blob) {
      formData.append("file", file);
    } else if (typeof file === "object") {
      // Nếu là metadata, chuyển thành JSON
      const blob = new Blob([JSON.stringify(file)], {
        type: "application/json",
      });
      formData.append("file", blob);
    } else {
      throw new Error("Invalid file format");
    }

    const config = {
      headers: {
        "Content-Type": "multipart/form-data",
        pinata_api_key: PINATA_API_KEY,
        pinata_secret_api_key: PINATA_SECRET_KEY,
      },
    };

    const response = await axios.post(
      "https://api.pinata.cloud/pinning/pinFileToIPFS",
      formData,
      config
    );

    if (response.status === 200) {
      return response.data.IpfsHash;
    } else {
      throw new Error(`Pinata upload failed: ${response.statusText}`);
    }
  } catch (error) {
    console.error("Error uploading to IPFS:", error);
    showNotification("Failed to upload to IPFS: " + error.message, "error");
    throw error;
  }
}

async function uploadMetadataToIPFS(metadata) {
  try {
    const formattedMetadata = {
      name: metadata.name,
      description: metadata.description,
      image: metadata.image,
      attributes: metadata.attributes || [],
    };

    const response = await axios.post(PINATA_JSON_ENDPOINT, formattedMetadata, {
      headers: {
        "Content-Type": "application/json",
        pinata_api_key: PINATA_API_KEY,
        pinata_secret_api_key: PINATA_SECRET_KEY,
      },
    });

    return `ipfs://${response.data.IpfsHash}`;
  } catch (error) {
    console.error("Error uploading metadata:", error);
    throw error;
  }
}

// Thêm hàm hiển thị loading modal
function showLoadingModal() {
  const modal = document.createElement("div");
  modal.className = "loading-modal";
  modal.id = "loading-modal";

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
                        Uploading image to IPFS
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

  const statusElement = stepElement.querySelector(".step-status");
  statusElement.className = "step-status";

  switch (status) {
    case "loading":
      statusElement.className += " step-loading";
      statusElement.innerHTML = '<i class="bi bi-arrow-repeat"></i>';
      break;
    case "success":
      statusElement.className += " step-success";
      statusElement.innerHTML = '<i class="bi bi-check-circle-fill"></i>';
      break;
    default:
      statusElement.className += " step-pending";
      statusElement.innerHTML = '<i class="bi bi-circle"></i>';
  }
}

function hideLoadingModal() {
  const modal = document.getElementById("loading-modal");
  if (modal) {
    document.body.removeChild(modal);
  }
}

// Hàm hiển thị modal thành công
function showSuccessModal(result) {
  const modalBackdrop = document.getElementById("modal-backdrop");
  const modal = document.getElementById("nft-info-modal");
  const modalContent = document.getElementById("nft-info-content");

  modalContent.innerHTML = `
        <div class="modal-header">
            <h3>NFT Created Successfully!</h3>
            <button class="modal-close-btn" onclick="closeNFTModal()">×</button>
        </div>
        <div class="nft-success-info">
            <div class="nft-preview-section">
                <div class="nft-image-preview">
                    <img src="${result.metadata.image.replace(
                      "ipfs://",
                      "https://ipfs.io/ipfs/"
                    )}" 
                         alt="${result.metadata.name}">
                </div>
                <div class="nft-basic-info">
                    <h2>${result.metadata.name}</h2>
                    <p class="description">${
                      result.metadata.description || "No description"
                    }</p>
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
                                <a href="https://explorer.sketchpad-1.forma.art/address/${
                                  result.contractAddress
                                }" 
                                   target="_blank" title="${
                                     result.contractAddress
                                   }">
                                    ${result.contractAddress.substring(
                                      0,
                                      6
                                    )}...${result.contractAddress.substring(38)}
                                </a>
                            </span>
                        </div>
                        <div class="info-row">
                            <span class="info-label">Token Standard</span>
                            <span class="info-value">ERC-721</span>
                        </div>
                    </div>
                </div>

                <div class="tab-content" id="properties">
                    <div class="properties-grid">
                        ${
                          result.metadata.attributes &&
                          result.metadata.attributes.length > 0
                            ? result.metadata.attributes
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
                            <span class="info-label">Transaction</span>
                            <span class="info-value">
                                <a href="https://explorer.sketchpad-1.forma.art/tx/${
                                  result.tx.transactionHash
                                }" 
                                   target="_blank" title="${
                                     result.tx.transactionHash
                                   }">
                                    View on Explorer
                                </a>
                            </span>
                        </div>
                        <div class="info-row">
                            <span class="info-label">IPFS Image</span>
                            <span class="info-value">
                                <a href="https://ipfs.io/ipfs/${result.imageHash.replace(
                                  "ipfs://",
                                  ""
                                )}" 
                                   target="_blank">View on IPFS</a>
                            </span>
                        </div>
                        <div class="info-row">
                            <span class="info-label">IPFS Metadata</span>
                            <span class="info-value">
                                <a href="https://ipfs.io/ipfs/${result.metadataHash.replace(
                                  "ipfs://",
                                  ""
                                )}" 
                                   target="_blank">View on IPFS</a>
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

  modalBackdrop.style.display = "block";
  modal.style.display = "block";
}

// Sửa lại hàm closeNFTModal
function closeNFTModal() {
  const modalBackdrop = document.getElementById("modal-backdrop");
  const modal = document.getElementById("nft-info-modal");

  if (modalBackdrop) {
    modalBackdrop.style.display = "none";
  }
  if (modal) {
    modal.style.display = "none";
  }
}

async function checkNetwork() {
  try {
    await window.ethereum.request({
      method: "wallet_switchEthereumChain",
      params: [{ chainId: web3.utils.toHex(FORMA_CHAIN_ID) }],
    });
  } catch (switchError) {
    if (switchError.code === 4902) {
      try {
        await window.ethereum.request({
          method: "wallet_addEthereumChain",
          params: [
            {
              chainId: web3.utils.toHex(FORMA_CHAIN_ID),
              chainName: "Forma Testnet (Sketchpad-1)",
              nativeCurrency: {
                name: "TIA",
                symbol: "TIA",
                decimals: 18,
              },
              rpcUrls: [FORMA_RPC],
              blockExplorerUrls: [FORMA_EXPLORER],
            },
          ],
        });
      } catch (addError) {
        throw addError;
      }
    }
    throw switchError;
  }
}

// Hàm chuyển đổi base64 thành File object
function base64ToFile(base64String, filename) {
  // Tách header data URI và data
  const arr = base64String.split(",");
  const mime = arr[0].match(/:(.*?);/)[1];
  const bstr = atob(arr[1]);
  let n = bstr.length;
  const u8arr = new Uint8Array(n);

  while (n--) {
    u8arr[n] = bstr.charCodeAt(n);
  }

  return new File([u8arr], filename, { type: mime });
}

// Notification function
function showNotification(message, type = "success", duration = 5000) {
  const notification = document.createElement("div");
  notification.className = `notification ${type}`;
  
  // Thêm icon phù hợp với loại thông báo
  let icon = '';
  switch(type) {
    case 'success':
      icon = '<i class="fas fa-check-circle"></i>';
      break;
    case 'error':
      icon = '<i class="fas fa-exclamation-circle"></i>';
      break;
    case 'info':
      icon = '<i class="fas fa-info-circle"></i>';
      break;
    case 'warning':
      icon = '<i class="fas fa-exclamation-triangle"></i>';
      break;
  }

  notification.innerHTML = `
    <div class="notification-content">
      ${icon}
      <span>${message}</span>
    </div>
    <div class="notification-progress"></div>
  `;

  document.body.appendChild(notification);

  // Add progress bar animation
  const progress = notification.querySelector('.notification-progress');
  progress.style.animation = `notification-progress ${duration/1000}s linear`;

  // Remove after duration
  setTimeout(() => {
    notification.classList.add('fade-out');
    setTimeout(() => notification.remove(), 300);
  }, duration);
}

// Handle mint success
async function handleCreateNFT(result) {
  if (!result) {
    showNotification("Error: Missing result data", "error");
    return;
  }

  const { tx, tokenId, contractAddress } = result;

  if (!tx || !tokenId || !contractAddress) {
    showNotification("Error: Incomplete transaction data", "error");
    return;
  }

  const txHash = tx.transactionHash || "Transaction pending";

  const message = `
        NFT created successfully!
        Token ID: ${tokenId}
        Contract: ${contractAddress}
        Transaction: ${txHash}
    `;

  showNotification(message, "success");

  // Tạo link OpenSea
  const openseaUrl = `https://opensea.io/assets/${contractAddress}/${tokenId}`;

  // Có thể thêm UI để hiển thị link
  console.log("OpenSea URL:", openseaUrl);
}

// Đợi DOM load xong
document.addEventListener("DOMContentLoaded", function () {
  // Thêm event listener cho nút Create NFT
  const createNFTBtn = document.querySelector(".create-nft-btn");
  if (createNFTBtn) {
    createNFTBtn.addEventListener("click", async function () {
      try {
        // Kiểm tra đã kết nối ví chưa
        if (!userAddress) {
          throw new Error("Please connect your wallet first");
        }

        // Kiểm tra xem đã có ảnh được generate chưa
        const previewImage = document.querySelector(".preview-image img");
        if (!previewImage) {
          throw new Error("Please generate an image first");
        }

        // Lấy thông tin từ form
        const name = document.getElementById("itemName").value.trim();
        const description = document.getElementById("description").value.trim();
        const royalty = document.getElementById("nft-royalty").value;

        // Validate
        if (!name) throw new Error("Please enter NFT name");
        if (!description) throw new Error("Please enter NFT description");
        if (royalty && (royalty < 0 || royalty > 15)) {
          throw new Error("Royalty must be between 0 and 15%");
        }

        // Hiển thị loading modal
        showLoadingModal();

        // Upload ảnh đã generate lên IPFS
        updateLoadingStep("image", "loading");
        const imageBlob = await fetch(previewImage.src).then((r) => r.blob());
        const imageFile = new File([imageBlob], "generated-art.png", {
          type: "image/png",
        });
        const imageHash = await uploadToIPFS(imageFile);
        updateLoadingStep("image", "success");

        // Thu thập attributes
        const attributes = [];
        const propertyRows = document.querySelectorAll(".property-row");
        propertyRows.forEach((row) => {
          const nameInput = row.querySelector(".property-name");
          const valueInput = row.querySelector(".property-value");
          if (
            nameInput &&
            valueInput &&
            nameInput.value.trim() &&
            valueInput.value.trim()
          ) {
            attributes.push({
              trait_type: nameInput.value.trim(),
              value: valueInput.value.trim(),
            });
          }
        });

        // Chuẩn bị metadata
        updateLoadingStep("metadata", "loading");
        const metadata = {
          name: name,
          description: description,
          image: `ipfs://${imageHash}`,
          attributes: attributes,
        };

        // Upload metadata
        const metadataHash = await uploadToIPFS(metadata);
        updateLoadingStep("metadata", "success");

        // Mint NFT
        updateLoadingStep("mint", "loading");
        const tx = await nftContract.methods
          .publicMint(`ipfs://${metadataHash}`)
          .send({
            from: userAddress,
            value: web3.utils.toWei(MINT_PRICE, "ether"),
          });

        // Lấy tokenId từ event Transfer
        const mintEvent = tx.events.Transfer;
        const tokenId = mintEvent.returnValues.tokenId;
        console.log("Token ID:", tokenId);
        updateLoadingStep("mint", "success");

        // Lưu NFT vào database
        try {
          const response = await fetch("http://localhost:8000/api/save-nft", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              walletAddress: userAddress,
              metadataUri: metadataHash,
              tokenId: parseInt(tokenId),
            }),
          });

          if (!response.ok) {
            throw new Error("Failed to save NFT to database");
          }
        } catch (dbError) {
          console.error("Error saving NFT to database:", dbError);
        }

        // Hiển thị thông báo thành công
        showSuccessModal({
          tx,
          tokenId,
          contractAddress,
          imageHash,
          metadataHash,
          metadata,
        });
      } catch (error) {
        console.error("Error creating NFT:", error);
        showNotification(error.message, "error");
      } finally {
        hideLoadingModal();
      }
    });
  } else {
    console.error("Create NFT button not found");
  }
});

// Initialize Web3 when page loads
window.addEventListener("load", async () => {
  try {
    await initWeb3();
  } catch (error) {
    console.error("Failed to initialize Web3:", error);
    showNotification(error.message, "error");
  }
});

// Add CSS for progress bar
const style = document.createElement('style');
style.textContent = `
    .generation-progress {
        position: absolute;
        bottom: 0;
        left: 0;
        right: 0;
        padding: 10px;
        background: rgba(0, 0, 0, 0.7);
        color: white;
    }

    .progress-info {
        display: flex;
        justify-content: space-between;
        margin-bottom: 5px;
        font-size: 14px;
    }

    .progress-bar {
        height: 4px;
        background: rgba(255, 255, 255, 0.2);
        border-radius: 2px;
        overflow: hidden;
    }

    .progress-fill {
        height: 100%;
        background: #4CAF50;
        width: 0%;
        animation: progress 60s linear forwards;
    }

    @keyframes progress {
        0% { width: 0%; }
        100% { width: 100%; }
    }

    .preview-frame {
        position: relative;
        width: 100%;
        height: 100%;
    }
`;
document.head.appendChild(style);

