// Lưu trữ tất cả video NFTs đã load
let videoNFTs = [];
let isLoading = false;

// Biến để kiểm tra xem đã load chưa
let hasLoaded = false;

// Hàm chuyển đổi IPFS URL sang HTTP URL
function convertIpfsToHttp(ipfsUrl) {
    if (!ipfsUrl) return '';
    return ipfsUrl.replace('ipfs://', 'https://ipfs.io/ipfs/');
}

// Hàm chính để load video NFTs
async function loadVideoNFTs() {
    // Kiểm tra nếu đã load rồi thì không load nữa
    if (hasLoaded) return;
    hasLoaded = true;

    try {
        // Fetch NFTs từ API
        const response = await fetch('http://localhost:8000/api/nfts');
        const nfts = await response.json();

        // Lọc ra chỉ các video NFTs
        const videoNFTs = nfts.filter(nft => nft.fileType === 'video/mp4');
        console.log('Video NFTs:', videoNFTs);

        // Xử lý từng video NFT
        for (const nft of videoNFTs) {
            try {
                // Tìm card tương ứng với video NFT
                const card = document.querySelector(`.explore-nft-card[data-nft-id="${nft._id}"]`);
                if (!card) continue;

                // Tìm phần tử media trong card
                const mediaContainer = card.querySelector('.explore-card-media');
                if (!mediaContainer) continue;

                // Tìm image element
                const imageElement = mediaContainer.querySelector('img');
                if (!imageElement) continue;

                // Tạo video element
                const video = document.createElement('video');
                video.className = 'explore-video-preview';
                video.muted = true;
                video.loop = true;
                video.src = convertIpfsToHttp(nft.image); // Chuyển đổi IPFS URL sang HTTP URL
                
                // Thêm event listeners cho video preview
                card.addEventListener('mouseenter', () => {
                    video.play().catch(err => console.log('Video autoplay failed:', err));
                });

                card.addEventListener('mouseleave', () => {
                    video.pause();
                    video.currentTime = 0;
                });

                // Thay thế ảnh bằng video
                mediaContainer.replaceChild(video, imageElement);

            } catch (error) {
                console.error(`Error processing video NFT ${nft._id}:`, error);
            }
        }

    } catch (error) {
        console.error('Error setting up video NFTs:', error);
    }
}

// Render video NFTs vào grid
function renderVideoNFTs(nfts) {
    const nftGrid = document.getElementById('nftGrid');
    if (!nftGrid) return;

    nftGrid.innerHTML = nfts.map(nft => createVideoNFTCard(nft)).join('');
}

// Tạo card cho video NFT
function createVideoNFTCard(nft) {
    if (!nft) return '';

    // Đảm bảo các giá trị không bị null
    const price = nft.price || 0;
    const views = nft.views || 0;
    const name = nft.name || 'Untitled';
    const id = nft.id || '';

    return `
        <div class="explore-nft-card">
            <div class="explore-card-media">
                <img src="${nft.image}" alt="${name}" class="explore-nft-image">
                <div class="explore-card-overlay">
                    <button class="explore-favorite-btn" onclick="toggleFavorite('${id}')">
                        <i class="bi bi-heart"></i>
                    </button>
                </div>
            </div>
            <div class="explore-card-content">
                <div class="explore-card-header">
                    <div class="explore-collection-info">
                        <h6 class="explore-nft-name">${name}</h6>
                    </div>
                    ${nft.verified ? '<div class="explore-verified-badge"><i class="bi bi-patch-check-fill"></i></div>' : ''}
                </div>
                <div class="explore-price-info">
                    <div class="explore-current-price">
                        <span class="explore-price-label">Price</span>
                        <span class="explore-price-value">${price.toFixed(3)} TIA</span>
                    </div>
                    <div class="explore-views">
                        <span class="explore-price-label">Views</span>
                        <span class="explore-price-value">${views}</span>
                    </div>
                </div>
            </div>
        </div>
    `;
}

// Load video NFTs khi trang được load
document.addEventListener('DOMContentLoaded', loadVideoNFTs);

// Export functions nếu cần
export {
    loadVideoNFTs,
    videoNFTs
};
