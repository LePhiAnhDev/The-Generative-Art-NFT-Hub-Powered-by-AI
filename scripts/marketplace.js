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

// --- Bắt đầu code sau phần contractABI và contractAddress ---

// Sử dụng cache để lưu trữ dữ liệu blockchain
const blockchainCache = new Map();

function getCachedData(key) {
  const cached = blockchainCache.get(key);
  if (cached && cached.expiry > Date.now()) {
    return cached.data;
  }
  return null;
}

function setCachedData(key, data, ttl = 60000) {
  blockchainCache.set(key, {
    data,
    expiry: Date.now() + ttl,
  });
}

// Cache cho metadata từ IPFS
const metadataCache = new Map();

async function fetchMetadataWithCache(tokenURI) {
  if (metadataCache.has(tokenURI)) {
    return metadataCache.get(tokenURI);
  }
  const metadata = await fetchMetadata(tokenURI);
  if (metadata) {
    metadataCache.set(tokenURI, metadata);
  }
  return metadata;
}

let globalNFTs = []; // Lưu trữ toàn bộ NFTs

async function loadListedNFTs() {
  const nftGrid = document.getElementById("nft-grid");
  const loading = document.getElementById("loading");
  const noNfts = document.getElementById("no-nfts");

  try {
    loading.style.display = "block";
    nftGrid.innerHTML = "";
    noNfts.style.display = "none";

    const web3 = new Web3(window.ethereum);
    const contract = new web3.eth.Contract(contractABI, contractAddress);

    const events = await contract.getPastEvents("NFTListed", {
      fromBlock: 0,
      toBlock: "latest",
    });

    if (events.length === 0) {
      noNfts.style.display = "block";
      return;
    }

    const batch = new web3.BatchRequest();
    const nftPromises = events.map((event) => {
      const tokenId = event.returnValues.tokenId;
      const cacheKey = `nft_${tokenId}`;

      return new Promise((resolve) => {
        const cachedNFT = getCachedData(cacheKey);
        if (cachedNFT) {
          resolve(cachedNFT);
          return;
        }

        batch.add(
          contract.methods
            .getListingInfo(tokenId)
            .call.request(async (error, listing) => {
              if (error || !listing.isListed) {
                resolve(null);
                return;
              }

              try {
                const tokenURI = await contract.methods
                  .tokenURI(tokenId)
                  .call();
                const metadata = await fetchMetadata(tokenURI);
                const block = await web3.eth.getBlock(event.blockNumber);

                const nftData = {
                  tokenId,
                  price: listing.price,
                  seller: listing.seller,
                  listed_time: block.timestamp * 1000,
                  metadata: {
                    ...metadata,
                    isListed: true,
                  },
                };

                setCachedData(cacheKey, nftData);
                resolve(nftData);
              } catch (err) {
                resolve(null);
              }
            })
        );
      });
    });

    batch.execute();

    const nfts = (await Promise.all(nftPromises)).filter((nft) => nft !== null);
    globalNFTs = nfts;
    renderNFTs(nfts);
  } catch (error) {
    noNfts.textContent =
      "Unable to load NFTs. Please check your connection and try again.";
    noNfts.style.display = "block";
  } finally {
    loading.style.display = "none";
  }
}

function renderNFTs(nfts) {
  const nftGrid = document.getElementById("nft-grid");
  nftGrid.innerHTML = "";

  nfts.forEach((nft) => {
    const card = createNFTCard(nft);
    nftGrid.appendChild(card);
  });
}

function sortNFTs(sortOption) {
  let sortedNFTs = [...globalNFTs];

  switch (sortOption) {
    case "recently-listed":
      sortedNFTs.sort((a, b) => {
        return b.listed_time - a.listed_time;
      });
      break;
    case "price-low":
      sortedNFTs.sort((a, b) => {
        const priceA = parseFloat(
          Web3.utils.fromWei(a.price.toString(), "ether")
        );
        const priceB = parseFloat(
          Web3.utils.fromWei(b.price.toString(), "ether")
        );
        return priceA - priceB;
      });
      break;
    case "price-high":
      sortedNFTs.sort((a, b) => {
        const priceA = parseFloat(
          Web3.utils.fromWei(a.price.toString(), "ether")
        );
        const priceB = parseFloat(
          Web3.utils.fromWei(b.price.toString(), "ether")
        );
        return priceB - priceA;
      });
      break;
  }

  renderNFTs(sortedNFTs);
}

function searchNFTs(searchTerm) {
  searchTerm = searchTerm.trim().toLowerCase();
  if (searchTerm === "") {
    renderNFTs(globalNFTs);
    return;
  }
  const filteredNFTs = globalNFTs.filter((nft) =>
    nft.metadata.name.toLowerCase().includes(searchTerm)
  );
  renderNFTs(filteredNFTs);
}

document.addEventListener("DOMContentLoaded", function () {
  loadListedNFTs();

  const filterSelect = document.getElementById("sort-filter");
  if (filterSelect) {
    filterSelect.addEventListener("change", function (e) {
      sortNFTs(e.target.value);
    });
  }

  const searchInput = document.querySelector(".search-input");
  if (searchInput) {
    searchInput.addEventListener("input", function (e) {
      searchNFTs(e.target.value);
    });
  }
});

async function loadNFTDetails(contract, index) {
  try {
    const tokenId = await contract.methods.tokenByIndex(index).call();
    const listing = await contract.methods.getListingInfo(tokenId).call();

    if (listing.isListed) {
      const tokenURI = await contract.methods.tokenURI(tokenId).call();
      const metadata = await fetchMetadataWithCache(tokenURI);

      return {
        tokenId,
        listing,
        metadata,
      };
    }
    return null;
  } catch (error) {
    console.error("Error loading NFT details:", error);
    return null;
  }
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

    const fileExtension = metadata.image?.split(".").pop()?.toLowerCase();
    let fileType;

    if (fileExtension === "glb" || fileExtension === "gltf") {
      fileType = "3d";
    } else if (fileExtension === "mp4") {
      fileType = "video";
    } else if (fileExtension === "mp3" || metadata.fileType === "audio/mpeg") {
      fileType = "audio";
    } else if (metadata.name?.toLowerCase().includes("video")) {
      fileType = "video";
    } else if (metadata.name?.toLowerCase().includes("3d")) {
      fileType = "3d";
    } else {
      fileType = "image";
    }

    // Xử lý cover cho audio
    let coverImage = null;
    if (fileType === "audio") {
      // Ưu tiên lấy coverImage từ metadata
      if (metadata.coverImage) {
        coverImage = metadata.coverImage.replace("ipfs://", gateway);
      }
    }

    const processedMetadata = {
      name: metadata.name || "Unnamed NFT",
      image: metadata.image?.replace("ipfs://", gateway) || "../assets/placeholder.jpg",
      description: metadata.description || "No description",
      attributes: metadata.attributes || [],
      fileType: fileType,
      cover: coverImage, // Sử dụng coverImage đã xử lý
    };

    return processedMetadata;
  } catch (error) {
    console.error("Error in fetchMetadata:", error);
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

function createNFTCard(nft) {
  const card = document.createElement("div");
  card.className = "nft-card";

  const fileType = nft.metadata.fileType;
  let mediaHTML;
  switch (fileType) {
    case "audio":
      mediaHTML = `
        <div class="nft-image">
          <img src="${nft.metadata.cover || nft.metadata.image || '../assets/placeholder.jpg'}" alt="${nft.metadata.name}">
          <div class="audio-indicator"><i class="fas fa-music"></i></div>
          <div class="nft-status">Listed</div>
        </div>`;
      break;

    // Giữ nguyên các trường hợp khác như cũ
    case "3d":
      mediaHTML = `
        <div class="nft-image">
          <model-viewer
            src="${nft.metadata.image}"
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
            alt="${nft.metadata.name}"
          ></model-viewer>
          <div class="nft-status">Listed</div>
        </div>`;
      break;

    case "video":
      mediaHTML = `
        <div class="nft-image">
             <video autoplay muted loop playsinline>
            <source src="${nft.metadata.image}" type="video/mp4">
             </video>
             <div class="nft-status">Listed</div>
        </div>`;
      break;

    default:
      mediaHTML = `
        <div class="nft-image">
          <img src="${nft.metadata.image}" alt="${nft.metadata.name}">
             <div class="nft-status">Listed</div>
           </div>`;
  }

  const cardHTML = `
        ${mediaHTML}
        <div class="nft-info">
            <div class="nft-header">
                <h3>${nft.metadata.name}</h3>
                <button class="add-to-cart-btn" onclick="addToCart(event, {
                    name: '${nft.metadata.name}',
                    price: ${Web3.utils.fromWei(nft.price.toString(), "ether")},
          image: '${nft.metadata.image}',
                    tokenId: '${nft.tokenId}',
                    seller: '${nft.seller}'
                })">
                    <i class="bi bi-cart-plus"></i>
                </button>
            </div>
            <div class="nft-price-info">
        <div class="price-value">${Web3.utils.fromWei(
          nft.price.toString(),
          "ether"
        )} TIA</div>
        <button class="buy-button" onclick="buyNFT('${nft.tokenId}')">
            <div class="button-wrapper">
                <div class="text">Buy Now</div>
                <span class="icon">
                    <svg viewBox="0 0 16 16" class="bi bi-cart2" fill="currentColor" height="16" width="16" xmlns="http://www.w3.org/2000/svg">
                        <path d="M0 2.5A.5.5 0 0 1 .5 2H2a.5.5 0 0 1 .485.379L2.89 4H14.5a.5.5 0 0 1 .485.621l-1.5 6A.5.5 0 0 1 13 11H4a.5.5 0 0 1-.485-.379L1.61 3H.5a.5.5 0 0 1-.5-.5zM3.14 5l1.25 5h8.22l1.25-5H3.14zM5 13a1 1 0 1 0 0 2 1 1 0 0 0 0-2zm-2 1a2 2 0 1 1 4 0 2 2 0 0 1-4 0zm9-1a1 1 0 1 0 0 2 1 1 0 0 0 0-2zm-2 1a2 2 0 1 1 4 0 2 2 0 0 1-4 0z"></path>
                    </svg>
                </span>
            </div>
        </div>
        
        </button>
            </div>
        </div>
    `;

  card.innerHTML = cardHTML;

  card.addEventListener("click", () => {
    window.location.href = `nft-details.html?tokenId=${nft.tokenId}`;
  });

  const buttons = card.querySelectorAll("button");
  buttons.forEach((button) => {
    button.addEventListener("click", (e) => {
      e.stopPropagation();
    });
  });

  if (fileType === "video") {
    const video = card.querySelector("video");
    if (video) {
      video.addEventListener("loadeddata", () => {
        video.play().catch(() => {});
      });
    }
  }

  if (fileType === "3d") {
    setTimeout(() => {
      const modelViewer = card.querySelector("model-viewer");
      if (modelViewer) {
        modelViewer.addEventListener("error", () => {
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
    }, 100);
  }

  return card;
}

async function buyNFT(tokenId) {
  try {
    const web3 = new Web3(window.ethereum);
    const accounts = await web3.eth.requestAccounts();
    const userAddress = accounts[0];

    const contract = new web3.eth.Contract(contractABI, contractAddress);

    const listing = await contract.methods.getListingInfo(tokenId).call();
    if (!listing.isListed) {
      throw new Error("NFT is not listed for sale");
    }

    window.notificationManager.addNotification({
      message: "Processing your purchase...",
      type: "info",
      icon: "bi bi-hourglass-split",
    });

    const buyTx = await contract.methods.buyNFT(tokenId).send({
      from: userAddress,
      value: listing.price,
      gasPrice: "25000000000",
      gas: "250000",
    });

    if (buyTx.status) {
      try {
        const response = await fetch(
          "http://localhost:8000/api/record-nft-purchase",
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              tokenId: parseInt(tokenId),
              buyer_address: userAddress,
            }),
          }
        );
        if (response.ok) {
          window.notificationManager.addNotification({
            message: "NFT purchased successfully!",
            type: "success",
            icon: "bi bi-check-circle",
          });
        }
      } catch (apiError) {
        // Silent fail for API error
      }
    }
  } catch (error) {
    window.notificationManager.addNotification({
      message: error.message,
      type: "error",
      icon: "bi bi-x-circle",
    });
  }
}
