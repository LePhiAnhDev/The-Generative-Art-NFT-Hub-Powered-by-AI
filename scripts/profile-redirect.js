// Hàm xử lý chuyển hướng đến profile user
function handleProfileRedirect(event) {
  const element = event.target.closest(
    ".collection-info, .artist-info, .artist-card"
  );
  if (!element) return;

  const walletAddress = element.dataset.walletAddress;
  if (walletAddress) {
    window.location.href = `user-detail.html?address=${walletAddress}`;
  }
}

// Hàm setup event listeners
function setupProfileRedirects() {
  // Xử lý cho trang users
  const tableBody = document.getElementById("usersTableBody");
  if (tableBody) {
    tableBody.removeEventListener("click", handleProfileRedirect);
    tableBody.addEventListener("click", handleProfileRedirect);
  }

  // Xử lý cho trang index
  const artistElements = document.querySelectorAll(
    ".artist-card, .artist-info"
  );
  artistElements.forEach((element) => {
    element.removeEventListener("click", handleProfileRedirect);
    element.addEventListener("click", handleProfileRedirect);
    element.style.cursor = "pointer";
  });
}

// Thêm vào DOMContentLoaded
document.addEventListener("DOMContentLoaded", setupProfileRedirects);

// Export function để có thể gọi từ các file js khác
window.setupProfileRedirects = setupProfileRedirects;

// Hàm helper để thêm wallet address vào element
function addWalletAddressToElement(element, walletAddress) {
  if (element) {
    element.dataset.walletAddress = walletAddress;
    element.style.cursor = "pointer";
  }
}
