// Hàm để fetch và hiển thị carousel NFTs
async function loadCarouselNFTs() {
  try {
      const response = await fetch('http://localhost:8000/api/carousel-nfts');
      const nfts = await response.json();
      
      const carouselInner = document.querySelector('.carousel-inner');
      const carouselIndicators = document.querySelector('.carousel-indicators');
      
      if (!nfts || !Array.isArray(nfts) || nfts.length === 0) {
          console.log('No NFTs found for carousel');
          return;
      }

      // Clear existing content
      carouselInner.innerHTML = '';
      carouselIndicators.innerHTML = '';

      // Add NFTs to carousel
      nfts.forEach((nft, index) => {
          // Add indicator
          const indicator = document.createElement('button');
          indicator.type = 'button';
          indicator.setAttribute('data-bs-target', '#carouselExampleIndicators');
          indicator.setAttribute('data-bs-slide-to', index.toString());
          if (index === 0) {
              indicator.classList.add('active');
              indicator.setAttribute('aria-current', 'true');
          }
          indicator.setAttribute('aria-label', `Slide ${index + 1}`);
          carouselIndicators.appendChild(indicator);

          // Add carousel item
          const item = document.createElement('div');
          item.className = `carousel-item${index === 0 ? ' active' : ''}`;
          
          // Chuyển đổi IPFS URL thành HTTP URL nếu cần
          const imageUrl = nft.image?.replace('ipfs://', 'https://ipfs.io/ipfs/') || '../assets/placeholder.jpg';
          
          item.innerHTML = `
              <div class="carousel-background" style="background-image: url('${imageUrl}')"></div>
              <a href="nft-details.html?tokenId=${nft.tokenId}" class="carousel-nft">
                  <div class="nft-image-container">
                      <img src="${imageUrl}" alt="${nft.name || 'NFT'}" 
                           onerror="this.src='../assets/placeholder.jpg'">
                  </div>
                  <div class="nft-info">
                      <div class="nft-creator">
                          <div class="creator-info">
                              <img src="${nft.owner?.avatar || '../assets/placeholder.jpg'}" alt="Creator">
                              <span class="creator-name">
                                  ${nft.owner?.username || 'Unknown'}
                                  ${nft.owner?.verified ? '<i class="bi bi-patch-check-fill"></i>' : ''}
                              </span>
                          </div>
                          <div class="network-info">on <span>Forma</span></div>
                      </div>
                      
                      <h3 class="nft-title">${nft.name || 'Unnamed NFT'}</h3>
                      
                      <div class="nft-description">
                          ${nft.description || 'cyber trip to internet art of the future.'}
                      </div>

                      <div class="nft-stats">
                          <div class="stat-item">
                              <span class="stat-label">Price</span>
                              <span class="stat-value">${nft.price ? nft.price + ' TIA' : 'No price'}</span>
                          </div>
                          
                          <div class="stat-item">
                              <span class="stat-label">Views</span>
                              <span class="stat-value">${nft.views || 0}</span>
                          </div>
                      </div>
                  </div>
              </a>
          `;
          carouselInner.appendChild(item);
      });

      // Khởi tạo carousel một lần duy nhất sau khi load xong NFTs
      const carouselElement = document.querySelector('#carouselExampleIndicators');
      const carousel = new bootstrap.Carousel(carouselElement, {
          interval: 5000,
          wrap: true
      });

  } catch (error) {
      console.error('Error loading carousel NFTs:', error);
  }
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', loadCarouselNFTs); 