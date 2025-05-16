async function connectMetaMask() {
    if (typeof window.ethereum !== "undefined") {
        try {
            const accounts = await window.ethereum.request({ method: "eth_requestAccounts" });
            const account = accounts[0];
            console.log("Đã kết nối ví MetaMask:", account);

            // Thêm Forma Testnet vào MetaMask
            try {
                await window.ethereum.request({
                    method: 'wallet_addEthereumChain',
                    params: [{
                        chainId: '0xF043B',
                        chainName: 'Forma Sketchpad',
                        nativeCurrency: {
                            name: 'Test TIA',
                            symbol: 'TIA',
                            decimals: 18
                        },
                        rpcUrls: ['https://rpc.sketchpad-1.forma.art/'],
                        blockExplorerUrls: ['https://explorer.sketchpad-1.forma.art/']
                    }]
                });

                // Chuyển đổi sang mạng Forma Testnet
                await window.ethereum.request({
                    method: 'wallet_switchEthereumChain',
                    params: [{ chainId: '0xF043B' }],
                });
            } catch (switchError) {
                console.error("Lỗi khi thêm/chuyển đổi mạng:", switchError);
            }

            // Lưu địa chỉ ví vào localStorage
            localStorage.setItem("walletAddress", account);

            // Gửi địa chỉ ví đến backend để lưu
            try {
                const result = await saveWalletAddressToServer(account);
                console.log("Đã lưu địa chỉ ví vào server:", result);
            } catch (saveError) {
                console.error("Lỗi khi lưu địa chỉ ví vào server:", saveError);
                // Vẫn tiếp tục nếu lưu server thất bại
            }

            // Chuyển hướng về trang chính
            window.location.href = "index.html";
        } catch (error) {
            console.error("Lỗi khi kết nối MetaMask:", error);
        }
    } else {
        alert("Vui lòng cài đặt MetaMask!");
    }
}

async function saveWalletAddressToServer(walletAddress) {
    try {
        // Kiểm tra user từ endpoint users
        const response = await fetch(`http://localhost:8000/api/users/${walletAddress}`);
        const userData = await response.json();

        if (response.ok) {
            // Nếu user đã tồn tại, cập nhật localStorage với thông tin từ server
            const userProfile = {
                name: userData.username,
                profilePicture: userData.avatar,
                bio: userData.bio || ''
            };
            localStorage.setItem('userProfile', JSON.stringify(userProfile));
            return userData;
        } else {
            // Nếu user chưa tồn tại, tạo mới
            const userProfile = JSON.parse(localStorage.getItem('userProfile') || '{}');
            const requestData = {
                walletAddress: walletAddress,
                username: userProfile.name || `User_${walletAddress.substring(0, 6)}`,
                avatar: userProfile.profilePicture || null
            };

            const saveResponse = await fetch('http://localhost:8000/api/save-address', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(requestData),
            });

            const result = await saveResponse.json();
            console.log('Kết quả từ server:', result);
            return result;
        }
    } catch (error) {
        console.error('Lỗi khi lưu địa chỉ ví:', error);
        throw error;
    }
}

async function connectLeapWallet() {
    if (typeof window.leap !== 'undefined' && window.leap.enable && window.leap.getKey) {
        try {
            const chainId = 'cosmoshub-4'; // Chain ID của mạng Cosmos Hub
            await window.leap.enable(chainId);

            // Lấy thông tin ví
            const keyInfo = await window.leap.getKey(chainId);
            const address = keyInfo.bech32Address;

            // Lưu địa chỉ ví vào localStorage
            localStorage.setItem('walletAddress', address);

            // Gửi địa chỉ ví đến backend để lưu
            await saveWalletAddressToServer(address);

            // Chuyển hướng về trang chính
            window.location.href = 'index.html';
            console.log('Đã kết nối Leap Wallet:', address);
        } catch (error) {
            console.error('Lỗi khi kết nối Leap Wallet:', error);
            alert('Không thể kết nối Leap Wallet. Vui lòng kiểm tra mạng và thử lại.');
        }
    } else {
        alert('Leap Wallet chưa được cài đặt hoặc không được hỗ trợ trên trình duyệt này.');
    }
}

async function connectKeplrWallet() {
    if (typeof window.keplr !== 'undefined') {
        try {
            await window.keplr.enable('cosmoshub-4');
            const offlineSigner = window.getOfflineSigner('cosmoshub-4');
            const accounts = await offlineSigner.getAccounts();
            const address = accounts[0].address;

            // Lưu địa chỉ ví vào localStorage
            localStorage.setItem('walletAddress', address);

            // Gửi địa chỉ ví đến backend để lưu
            await saveWalletAddressToServer(address);

            // Chuyển hướng về trang chính
            window.location.href = 'index.html';
            console.log('Đã kết nối Keplr Wallet:', address);
        } catch (error) {
            console.error('Lỗi khi kết nối Keplr Wallet:', error);
            alert('Không thể kết nối Keplr Wallet.');
        }
    } else {
        alert('Vui lòng cài đặt Keplr Wallet!');
    }
}

// Thêm hàm lưu NFT
async function saveNFTToServer(walletAddress, nftData) {
    try {
        const response = await fetch('http://localhost:8000/api/save-nft', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                walletAddress: walletAddress,
                metadata: {
                    name: nftData.name,
                    description: nftData.description,
                    image: nftData.image,
                    price: nftData.price,
                    is_listed: nftData.is_listed || false,
                    attributes: nftData.attributes || []
                }
            })
        });

        const result = await response.json();
        console.log('Kết quả lưu NFT:', result);
        return result;
    } catch (error) {
        console.error('Lỗi khi lưu NFT:', error);
        throw error;
    }
}

document.getElementById("connectMetaMaskBtn").addEventListener("click", connectMetaMask);
document.querySelector(".leap-wallet-btn").addEventListener("click", connectLeapWallet);
document.querySelector(".keplr-wallet-btn").addEventListener("click", connectKeplrWallet);

window.addEventListener('load', async () => {
    // Check if MetaMask is installed
    if (typeof window.ethereum !== 'undefined') {
        const connectButton = document.getElementById('connectMetaMaskBtn');
        connectButton.disabled = false;
    } else {
        // Hiển thị thông báo cài đặt MetaMask
        const connectButton = document.getElementById('connectMetaMaskBtn');
        connectButton.innerHTML = 'Please install MetaMask';
        connectButton.disabled = true;
    }
});
