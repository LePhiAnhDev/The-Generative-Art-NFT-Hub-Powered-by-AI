// Biến toàn cục
let usersData = [];
let allUsersData = []; // Lưu tất cả dữ liệu người dùng để tìm kiếm
let currentPage = 0;
let totalUsers = 0;
let isLoading = false;
const PAGE_SIZE = 20;
let currentSort = {
  column: null,
  direction: "desc",
};
let searchTimeout = null;
let searchTerm = "";

// Thêm vào dòng đầu của sự kiện DOMContentLoaded
document.addEventListener("DOMContentLoaded", () => {
  console.log("DOM loaded, initializing users page");
  logEnvDetails(); // Thêm dòng này
  setupEventListeners();
  loadUsers(true);
});

// Thêm một hàm debugging trước khi gọi API
function logEnvDetails() {
  console.log("Environment details:");
  console.log("- Current URL: " + window.location.href);
  console.log("- API URL: http://localhost:8000/api/users");
  console.log("- Images path: /assets/Demo_user.jpg");
  console.log("- Current page: " + currentPage);
  console.log("- Total users: " + totalUsers);
  console.log("- API response testing...");
  
  // Test API connection
  fetch("http://localhost:8000/api/users")
    .then(res => {
      console.log("API Status:", res.status);
      return res.json();
    })
    .then(data => {
      console.log("API Data sample:", data.slice(0, 1));
    })
    .catch(err => {
      console.error("API Error:", err);
    });
}

// Hàm load và xử lý dữ liệu
async function loadUsers(reset = true) {
  if (isLoading) return;
  
  try {
    isLoading = true;
    console.log("Loading users data...");
    
    // Hiển thị loading
    const loadingSpinner = document.querySelector(".loading-overlay");
    if (loadingSpinner) {
      loadingSpinner.style.display = "flex";
      loadingSpinner.style.opacity = "1";
    }
    
    // Reset page và dữ liệu nếu cần
    if (reset) {
      currentPage = 0;
      usersData = [];
      const tbody = document.getElementById("usersTableBody");
      if (tbody) {
        tbody.innerHTML = "";
      }
    }
    
    // Đây là API thực tế endpoint từ server
    const response = await fetch(`http://localhost:8000/api/users`);
    
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    
    const data = await response.json();
    console.log("Received users data:", data);
    
    // Kết quả trả về trực tiếp là mảng user, không phải object {items, total}
    if (!Array.isArray(data)) {
      console.error("Expected array but got:", typeof data);
      throw new Error("Invalid data format");
    }
    
    // THÊM DỮ LIỆU GIẢ CHO FLOOR CHANGE VÀ VOLUME CHANGE
    const enhancedData = data.map((user, index) => {
      // Tạo dữ liệu giả khác nhau cho mỗi người dùng
      // Người dùng đầu tiên có giá trị dương
      if (index === 0) {
        return {
          ...user,
          floorChange: 15.75,  // Tăng 15.75%
          volumeChange: 23.42  // Tăng 23.42%
        };
      }
      // Người dùng thứ hai có giá trị âm
      else if (index === 1) {
        return {
          ...user,
          floorChange: -8.32,  // Giảm 8.32%
          volumeChange: -12.67 // Giảm 12.67%
        };
      }
      // Các người dùng khác có giá trị ngẫu nhiên
      else {
        // Tạo giá trị ngẫu nhiên từ -20 đến +20
        const randomFloorChange = Math.round((Math.random() * 40 - 20) * 100) / 100;
        const randomVolumeChange = Math.round((Math.random() * 40 - 20) * 100) / 100;
        
        return {
          ...user,
          floorChange: randomFloorChange,
          volumeChange: randomVolumeChange
        };
      }
    });
    // END thông tin giả
    
    // Lưu tất cả dữ liệu người dùng để có thể tìm kiếm
    allUsersData = enhancedData;
    
    // Nếu có tìm kiếm, lọc dữ liệu
    let filteredData = enhancedData;
    if (searchTerm) {
      filteredData = filterUsersBySearchTerm(enhancedData, searchTerm);
    }
    
    // Lưu dữ liệu và tổng số users
    totalUsers = filteredData.length;
    
    // Xử lý phân trang thủ công
    const start = currentPage * PAGE_SIZE;
    const end = start + PAGE_SIZE;
    const paginatedData = filteredData.slice(start, end);
    
    // Thêm vào danh sách hiện tại
    usersData = reset ? paginatedData : [...usersData, ...paginatedData];
    currentPage++;
    
    // Render dữ liệu mới
    renderUsers(paginatedData, reset);
    
    // Thêm infinite scroll nếu reset
    if (reset) {
      setupInfiniteScroll();
    }
    
  } catch (error) {
    console.error("Lỗi khi tải dữ liệu users:", error);
    
    // Hiển thị thông báo lỗi
    const tbody = document.getElementById("usersTableBody");
    if (tbody && reset) {
      tbody.innerHTML = `<tr><td colspan="7" class="text-center">Không thể tải dữ liệu. Vui lòng thử lại sau.</td></tr>`;
    }
  } finally {
    isLoading = false;
    
    // Ẩn loading
    const loadingSpinner = document.querySelector(".loading-overlay");
    if (loadingSpinner) {
      loadingSpinner.style.opacity = "0";
      setTimeout(() => {
        loadingSpinner.style.display = "none";
      }, 300);
    }
  }
}

// Hàm lọc người dùng theo từ khóa tìm kiếm
function filterUsersBySearchTerm(users, term) {
  if (!term) return users;
  
  term = term.toLowerCase();
  
  return users.filter(user => {
    // Tìm trong username
    if (user.username && user.username.toLowerCase().includes(term)) {
      return true;
    }
    
    // Tìm trong wallet address
    if (user.walletAddress && user.walletAddress.toLowerCase().includes(term)) {
      return true;
    }
    
    // Có thể mở rộng tìm kiếm trong các trường khác nếu cần
    
    return false;
  });
}

// Hàm tìm kiếm người dùng và cập nhật UI
function searchUsers(term) {
  console.log("Searching users with term:", term);
  searchTerm = term;
  
  // Nếu đã có dữ liệu đầy đủ, lọc và hiển thị
  if (allUsersData.length > 0) {
    const filteredUsers = filterUsersBySearchTerm(allUsersData, term);
    totalUsers = filteredUsers.length;
    
    // Hiển thị kết quả
    const tbody = document.getElementById("usersTableBody");
    if (tbody) {
      tbody.innerHTML = "";
      
      if (filteredUsers.length === 0) {
        tbody.innerHTML = `<tr><td colspan="7" class="text-center">Không tìm thấy người dùng nào phù hợp.</td></tr>`;
      } else {
        renderUsers(filteredUsers, true);
      }
    }
  } else {
    // Nếu chưa có dữ liệu, tải lại với term mới
    loadUsers(true);
  }
}

// Setup infinite scroll
function setupInfiniteScroll() {
  // Xóa sentinel cũ nếu có
  const oldSentinel = document.getElementById("users-sentinel");
  if (oldSentinel) {
    oldSentinel.remove();
  }
  
  // Thêm sentinel mới
  const sentinel = document.createElement('div');
  sentinel.id = 'users-sentinel';
  sentinel.style.height = '1px';
  document.querySelector('.users-table').after(sentinel);
  
  // Observe sentinel
  const observer = new IntersectionObserver((entries) => {
    if (entries[0].isIntersecting && !isLoading) {
      if (usersData.length < totalUsers) {
        loadUsers(false); // Load more without reset
      }
    }
  });
  
  observer.observe(sentinel);
}

// Tách riêng phần setup event listeners
function setupEventListeners() {
  console.log("Setting up event listeners");
  
  // Xóa tất cả event listeners cũ
  const headers = document.querySelectorAll(".sortable");
  headers.forEach((header) => {
    const newHeader = header.cloneNode(true);
    header.parentNode.replaceChild(newHeader, header);
  });

  // Thêm event listeners mới
  document.querySelectorAll(".sortable").forEach((header) => {
    header.onclick = (e) => {
      const column = e.currentTarget.dataset.sort;
      handleSort(column);
    };
  });

  // Search listener với debounce
  const searchInput = document.querySelector(".users-search");
  if (searchInput) {
    const newSearch = searchInput.cloneNode(true);
    searchInput.parentNode.replaceChild(newSearch, searchInput);
    
    newSearch.addEventListener("input", (e) => {
      if (searchTimeout) {
        clearTimeout(searchTimeout);
      }
      
      searchTimeout = setTimeout(() => {
        const term = e.target.value.trim();
        searchUsers(term); // Sử dụng hàm searchUsers thay vì chỉ lưu searchTerm
      }, 300); // Giảm thời gian chờ xuống 300ms để phản hồi nhanh hơn
    });
  }
}

// Hàm xử lý sort riêng
function handleSort(column) {
  if (currentSort.column !== column) {
    currentSort.direction = "desc";
    currentSort.column = column;
  } else {
    currentSort.direction = currentSort.direction === "asc" ? "desc" : "asc";
  }

  // Cập nhật visual indicators
  const headers = document.querySelectorAll(".sortable");
  headers.forEach((header) => {
    header.classList.remove("asc", "desc");
    // Cập nhật icon sort
    const icon = header.querySelector("i");
    if (icon) {
      icon.className = "fas fa-sort";
    }
  });
  
  const currentHeader = document.querySelector(`[data-sort="${column}"]`);
  if (currentHeader) {
    currentHeader.classList.add(currentSort.direction);
    
    // Cập nhật icon sort của cột hiện tại
    const icon = currentHeader.querySelector("i");
    if (icon) {
      icon.className = currentSort.direction === "asc" 
        ? "fas fa-sort-up" 
        : "fas fa-sort-down";
    }
  }

  // Sort locally with JavaScript instead of reloading
  if (usersData.length > 0) {
    usersData.sort((a, b) => {
      let valueA = a[column] || 0;
      let valueB = b[column] || 0;
      
      // Để đảm bảo sort chính xác
      if (typeof valueA === 'string') valueA = valueA.toLowerCase();
      if (typeof valueB === 'string') valueB = valueB.toLowerCase();
      
      if (currentSort.direction === 'asc') {
        return valueA > valueB ? 1 : -1;
      } else {
        return valueA < valueB ? 1 : -1;
      }
    });
    
    // Re-render với dữ liệu đã sort
    const tbody = document.getElementById("usersTableBody");
    if (tbody) {
      tbody.innerHTML = "";
      renderUsers(usersData, true);
    }
  } else {
    // Nếu không có dữ liệu, load lại
    loadUsers(true);
  }
}

// Hàm hiển thị dữ liệu
function renderUsers(newUsers, reset) {
  console.log("Rendering users:", newUsers.length);
  
  const tbody = document.getElementById("usersTableBody");
  if (!tbody) {
    console.error("Cannot find usersTableBody element");
    return;
  }
  
  // Clear table nếu reset
  if (reset) {
    tbody.innerHTML = "";
  }
  
  // Tạo fragment để tối ưu DOM operations
  const fragment = document.createDocumentFragment();
  
  newUsers.forEach((user, index) => {
    const row = document.createElement("tr");
    
    // Xử lý hiển thị Floor change
    let priceChangeHtml = "—";
    if (user.floorChange) {
      const priceChange = user.floorChange;
      const priceChangeClass = priceChange >= 0 ? "text-positive" : "text-negative";
      const priceChangeSymbol = priceChange >= 0 ? "+" : "";

      priceChangeHtml = `
        <div class="price-change ${priceChangeClass}">
          ${priceChangeSymbol}${Math.abs(priceChange).toFixed(2)}%
        </div>
      `;
    }

    // Xử lý hiển thị Volume change
    let volumeChangeHtml = "—";
    if (user.volumeChange) {
      const volumeChangeClass = user.volumeChange >= 0 ? "text-positive" : "text-negative";
      const volumeChangeSymbol = user.volumeChange >= 0 ? "+" : "";

      volumeChangeHtml = `
        <div class="price-change ${volumeChangeClass}">
          ${volumeChangeSymbol}${Math.abs(user.volumeChange).toFixed(2)}%
        </div>
      `;
    }

    const absoluteIndex = reset ? index : usersData.length - newUsers.length + index;
    
    row.innerHTML = `
      <td>${absoluteIndex + 1}</td>
      <td class="collection-info" data-wallet-address="${user.walletAddress}">
        <img class="collection-avatar lazy-image" 
            src="/assets/Demo_user.jpg" 
            data-src="${user.avatar && user.avatar.startsWith('data:') ? user.avatar : "/assets/Demo_user.jpg"}" 
            alt="User"
            onerror="this.onerror=null; this.src='/assets/Demo_user.jpg'">
        <span>${user.username}
          ${user.isVerified ? '<i class="fas fa-check-circle verify-badge"></i>' : ''}
        </span>
      </td>
      <td class="stats-cell">
        <span class="floor-price-value">${(user.floorPrice || 0).toFixed(2)} TIA</span>
      </td>
      <td class="stats-cell price-change-cell">
        ${priceChangeHtml}
      </td>
      <td class="stats-cell">${(user.volume || 0).toFixed(2)} TIA</td>
      <td class="stats-cell price-change-cell">
        ${volumeChangeHtml}
      </td>
      <td class="stats-cell">${user.items || 0}</td>
    `;
    
    fragment.appendChild(row);
  });
  
  tbody.appendChild(fragment);
  
  // Lazy load avatars
  initLazyLoading();
  
  // Setup profile redirects sau khi render
  if (window.setupProfileRedirects) {
    window.setupProfileRedirects();
  }
}

// Thêm lazy loading cho images
function initLazyLoading() {
  if (!('IntersectionObserver' in window)) return;
  
  const imageObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const img = entry.target;
          if (img.dataset.src) {
            img.src = img.dataset.src;
            img.removeAttribute('data-src');
            imageObserver.unobserve(img);
          }
        }
      });
    },
    { rootMargin: '50px 0px', threshold: 0.1 }
  );
  
  document.querySelectorAll('img.lazy-image').forEach(img => {
    if (img.dataset.src) {
      imageObserver.observe(img);
    }
  });
}

// Thêm styles cho lazy loading
const lazyStyles = document.createElement('style');
lazyStyles.textContent = `
  img.lazy-image {
    transition: opacity 0.3s;
  }
  
  #users-sentinel {
    width: 100%;
    height: 20px;
    margin-top: 20px;
  }
  
  .text-positive {
    color: #4caf50;
  }
  
  .text-negative {
    color: #f44336;
  }
  
  /* Thêm CSS cho thông báo không tìm thấy kết quả */
  .no-results {
    text-align: center;
    padding: 20px;
    font-style: italic;
    color: #777;
  }
`;
document.head.appendChild(lazyStyles);