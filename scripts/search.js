document.addEventListener("DOMContentLoaded", function () {
    const searchInput = document.querySelector(".search-box input");
    let searchTimeout;
    let currentController = null; // Dùng để hủy các fetch request cũ
  
    searchInput.addEventListener("input", function (e) {
      if (searchTimeout) {
        clearTimeout(searchTimeout);
      }
  
      const query = e.target.value.trim();
  
      if (query.length === 0) {
        const dropdown = document.querySelector(".search-results");
        if (dropdown) {
          dropdown.style.display = "none";
        }
        return;
      }
  
      searchTimeout = setTimeout(async () => {
        if (query.length < 2) return;
  
        // 🛑 Hủy bỏ request cũ nếu có
        if (currentController) {
          currentController.abort();
        }
        currentController = new AbortController();
        const signal = currentController.signal;
  
        try {
          const [nftResponse, userResponse] = await Promise.all([
            fetch(
              `http://localhost:8000/api/search-nfts?query=${encodeURIComponent(query)}`,
              { signal }
            ),
            fetch(
              `http://localhost:8000/api/search-users?query=${encodeURIComponent(query)}`,
              { signal }
            )
          ]);
          const [nfts, users] = await Promise.all([
            nftResponse.json(),
            userResponse.json()
          ]);
          displaySearchResults(nfts, users, query);
        } catch (error) {
          if (error.name === "AbortError") {
            console.log("Fetch aborted for query: " + query);
          } else {
            console.error("Error searching:", error);
          }
        }
      }, 150); // 🔻 Giảm debounce xuống 200ms
    });
  });
  
  function displaySearchResults(nfts, users, query) {
    let dropdown = document.querySelector(".search-results");
    if (!dropdown) {
      dropdown = document.createElement("div");
      dropdown.className = "search-results";
      document.querySelector(".search-box").appendChild(dropdown);
    }
  
    if ((!nfts || nfts.length === 0) && (!users || users.length === 0)) {
      dropdown.innerHTML = '<div class="no-results">No results found</div>';
      dropdown.style.display = "block";
      return;
    }
  
    let html = "";
  
    if (users && users.length > 0) {
      html += '<div class="search-section"><h6>Users</h6>';
      html += users
        .map(
          (user) => `
              <a href="profile.html?address=${user.walletAddress}" class="search-result-item">
                  <img src="${user.avatar || "../assets/user.png"}" 
                       alt="${user.username || "User"}" 
                       onerror="this.src='../assets/user.png'">
                  <div class="search-result-info">
                      <div class="search-result-name">${user.username || "Unnamed User"}</div>
                      <div class="search-result-address">${user.walletAddress}</div>
                  </div>
              </a>
          `
        )
        .join("");
      html += "</div>";
    }
  
    if (nfts && nfts.length > 0) {
      html += '<div class="search-section"><h6>NFTs</h6>';
      html += nfts
        .map(
          (nft) => `
              <a href="nft-details.html?tokenId=${nft.tokenId}" class="search-result-item">
                  <img src="${nft.image || "../assets/placeholder.jpg"}" 
                       alt="${nft.name}" 
                       onerror="this.src='../assets/placeholder.jpg'">
                  <div class="search-result-info">
                      <div class="search-result-name">${nft.name || "Unnamed NFT"}</div>
                      <div class="search-result-price">${nft.price ? nft.price + " TIA" : "No price"}</div>
                  </div>
              </a>
          `
        )
        .join("");
      html += "</div>";
    }
  
    dropdown.innerHTML = html;
    dropdown.style.display = "block";
  }
  
  document.addEventListener("click", function (e) {
    const searchBox = document.querySelector(".search-box");
    const dropdown = document.querySelector(".search-results");
  
    if (!searchBox?.contains(e.target) && dropdown) {
      dropdown.style.display = "none";
    }
  });
  