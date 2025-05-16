const WalletManager = {
    connect: async function () {
        try {
            const accounts = await window.ethereum.request({ method: "eth_requestAccounts" });
            const account = accounts[0];
            localStorage.setItem("walletAddress", account);
            return account;
        } catch (error) {
            console.error("Error connecting wallet:", error);
            throw error;
        }
    },

    disconnect: function () {
        localStorage.removeItem("walletAddress");
        window.location.href = "login.html";
    },

    getAddress: function () {
        return localStorage.getItem("walletAddress");
    },

    formatAddress: function (address) {
        if (!address) return "";
        return `${address.substring(0, 6)}...${address.substring(address.length - 4)}`;
    },
};

if (typeof window.ethereum !== "undefined") {
    window.ethereum.on("accountsChanged", function (accounts) {
        if (accounts.length === 0) {
            WalletManager.disconnect();
        } else {
            localStorage.setItem("walletAddress", accounts[0]);
            window.location.reload();
        }
    });
}

async function getCurrentWalletAddress() {
    try {
        const accounts = await window.ethereum.request({ method: "eth_accounts" });
        return accounts[0];
    } catch (error) {
        console.error("Error getting wallet address:", error);
        return null;
    }
}

window.WalletManager = WalletManager;

function checkWalletConnection() {
    const savedAddress = localStorage.getItem("walletAddress");
    const userProfile = localStorage.getItem("userProfile");

    if (savedAddress) {
        const shortAddress = `${savedAddress.substring(0, 6)}...${savedAddress.substring(savedAddress.length - 4)}`;

        document.getElementById("connectWalletBtn").style.display = "none";
        document.getElementById("walletInfo").style.display = "block";

        if (userProfile) {
            const profile = JSON.parse(userProfile);
            const navbarUsername = document.getElementById("navbarUsername");
            const walletAvatar = document.querySelector(".wallet-avatar");

            if (navbarUsername) {
                navbarUsername.textContent = profile.name?.trim() || shortAddress;
            }
            if (walletAvatar && profile.profilePicture) {
                walletAvatar.src = profile.profilePicture;
            }
        } else {
            const navbarUsername = document.getElementById("navbarUsername");
            if (navbarUsername) {
                navbarUsername.textContent = shortAddress;
            }
        }

        if (window.notificationManager) {
            window.notificationManager.checkSellerNotifications();
        }

        document.dispatchEvent(new Event("walletConnected"));
    } else {
        showConnectButton();
    }
}

async function connectWallet() {
    try {
        const accounts = await window.ethereum.request({ method: "eth_requestAccounts" });
        const account = accounts[0].toLowerCase();
        localStorage.setItem("walletAddress", account);

        try {
            // Kiểm tra user từ endpoint users
            const response = await fetch(`http://localhost:8000/api/users/${account}`);
            const userData = await response.json();

            if (response.ok) {
                // Nếu user đã tồn tại, cập nhật localStorage
                const userProfile = {
                    name: userData.username,
                    bio: userData.bio || "",
                    profilePicture: userData.avatar
                };
                localStorage.setItem("userProfile", JSON.stringify(userProfile));
            } else {
                // Nếu chưa tồn tại, tạo profile mặc định
                const shortAddress = `${account.substring(0, 6)}...${account.substring(account.length - 4)}`;
                const newProfile = {
                    name: shortAddress,
                    bio: "",
                    profilePicture: null,
                };
                localStorage.setItem("userProfile", JSON.stringify(newProfile));
            }
        } catch (error) {
            console.error("Error fetching user data:", error);
        }

        checkWalletConnection();
        document.dispatchEvent(new Event("walletConnected"));
        console.log("Wallet connected:", account);

        if (window.notificationManager) {
            window.notificationManager.checkSellerNotifications();
        }
    } catch (error) {
        console.error("Error connecting wallet:", error);
    }
}

window.onload = function () {
    checkWalletConnection();
};

function showConnectButton() {
    // Code để hiển thị nút kết nối ví (có thể thêm logic cụ thể nếu cần)
}

function disconnectWallet() {
    localStorage.removeItem("walletAddress");
    window.location.href = "login.html";
}

let isConnecting = false;

async function connectMetaMask() {
    if (isConnecting) return; // Prevent multiple connection attempts
    
    const connectButton = document.getElementById('connectMetaMaskBtn');
    isConnecting = true;
    
    try {
        connectButton.innerHTML = '<span class="spinner"></span> Connecting...';
        connectButton.disabled = true;

        // 1. Connect to MetaMask
        const accounts = await window.ethereum.request({ 
            method: 'eth_requestAccounts'
        });
        
        const walletAddress = accounts[0];
        console.log("Connected wallet address:", walletAddress);

        // 2. Create new user if doesn't exist
        try {
            const response = await fetch(`/api/users/${walletAddress}`);
            
            if (response.status === 404) {
                console.log("Creating new user...");
                const createResponse = await fetch('/api/users', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        walletAddress: walletAddress,
                        username: `User_${walletAddress.slice(0, 6)}`,
                        email: '',
                        bio: '',
                        avatar: '../assets/user.png'
                    })
                });

                if (!createResponse.ok) {
                    throw new Error('Failed to create user');
                }
            }

            // 3. Save to localStorage and redirect
            localStorage.setItem('walletAddress', walletAddress);
            localStorage.setItem('isConnected', 'true');
            
            // Redirect with small delay to ensure localStorage is set
            setTimeout(() => {
                window.location.href = 'index.html';
            }, 100);

        } catch (error) {
            console.error('API Error:', error);
            // Continue with redirect even if API fails
            localStorage.setItem('walletAddress', walletAddress);
            localStorage.setItem('isConnected', 'true');
            window.location.href = 'index.html';
        }

    } catch (error) {
        console.error('Connection failed:', error);
        connectButton.innerHTML = 'Connection failed. Try again';
    } finally {
        isConnecting = false;
        connectButton.disabled = false;
    }
}

// Check MetaMask on page load
document.addEventListener('DOMContentLoaded', () => {
    const connectButton = document.getElementById('connectMetaMaskBtn');
    
    if (!connectButton) {
        console.error('Connect button not found');
        return;
    }

    if (typeof window.ethereum !== 'undefined') {
        connectButton.disabled = false;
        
        // Check if already connected
        const isConnected = localStorage.getItem('isConnected');
        const walletAddress = localStorage.getItem('walletAddress');
        
        if (isConnected === 'true' && walletAddress) {
            window.location.href = 'index.html';
        }
    } else {
        connectButton.innerHTML = 'Please install MetaMask';
        connectButton.disabled = true;
    }
});

// Handle account changes
if (window.ethereum) {
    window.ethereum.on('accountsChanged', function (accounts) {
        localStorage.removeItem('walletAddress');
        localStorage.removeItem('isConnected');
        window.location.reload();
    });
}
