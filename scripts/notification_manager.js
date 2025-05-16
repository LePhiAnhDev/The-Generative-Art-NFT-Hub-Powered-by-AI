class NotificationManager {
    constructor() {
        this.notifications = JSON.parse(localStorage.getItem("notifications")) || [];
        this.badge = document.querySelector(".notification-badge");
        this.notificationList = document.querySelector(".notification-list");
        this.markAllReadBtn = document.querySelector(".mark-all-read");
        this.apiUrl = "http://localhost:8000/api";

        this.init();
    }

    init() {
        this.updateNotificationBadge();
        this.renderNotifications();
        this.setupEventListeners();
        this.checkSellerNotifications();
    }

    setupEventListeners() {
        this.markAllReadBtn?.addEventListener("click", () => {
            this.markAllAsRead();
        });
        document.addEventListener("walletConnected", () => {
            this.checkSellerNotifications();
        });
    }

    addNotification(notification) {
        const newNotification = {
            id: Date.now(),
            message: notification.message,
            type: notification.type,
            icon: notification.icon,
            timestamp: new Date(),
            read: false,
        };

        this.notifications.unshift(newNotification);
        this.saveNotifications();
        this.updateNotificationBadge();
        this.renderNotifications();

        console.log("Added notification:", newNotification);
    }

    async addSellerNotification(sellerId, notification) {
        try {
            console.log("Sending notification to server:", {
                recipient: sellerId,
                message: notification.message,
                type: notification.type,
                icon: notification.icon,
            });

            const response = await fetch(`${this.apiUrl}/notifications`, {
                method: "POST",
                mode: "cors",
                credentials: "same-origin",
                headers: {
                    "Content-Type": "application/json",
                    Accept: "application/json",
                    Origin: window.location.origin,
                },
                body: JSON.stringify({
                    recipient: sellerId,
                    message: notification.message,
                    type: notification.type,
                    icon: notification.icon,
                }),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.detail || "Failed to save notification");
            }

            const result = await response.json();
            console.log("Notification saved to server:", result);
        } catch (error) {
            console.error("Error saving notification:", error);
            this.addLocalNotification(sellerId, notification);
        }
    }

    async checkSellerNotifications() {
        const currentWallet = localStorage.getItem("walletAddress");
        if (!currentWallet) {
            console.log("No wallet connected, skipping notifications check");
            return;
        }

        try {
            console.log("Fetching notifications for wallet:", currentWallet);
            const response = await fetch(`${this.apiUrl}/notifications/${currentWallet}`, {
                method: "GET",
                mode: "cors",
                credentials: "same-origin",
                headers: {
                    Accept: "application/json",
                    Origin: window.location.origin,
                },
            });

            if (!response.ok) {
                throw new Error("Failed to fetch notifications");
            }

            const notifications = await response.json();
            console.log("Fetched notifications:", notifications);

            const displayedNotifications = JSON.parse(localStorage.getItem("displayedNotifications") || "[]");

            notifications.forEach((notification) => {
                const notificationKey = `${notification.message}_${notification.timestamp}`;
                if (!notification.read && !displayedNotifications.includes(notificationKey)) {
                    this.addNotification({
                        message: notification.message,
                        type: notification.type,
                        icon: notification.icon,
                    });
                    displayedNotifications.push(notificationKey);
                }
            });

            localStorage.setItem("displayedNotifications", JSON.stringify(displayedNotifications));
        } catch (error) {
            console.error("Error fetching notifications:", error);
            this.checkLocalNotifications();
        }
    }

    async markAsRead(notificationId) {
        const currentWallet = localStorage.getItem("walletAddress");
        if (!currentWallet) return;

        try {
            await fetch(`${this.apiUrl}/notifications/mark-read`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    wallet_address: currentWallet,
                    notification_ids: [notificationId],
                }),
            });
        } catch (error) {
            console.error("Error marking notification as read:", error);
        }

        const notification = this.notifications.find((n) => n.id === notificationId);
        if (notification) {
            notification.read = true;
            this.saveNotifications();
            this.updateNotificationBadge();
            this.renderNotifications();
        }
    }

    markAllAsRead() {
        this.notifications.forEach((notification) => {
            notification.read = true;
        });
        this.saveNotifications();
        this.updateNotificationBadge();
        this.renderNotifications();
    }

    async removeNotification(notificationId) {
        const notification = this.notifications.find((n) => n.id === notificationId);
        if (notification) {
            const displayedNotifications = JSON.parse(localStorage.getItem("displayedNotifications") || "[]");
            const notificationKey = `${notification.message}_${notification.timestamp}`;
            const updatedDisplayedNotifications = displayedNotifications.filter((key) => key !== notificationKey);
            localStorage.setItem("displayedNotifications", JSON.stringify(updatedDisplayedNotifications));
        }

        this.notifications = this.notifications.filter((n) => n.id !== notificationId);
        this.saveNotifications();
        this.updateNotificationBadge();
        this.renderNotifications();
    }

    updateNotificationBadge() {
        const unreadCount = this.notifications.filter((n) => !n.read).length;
        if (this.badge) {
            if (unreadCount > 0) {
                this.badge.textContent = unreadCount;
                this.badge.style.display = "block";
            } else {
                this.badge.style.display = "none";
            }
        }
    }

    renderNotifications() {
        if (!this.notificationList) return;

        if (this.notifications.length === 0) {
            this.notificationList.innerHTML = '<div class="no-notifications">No notifications</div>';
            return;
        }

        this.notificationList.innerHTML = this.notifications
            .map(
                (notification) => `
                <div class="notification-item ${notification.read ? "" : "unread"}" data-id="${notification.id}">
                    <div class="notification-icon">
                        <i class="${notification.icon}"></i>
                    </div>
                    <div class="notification-content">
                        <p>${notification.message}</p>
                        <span class="notification-time">${this.formatTimestamp(notification.timestamp)}</span>
                    </div>
                    <button class="notification-close" onclick="notificationManager.removeNotification(${notification.id})">
                        <i class="bi bi-x"></i>
                    </button>
                </div>
            `
            )
            .join("");

        this.notificationList.querySelectorAll(".notification-item").forEach((item) => {
            item.addEventListener("click", () => {
                const id = parseInt(item.dataset.id);
                this.markAsRead(id);
            });
        });
    }

    formatTimestamp(timestamp) {
        const date = new Date(timestamp);
        const now = new Date();
        const diff = now - date;

        const minutes = Math.floor(diff / 60000);
        const hours = Math.floor(diff / 3600000);
        const days = Math.floor(diff / 86400000);

        if (minutes < 60) {
            return `${minutes} minutes ago`;
        } else if (hours < 24) {
            return `${hours} hours ago`;
        } else {
            return `${days} days ago`;
        }
    }

    saveNotifications() {
        localStorage.setItem("notifications", JSON.stringify(this.notifications));
    }

    addLocalNotification(sellerId, notification) {
        const sellerNotifications = JSON.parse(localStorage.getItem("sellerNotifications")) || [];
        sellerNotifications.push({
            sellerId: sellerId,
            notification: notification,
            timestamp: new Date().toISOString(),
        });
        localStorage.setItem("sellerNotifications", JSON.stringify(sellerNotifications));
    }

    checkLocalNotifications() {
        // Logic fallback nếu không fetch được từ API
    }
}

const notificationManager = new NotificationManager();
window.notificationManager = notificationManager;
