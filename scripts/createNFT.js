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

let web3;
let nftContract;
let userAddress;

// Thêm hằng số mintPrice
const MINT_PRICE = "0.01";

async function getImageDimensions(file) {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => {
      resolve({
        width: img.width,
        height: img.height,
      });
    };
    img.onerror = reject;
    img.src = URL.createObjectURL(file);
  });
}

async function getVideoDuration(file) {
  return new Promise((resolve, reject) => {
    const video = document.createElement("video");
    video.preload = "metadata";
    video.onloadedmetadata = () => {
      resolve(video.duration);
    };
    video.onerror = reject;
    video.src = URL.createObjectURL(file);
  });
}

async function getVideoDimensions(file) {
  return new Promise((resolve, reject) => {
    const video = document.createElement("video");
    video.preload = "metadata";
    video.onloadedmetadata = () => {
      resolve({
        width: video.videoWidth,
        height: video.videoHeight,
      });
    };
    video.onerror = reject;
    video.src = URL.createObjectURL(file);
  });
}

// [MỚI] Hàm phân tích 3D model (ví dụ đơn giản)
async function getModelMeshCount(file) {
  return new Promise((resolve) => {
    resolve(1); // Giả sử luôn có ít nhất 1 mesh
  });
}

async function getModelVertexCount(file) {
  return new Promise((resolve) => {
    resolve(100); // Giả sử luôn có ít nhất 100 vertex
  });
}

// Initialize Web3
async function initWeb3() {
  if (typeof window.ethereum !== "undefined") {
    try {
      await window.ethereum.request({ method: "eth_requestAccounts" });
      web3 = new Web3(window.ethereum);

      const accounts = await web3.eth.getAccounts();
      userAddress = accounts[0];
      console.log("Connected wallet address:", userAddress);

      // Initialize contract
      nftContract = new web3.eth.Contract(contractABI, contractAddress);

      // Check and switch network
      await checkNetwork();
    } catch (error) {
      console.error("Error initializing Web3:", error);
      throw error;
    }
  } else {
    throw new Error("Please install MetaMask!");
  }
}

// Check and switch network if needed
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

async function uploadToIPFS(file) {
  try {
    if (!file) {
      throw new Error("Please select a file");
    }

    const formData = new FormData();
    formData.append("file", file);

    // Upload to Pinata
    const fileResponse = await axios.post(PINATA_ENDPOINT, formData, {
      maxBodyLength: "Infinity",
      headers: {
        "Content-Type": `multipart/form-data`,
        pinata_api_key: PINATA_API_KEY,
        pinata_secret_api_key: PINATA_SECRET_KEY,
      },
    });

    if (!fileResponse.data.IpfsHash) throw new Error("Failed to upload file");
    return `ipfs://${fileResponse.data.IpfsHash}`;
  } catch (error) {
    console.error("Error uploading to IPFS:", error);
    throw error;
  }
}

async function uploadMetadataToIPFS(metadata) {
  try {
    const response = await axios.post(PINATA_JSON_ENDPOINT, metadata, {
      headers: {
        "Content-Type": "application/json",
        pinata_api_key: PINATA_API_KEY,
        pinata_secret_api_key: PINATA_SECRET_KEY,
      },
    });

    if (response.data.IpfsHash) {
      return `ipfs://${response.data.IpfsHash}`;
    } else {
      throw new Error("Failed to upload metadata to IPFS");
    }
  } catch (error) {
    console.error("Error uploading metadata:", error);
    throw error;
  }
}

// Thêm các hàm xử lý loading modal
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

async function handleCreateNFT(name, description, file) {
  try {
    // Validate input
    if (!file) throw new Error("Please upload a file");
    if (!name) throw new Error("Please enter NFT name");

    // [MỚI] Kiểm tra định dạng file
    const allowedTypes = [
      "image/jpeg",
      "image/png",
      "image/gif",
      "image/webp",
      "video/mp4",
      "video/webm",
      "model/gltf-binary",
      "audio/mpeg",
    ];
    if (!allowedTypes.includes(file.type) && !file.name.endsWith(".glb")) {
      throw new Error(
        "Unsupported file type. Please upload JPEG, PNG, GIF, WebP, MP4, WebM, MP3, or GLB files."
      );
    }

    showLoadingModal();

    // Upload file
    updateLoadingStep("image", "loading");
    const fileHash = await uploadToIPFS(file);
    updateLoadingStep("image", "success");

    // [MỚI] Xử lý cover image cho audio files
    let coverHash = null;
    if (file.type === "audio/mpeg") {
      // Kiểm tra xem người dùng đã tải lên cover image chưa
      const audioCoverInput = document.getElementById("audio-cover-input");
      if (audioCoverInput && audioCoverInput.files && audioCoverInput.files[0]) {
        // Upload cover image riêng biệt
        const coverFile = audioCoverInput.files[0];
        coverHash = await uploadToIPFS(coverFile);
      }
    }

    // [MỚI] Thu thập thông tin chi tiết file
    let fileDetails = {};
    if (file.type.startsWith("image/")) {
      fileDetails = {
        dimensions: await getImageDimensions(file),
      };
    } else if (file.type.startsWith("video/")) {
      fileDetails = {
        duration: await getVideoDuration(file),
        dimensions: await getVideoDimensions(file),
      };
    } else if (
      file.type === "model/gltf-binary" ||
      file.name.endsWith(".glb")
    ) {
      fileDetails = {
        meshCount: await getModelMeshCount(file),
        vertexCount: await getModelVertexCount(file),
      };
    }

    // Thu thập attributes
    const attributes = [];
    const propertiesContainer = document.getElementById("properties-container");
    if (propertiesContainer) {
      const propertyRows =
        propertiesContainer.querySelectorAll(".property-row");
      propertyRows.forEach((row) => {
        const nameInput = row.querySelector(".property-name");
        const valueInput = row.querySelector(".property-value");
        if (nameInput && valueInput) {
          const traitType = nameInput.value.trim();
          const value = valueInput.value.trim();
          if (traitType && value) {
            attributes.push({
              trait_type: traitType,
              value: value,
            });
          }
        }
      });
    }

    // Detect file type
    let fileType;
    if (file.type.startsWith("image/")) {
      fileType = "image";
    } else if (file.type.startsWith("video/")) {
      fileType = "video/mp4";
    } else if (
      file.type === "model/gltf-binary" ||
      file.name.toLowerCase().endsWith(".glb")
    ) {
      fileType = "model/3d";
    } else if (file.type === "audio/mpeg") {
      fileType = "audio/mpeg";
    } else {
      fileType = "image";
    }

    // [MỚI] Chuẩn bị metadata chi tiết
    const metadata = {
      name: name.trim(),
      description: description ? description.trim() : "",
      image: fileHash,
      fileType: fileType, // Sử dụng fileType đã detect
      attributes: attributes,

      ...(fileType === "image" && {
        imageType: file.type,
        imageDetails: {
          fileExtension: file.name.split(".").pop(),
          fileSize: file.size,
          ...fileDetails.dimensions,
        },
      }),

      ...(fileType === "video/mp4" && {
        videoType: file.type,
        videoDetails: {
          fileExtension: file.name.split(".").pop(),
          fileSize: file.size,
          duration: fileDetails.duration,
          ...fileDetails.dimensions,
        },
      }),

      ...(fileType === "model/3d" && {
        modelType: "GLB",
        modelDetails: {
          fileExtension: file.name.split(".").pop(),
          fileSize: file.size,
          fileVersion: "2.0",
          meshCount: fileDetails.meshCount,
          vertexCount: fileDetails.vertexCount,
        },
      }),
      
      ...(fileType === "audio/mpeg" && {
        audioType: file.type,
        audioDetails: {
          fileExtension: file.name.split(".").pop(),
          fileSize: file.size,
        },
        coverImage: coverHash || null,
      }),

      // Thông tin metadata chung
      createdAt: new Date().toISOString(),
      creator: {
        address: userAddress,
        platformName: "NFT Mall",
      },

      // Royalty và giá bán
      royalty: document.getElementById("nft-royalty").value || 0,
      mintPrice: MINT_PRICE,
    };

    // Upload metadata
    updateLoadingStep("metadata", "loading");
    const metadataHash = await uploadMetadataToIPFS(metadata);
    updateLoadingStep("metadata", "success");

    // Mint NFT
    updateLoadingStep("mint", "loading");
    const tx = await nftContract.methods.publicMint(metadataHash).send({
      from: userAddress,
      value: web3.utils.toWei(MINT_PRICE, "ether"),
    });

    // Lấy tokenId
    const mintEvent = tx.events.Transfer;
    const tokenId = mintEvent.returnValues.tokenId;
    updateLoadingStep("mint", "success");

    // Lưu NFT vào database
    await saveNFTToServer(userAddress, {
      metadataUri: metadataHash,
      tokenId: parseInt(tokenId),
      fileType: fileType, // Sử dụng fileType đã detect
    });

    return {
      tx,
      fileHash,
      coverHash,
      metadataHash,
      metadata,
      tokenId,
      fileType: fileType, // Sử dụng fileType đã detect
    };
  } catch (error) {
    console.error("Mint error:", error);
    throw error;
  } finally {
    hideLoadingModal();
  }
}

// Form submission handler
document
  .getElementById("nft-creation-form")
  .addEventListener("submit", async function (e) {
    e.preventDefault();
    showLoading();

    try {
      const name = document.getElementById("nft-name").value;
      const description = document.getElementById("nft-description").value;
      const fileInput = document.getElementById("file-input"); // Sửa từ nft-file thành file-input

      if (!fileInput || !fileInput.files || !fileInput.files[0]) {
        throw new Error("Please select a file");
      }

      const file = fileInput.files[0];
      const result = await handleCreateNFT(name, description, file);
      showSuccessModal(result);
    } catch (error) {
      console.error("Error:", error);
      showNotification(error.message, "error");
    } finally {
      hideLoading();
    }
  });

// Initialize when page loads
window.addEventListener("load", async () => {
  try {
    await initWeb3();
  } catch (error) {
    console.error("Failed to initialize Web3:", error);
    showNotification(error.message, "error");
  }
});

// Utility functions
function showLoading() {
  document.getElementById("loading-overlay").style.display = "flex";
}

function hideLoading() {
  document.getElementById("loading-overlay").style.display = "none";
}

function showNotification(message, type = "info") {
  const notification = document.createElement("div");
  notification.className = `notification ${type}`;
  notification.textContent = message;
  document.body.appendChild(notification);
  setTimeout(() => notification.remove(), 3000);
}

// Thêm các hàm utility
function safeReplace(uri) {
  if (!uri) return "../assets/placeholder.jpg";
  return uri.replace("ipfs://", "https://ipfs.io/ipfs/");
}

function safeGet(obj, path, defaultValue = "") {
  return path
    .split(".")
    .reduce(
      (acc, part) =>
        acc && acc[part] !== undefined ? acc[part] : defaultValue,
      obj
    );
}

function showSuccessModal(result) {
  const modalBackdrop = document.getElementById("modal-backdrop");
  const modal = document.getElementById("nft-info-modal");
  const modalContent = document.getElementById("nft-info-content");

  // Determine file type for proper preview
  const isModel3D =
    result.metadata.fileType === "model/3d" ||
    result.fileType === "model/gltf-binary" ||
    (result.metadata.image &&
      result.metadata.image.toLowerCase().endsWith(".glb"));
      
  const isVideo = 
    result.fileType === "video/mp4" || 
    result.fileType.includes("video") ||
    (result.metadata.image && 
      result.metadata.image.toLowerCase().endsWith(".mp4"));
      
  const isAudio = 
    result.fileType === "audio/mpeg" || 
    result.fileType.includes("audio") ||
    (result.metadata.image && 
      result.metadata.image.toLowerCase().endsWith(".mp3"));

  let mediaPreviewHTML = '';
  
  if (isModel3D) {
    // 3D Model preview
    mediaPreviewHTML = `<div class="nft-preview-media">
            <model-viewer 
                id="modal-preview-model" 
                src="${safeReplace(safeGet(result, "metadata.image"))}"
                camera-controls
                auto-rotate
                exposure="1"
                shadow-intensity="1"
                style="width: 100%; height: 300px;"
                ar
                ar-modes="webxr scene-viewer quick-look"
                environment-image="neutral"
                camera-orbit="45deg 55deg 2.5m"
                min-camera-orbit="auto auto auto"
                max-camera-orbit="auto auto auto">
            </model-viewer>
        </div>`;
  } else if (isVideo) {
    // Video preview
    mediaPreviewHTML = `<div class="nft-preview-media">
            <video 
                src="${safeReplace(safeGet(result, "metadata.image"))}" 
                controls
                style="width: 100%; height: 300px; border-radius: 8px;"
                onerror="this.style.display='none'; document.getElementById('fallback-img').style.display='block';">
            </video>
            <img id="fallback-img" src="../assets/video-error-placeholder.png" 
                 alt="${safeGet(result, "metadata.name", "Video NFT")}" 
                 style="display: none; width: 100%; height: 300px; object-fit: cover; border-radius: 8px;">
        </div>`;
  } else if (isAudio) {
    // Audio preview with cover image
    const coverImage = safeGet(result, "metadata.coverImage") || "../assets/audio-placeholder.png";
    mediaPreviewHTML = `<div class="nft-preview-media">
            <div style="width: 100%; height: 250px; border-radius: 8px 8px 0 0; overflow: hidden;">
                <img src="${safeReplace(coverImage)}" 
                     alt="${safeGet(result, "metadata.name", "Audio NFT")}" 
                     style="width: 100%; height: 100%; object-fit: cover;"
                     onerror="this.src='../assets/audio-placeholder.png'">
            </div>
            <audio 
                src="${safeReplace(safeGet(result, "metadata.image"))}" 
                controls
                style="width: 100%; height: 50px; border-radius: 0 0 8px 8px;"
                onerror="this.style.display='none'; document.getElementById('audio-error').style.display='block';">
            </audio>
            <div id="audio-error" style="display: none; padding: 10px; text-align: center; color: #ff4d4f;">
                Unable to load audio file
            </div>
        </div>`;
  } else {
    // Default image preview
    mediaPreviewHTML = `<div class="nft-preview-media">
            <img src="${safeReplace(safeGet(result, "metadata.image"))}" 
                 alt="${safeGet(result, "metadata.name", "NFT")}" 
                 onerror="this.src='../assets/placeholder.jpg'">
        </div>`;
  }

  modalContent.innerHTML = `
        <div class="nft-success-info">
            ${mediaPreviewHTML}
            
            <div class="info-group">
                <h4>NFT Details</h4>
                <div class="info-row">
                    <span class="info-label">Name</span>
                    <span class="info-value">${safeGet(
                      result,
                      "metadata.name",
                      "Unnamed NFT"
                    )}</span>
                </div>
                <div class="info-row">
                    <span class="info-label">Token ID</span>
                    <span class="info-value">${safeGet(
                      result,
                      "tokenId",
                      "N/A"
                    )}</span>
                </div>
                <div class="info-row">
                    <span class="info-label">Description</span>
                    <span class="info-value">${safeGet(
                      result,
                      "metadata.description",
                      "No description"
                    )}</span>
                </div>
                <div class="info-row">
                    <span class="info-label">File Type</span>
                    <span class="info-value">${
                      isModel3D
                        ? "3D Model (GLB)"
                        : isVideo
                        ? "Video (MP4)"
                        : isAudio
                        ? "Audio (MP3)"
                        : safeGet(result, "fileType", "Unknown")
                    }</span>
                </div>
            </div>

            ${
              isModel3D
                ? `
            <div class="info-group">
                <h4>3D Model Details</h4>
                <div class="info-row">
                    <span class="info-label">Format</span>
                    <span class="info-value">GLB/GLTF</span>
                </div>
                ${
                  result.metadata.modelDetails
                    ? `
                <div class="info-row">
                    <span class="info-label">Vertices</span>
                    <span class="info-value">${
                      result.metadata.modelDetails.vertexCount || "N/A"
                    }</span>
                </div>
                <div class="info-row">
                    <span class="info-label">Meshes</span>
                    <span class="info-value">${
                      result.metadata.modelDetails.meshCount || "N/A"
                    }</span>
                </div>
                `
                    : ""
                }
            </div>
            `
                : ""
            }
            
            ${
              isAudio
                ? `
            <div class="info-group">
                <h4>Audio Details</h4>
                <div class="info-row">
                    <span class="info-label">Format</span>
                    <span class="info-value">MP3</span>
                </div>
                ${
                  result.metadata.audioDetails
                    ? `
                <div class="info-row">
                    <span class="info-label">Duration</span>
                    <span class="info-value">${
                      result.metadata.audioDetails.duration || "N/A"
                    }</span>
                </div>
                <div class="info-row">
                    <span class="info-label">Bitrate</span>
                    <span class="info-value">${
                      result.metadata.audioDetails.bitrate || "N/A"
                    }</span>
                </div>
                `
                    : ""
                }
            </div>
            `
                : ""
            }

            <div class="info-group">
                <h4>Transaction Details</h4>
                <div class="info-row">
                    <span class="info-label">Transaction Hash</span>
                    <span class="info-value">
                        <a href="https://explorer.sketchpad-1.forma.art/tx/${safeGet(
                          result,
                          "tx.transactionHash",
                          ""
                        )}" 
                           target="_blank">
                            ${safeGet(
                              result,
                              "tx.transactionHash",
                              "N/A"
                            ).substring(0, 10)}...
                        </a>
                    </span>
                </div>
                <div class="info-row">
                    <span class="info-label">IPFS File</span>
                    <span class="info-value">
                        <a href="https://ipfs.io/ipfs/${safeGet(
                          result,
                          "fileHash",
                          ""
                        ).replace("ipfs://", "")}" 
                           target="_blank">View on IPFS</a>
                    </span>
                </div>
                <div class="info-row">
                    <span class="info-label">IPFS Metadata</span>
                    <span class="info-value">
                        <a href="https://ipfs.io/ipfs/${safeGet(
                          result,
                          "metadataHash",
                          ""
                        ).replace("ipfs://", "")}" 
                           target="_blank">View on IPFS</a>
                    </span>
                </div>
            </div>
        </div>
    `;

  modalBackdrop.style.display = "block";
  modal.style.display = "block";

  // Initialize model-viewer after adding to DOM
  if (isModel3D) {
    setTimeout(() => {
      const modelViewer = document.getElementById("modal-preview-model");
      if (modelViewer) {
        modelViewer.addEventListener("load", () => {
          console.log("3D model loaded successfully");
        });
        modelViewer.addEventListener("error", (error) => {
          console.error("Error loading 3D model:", error);
        });
      }
    }, 100);
  }
}

function closeNFTModal() {
  document.getElementById("modal-backdrop").style.display = "none";
  document.getElementById("nft-info-modal").style.display = "none";
}

// Thêm hàm để tạo property row mới
function addProperty() {
  const propertiesContainer = document.getElementById("properties-container");
  const newRow = document.createElement("div");
  newRow.className = "property-row";

  newRow.innerHTML = `
    <input type="text" placeholder="Property name" class="property-name">
    <input type="text" placeholder="Value" class="property-value">
    <button type="button" class="remove-property" onclick="removeProperty(this)">×</button>
  `;

  propertiesContainer.appendChild(newRow);
}

// Hàm xóa property row
function removeProperty(button) {
  button.closest(".property-row").remove();
}

// Hàm hiển thị/ẩn phần properties
function toggleProperties() {
  const propertiesContent = document.getElementById("properties-content");
  if (propertiesContent) {
    propertiesContent.style.display =
      propertiesContent.style.display === "none" ? "block" : "none";
  }
}

async function saveNewNFTToServer(walletAddress, metadataUri) {
  try {
    if (!walletAddress) {
      throw new Error("Wallet address is required");
    }

    const requestData = {
      walletAddress: walletAddress,
      metadataUri: metadataUri, // IPFS URI của metadata
    };

    console.log("Request data:", requestData);

    const response = await fetch("http://localhost:8000/api/save-nft", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(requestData),
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error("Server error response:", errorData);
      throw new Error(errorData.detail || "Failed to save NFT");
    }

    const result = await response.json();
    console.log("Kết quả lưu NFT mới:", result);
    return result;
  } catch (error) {
    console.error("Lỗi khi lưu NFT mới:", error);
    throw error;
  }
}

async function saveNFTToServer(walletAddress, nftData) {
  try {
    const response = await fetch("http://localhost:8000/api/save-nft", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        walletAddress: walletAddress,
        metadataUri: nftData.metadataUri,
        tokenId: nftData.tokenId,
        fileType: nftData.fileType,
      }),
    });

    if (!response.ok) {
      throw new Error("Failed to save NFT");
    }

    return await response.json();
  } catch (error) {
    console.error("Error saving NFT:", error);
    throw error;
  }
}

// Thêm event listener cho file input
document.getElementById("file-input").addEventListener("change", function (e) {
  const file = e.target.files[0];
  if (!file) return;

  try {
    // Validate file size
    const maxSize = 100 * 1024 * 1024; // 100MB
    if (file.size > maxSize) {
      throw new Error("File size too large. Maximum size is 100MB");
    }

    // Validate file type
    const allowedTypes = [
      "image/jpeg",
      "image/png",
      "image/gif",
      "image/webp",
      "video/mp4",
      "video/webm",
      "model/gltf-binary",
      "audio/mpeg",
    ];

    if (!allowedTypes.includes(file.type) && !file.name.endsWith(".glb")) {
      throw new Error(
        "Unsupported file type. Please upload JPEG, PNG, GIF, WebP, MP4, WebM, MP3, or GLB files."
      );
    }
  } catch (error) {
    showNotification(error.message, "error");
    this.value = ""; // Clear file input
  }
});
