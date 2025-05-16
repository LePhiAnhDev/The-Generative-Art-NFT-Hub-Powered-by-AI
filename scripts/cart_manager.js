class CartManager {
    constructor() {
        this.cart = JSON.parse(localStorage.getItem("cart")) || [];
        this.badge = document.querySelector(".cart-badge");
        this.cartList = document.querySelector(".cart-list");
        this.totalAmount = document.querySelector(".total-amount");
        this.clearCartBtn = document.querySelector(".clear-cart");
        this.checkoutBtn = document.querySelector(".checkout-btn");

        this.init();
    }

    init() {
        this.updateCartBadge();
        this.renderCart();
        this.setupEventListeners();
    }

    setupEventListeners() {
        this.clearCartBtn?.addEventListener("click", () => {
            this.clearCart();
        });

        this.checkoutBtn?.addEventListener("click", () => {
            this.checkout();
        });
    }

    addToCart(item) {
        this.cart.push({
            ...item,
            id: Date.now(),
            timestamp: new Date(),
        });
        this.saveCart();
        this.updateCartBadge();
        this.renderCart();
    }

    removeFromCart(itemId) {
        this.cart = this.cart.filter((item) => item.id !== itemId);
        this.saveCart();
        this.updateCartBadge();
        this.renderCart();
    }

    clearCart() {
        this.cart = [];
        this.saveCart();
        this.updateCartBadge();
        this.renderCart();
    }

    updateCartBadge() {
        if (this.badge) {
            this.badge.textContent = this.cart.length;
            this.badge.style.display = this.cart.length > 0 ? "block" : "none";
        }
    }

    calculateTotal() {
        const total = this.cart.reduce((sum, item) => {
            const price = parseFloat(item.price) || 0;
            return sum + price;
        }, 0);
        return Number(total.toFixed(2));
    }

    renderCart() {
        if (!this.cartList) return;

        if (this.cart.length === 0) {
            this.cartList.innerHTML = '<div class="no-items">Your cart is empty</div>';
            this.totalAmount.textContent = "0 TIA";
            return;
        }

        this.cartList.innerHTML = this.cart
            .map(
                (item) => `
            <div class="cart-item">
                <img src="${item.image}" alt="${item.name}" class="cart-item-image">
                <div class="cart-item-details">
                    <h6>${item.name}</h6>
                    <p>${Number(item.price).toFixed(2)} TIA</p>
                </div>
                <button class="remove-item" onclick="cartManager.removeFromCart(${item.id})">
                    <i class="bi bi-x"></i>
                </button>
            </div>
        `
            )
            .join("");

        this.totalAmount.textContent = `${this.calculateTotal()} TIA`;
    }

    saveCart() {
        localStorage.setItem("cart", JSON.stringify(this.cart));
    }

    async checkout() {
        if (this.cart.length === 0) {
            alert("Your cart is empty");
            return;
        }

        const walletAddress = localStorage.getItem("walletAddress");
        if (!walletAddress) {
            alert("Please connect your wallet first");
            return;
        }

        try {
            window.notificationManager.addNotification({
                message: "Processing your checkout...",
                type: "info",
                icon: "bi bi-hourglass-split",
            });

            const web3 = new Web3(window.ethereum);
            const accounts = await web3.eth.requestAccounts();
            const userAddress = accounts[0];

            // Xử lý từng NFT trong giỏ hàng
            for (const item of this.cart) {
                try {
                    // Lưu ý: contractABI và contractAddress được khai báo ở file smart contract (không thay đổi)
                    const contract = new web3.eth.Contract(contractABI, contractAddress);

                    const priceInWei = web3.utils.toWei(item.price.toString(), "ether");

                    const buyTx = await contract.methods.buyNFT(item.tokenId).send({
                        from: userAddress,
                        value: priceInWei,
                        gasPrice: "25000000000",
                        gas: "250000",
                    });

                    if (buyTx.status) {
                        window.notificationManager.addNotification({
                            message: `Successfully purchased NFT "${item.name}"!`,
                            type: "success",
                            icon: "bi bi-check-circle",
                        });

                        await window.notificationManager.addSellerNotification(item.seller, {
                            message: `Your NFT "${item.name}" has been purchased for ${item.price} TIA`,
                            type: "success",
                            icon: "bi bi-cash-coin",
                        });
                    }
                } catch (error) {
                    console.error("Error buying NFT:", error);
                    window.notificationManager.addNotification({
                        message: `Failed to purchase "${item.name}": ${error.message}`,
                        type: "error",
                        icon: "bi bi-x-circle",
                    });
                }
            }

            this.clearCart();

            window.notificationManager.addNotification({
                message: "Checkout completed!",
                type: "success",
                icon: "bi bi-check-circle-fill",
            });

            setTimeout(() => {
                window.location.reload();
            }, 2000);
        } catch (error) {
            console.error("Checkout error:", error);
            window.notificationManager.addNotification({
                message: error.message,
                type: "error",
                icon: "bi bi-x-circle",
            });
        }
    }
}

// Khởi tạo cart manager khi trang load
let cartManager = new CartManager();
