# Giả sử bạn định nghĩa một hệ số λ để cân bằng trọng số của số lượng NFT bán ra.
# Công thức là:
#
#     score = (views * (1 + λ * userSales)) / ((hours_since_listed + k) ** g)
#
# Trong đó:
#   - views: số lượt xem của bài viết.
#   - userSales: số lượng NFT mà user đó đã bán (hoặc được mua).
#   - hours_since_listed: số giờ kể từ khi bài viết được đăng lên (hoặc được cập nhật).
#   - k và g: là các hằng số, ví dụ k = 2 và g = 1.8.
#   - λ: là trọng số cho số lượng NFT bán được; ví dụ, nếu bạn đặt λ = 0.03 thì mỗi NFT bán được sẽ
#         tăng hệ số nhân lên 3% (tức hệ số nhân sẽ là 1 + 0.03 * userSales).

import os
import re
import sys
import json  
import math
import faiss
import base64
import pymongo
import aiohttp
import asyncio
import uvicorn
import numpy as np
from io import BytesIO
from bson import ObjectId
from datetime import datetime
from pydantic import BaseModel
from pymongo import MongoClient
from typing import Optional, List
from generative_art import generate_art
from fastapi.staticfiles import StaticFiles
from generative_video import generate_video
from fastapi.middleware.cors import CORSMiddleware
from fastapi.middleware.gzip import GZipMiddleware
from sentence_transformers import SentenceTransformer
from chatbot_logic import process_message as chatbot_process_message
from fastapi import FastAPI, HTTPException, Query, WebSocket, Form, UploadFile, File

# Nếu cần, đảm bảo đường dẫn chứa các module được thêm vào sys.path
sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

os.makedirs("../assets/generated", exist_ok=True)

# CORS configuration
origins = [
    "http://localhost",
    "http://localhost:8000",
    "http://127.0.0.1",
    "http://127.0.0.1:8000",
    "http://127.0.0.1:5500",
    "http://localhost:5500",
    "*",
]

app = FastAPI()

# Thêm GZipMiddleware (nén response >1KB)
app.add_middleware(GZipMiddleware, minimum_size=1000)

# Middleware CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allow_headers=["Content-Type", "Authorization", "Accept", "Origin", "X-Requested-With"],
    expose_headers=["*"],
    max_age=3600,
)

# Mount static files (cho phép xử lý file HTML tĩnh)
app.mount("/assets", StaticFiles(directory="../assets", html=True), name="assets")

# MongoDB connection
client = pymongo.MongoClient("mongodb://localhost:27017")
db = client["mydb"]
collection = db["users"]
nft_collection = db["nfts"]
notifications_collection = db["notifications"]

# Load model Embedding
model = SentenceTransformer("intfloat/multilingual-e5-large")

# Khởi tạo FAISS Index
vector_dim = 1024  # kích thước vector của model
index = faiss.IndexFlatL2(vector_dim)

# Hàm nạp dữ liệu từ MongoDB vào FAISS
def load_data_to_faiss():
    print("🔄 Đang tải dữ liệu vào FAISS...")
    nfts = list(nft_collection.find({}, {"_id": 0, "metadataUri": 1}))
    users = list(collection.find({}, {"_id": 0, "username": 1, "walletAddress": 1}))
    all_texts = []
    all_ids = []
    if nfts:
        for nft in nfts:
            all_texts.append(f"NFT: {nft.get('metadataUri', '')}")
            all_ids.append(f"NFT_{nft.get('metadataUri', '')}")
    if users:
        for user in users:
            all_texts.append(f"User: {user.get('username', '')}, Wallet: {user.get('walletAddress', '')}")
            all_ids.append(f"User_{user.get('walletAddress', '')}")
    if not all_texts:
        print("⚠ Không có dữ liệu nào để nạp vào FAISS!")
        return
    all_vectors = model.encode(all_texts, convert_to_numpy=True)
    if all_vectors.shape[1] != vector_dim:
        raise ValueError(f"❌ Kích thước vector không khớp! FAISS cần {vector_dim} nhưng nhận {all_vectors.shape[1]}")
    index.add(all_vectors)
    print(f"✅ FAISS đã index {index.ntotal} vectors.")

load_data_to_faiss()

def format_response(response):
    """Định dạng response gửi qua WebSocket"""
    if isinstance(response, str) and response.startswith("REDIRECT:"):
        return response  # Trả về lệnh REDIRECT nguyên dạng
    elif isinstance(response, dict):
        if "nfts" in response:
            nft_list = response["nfts"]
            if not nft_list:
                return "Không tìm thấy NFT nào phù hợp."
            message_lines = ["Các NFT có giá thỏa mãn:"]
            for nft in nft_list:
                tokenId = nft.get("tokenId", "N/A")
                price = nft.get("price", "N/A")
                message_lines.append(f"Token ID: {tokenId}, Giá: {price} TIA")
            return "\n".join(message_lines)
        else:
            return json.dumps(response)
    return str(response)

@app.websocket("/ws")
async def websocket_endpoint(websocket: WebSocket):
    await websocket.accept()
    print("✅ WebSocket connection established.")
    try:
        while True:
            data = await websocket.receive_text()
            print(f"📩 Nhận tin nhắn: {data}")
            
            try:
                response = chatbot_process_message(data, model, index, nft_collection)
                formatted = format_response(response)
                print(f"🔄 Gửi phản hồi: {formatted}")
                await websocket.send_text(formatted)
            except Exception as e:
                print(f"❌ Lỗi xử lý tin nhắn: {str(e)}")
                await websocket.send_text("Xin lỗi, tôi không hiểu yêu cầu của bạn.")
            
    except Exception as e:
        print(f"❌ Lỗi WebSocket: {str(e)}")
    finally:
        print("⚠ WebSocket connection closed.")

# Pydantic models
class AddressRequest(BaseModel):
    walletAddress: str
    username: Optional[str] = None
    avatar: Optional[str] = None
    bio: Optional[str] = None

class NFTMetadata(BaseModel):
    name: str
    description: str
    image: str
    price: Optional[float] = None

class CreateNFTRequest(BaseModel):
    walletAddress: str
    metadataUri: str
    tokenId: Optional[int] = None
    fileType: Optional[str] = None  # Thêm trường này

class Notification(BaseModel):
    recipient: str
    message: str
    type: str
    icon: str
    read: bool = False
    timestamp: datetime = datetime.now()

class GenerateArtRequest(BaseModel):
    num_inference_steps: int = 50
    guidance_scale: float = 7.5
    width: int = 512
    height: int = 512
    user_prompt: str

class NFTPurchaseRequest(BaseModel):
    tokenId: int
    buyer_address: str

# Định nghĩa request model cho video
class GenerateVideoRequest(BaseModel):
    num_inference_steps: int = 4
    guidance_scale: float = 1.0
    user_prompt: str

def calculate_nft_score(
    views: int, hours_since_listed: float, user_sales: int
) -> float:
    try:
        # Hằng số
        lambda_ = 1  # λ = 1 thay vì 0.01
        k = 2  # k = 2
        g = 1.8  # g = 1.8

        # Tính hệ số người dùng: 1 + λ × userSales
        user_factor = 1 + (lambda_ * user_sales)

        # Tính mẫu số thời gian: (hours_since_listed + k)^g
        time_denominator = pow(hours_since_listed + k, g)

        # Tính score: (views × user_factor) / time_denominator
        score = (views * user_factor) / time_denominator

        # print(
        #     f"""
        # Score calculation details:
        # - Views: {views}
        # - Hours since listed: {hours_since_listed:.4f}
        # - User sales: {user_sales}
        # - λ (lambda): {lambda_}
        # - User factor (1 + λ × userSales): {user_factor}
        # - Time denominator ((hours + {k})^{g}): {time_denominator:.4f}
        # - Final score: {score:.4f}
        # """
        # )
        return score
    except Exception as e:
        print(f"Error calculating score: {e}")
        return 0

def update_nft_score(nft_id: ObjectId) -> None:
    try:
        nft = nft_collection.find_one(
            {
                "_id": nft_id,
                "price": {"$ne": None},
                "$or": [
                    {"is_listed": True},
                    {"is_listed": False, "listed_time": {"$exists": True}},
                ],
            }
        )

        if not nft:
            print(f"NFT không hợp lệ để cập nhật điểm: {nft_id}")
            return

        current_time = datetime.now()
        listed_time = nft.get("listed_time")

        if not listed_time:
            print(f"NFT thiếu thời gian list: {nft_id}")
            return

        time_diff = current_time - listed_time
        hours_since_listed = time_diff.total_seconds() / 3600

        views = nft.get("views", 0)
        user_sales = get_user_sales(nft["walletAddress"])

        print(
            f"""
        Cập nhật điểm cho NFT {nft_id}:
        - Wallet: {nft['walletAddress']}
        - Views: {views}
        - Giờ kể từ khi list: {hours_since_listed:.4f}
        - Số NFT đã bán: {user_sales}
        """
        )

        new_score = calculate_nft_score(views, hours_since_listed, user_sales)

        nft_collection.update_one(
            {"_id": nft_id},
            {"$set": {"score": new_score, "last_updated": current_time}},
        )

        print(f"Điểm mới cho NFT {nft_id}: {new_score}")

    except Exception as e:
        print(f"Lỗi khi cập nhật điểm NFT: {e}")

def get_user_sales(wallet_address: str) -> int:
    try:
        sales_count = nft_collection.count_documents(
            {
                "walletAddress": wallet_address.lower(),
                "price": {"$ne": None},
                "is_listed": False,
            }
        )
        print(f"User {wallet_address} has {sales_count} sales")
        return sales_count
    except Exception as e:
        print(f"Error getting user sales: {e}")
        return 0

# API Endpoints
@app.post("/api/save-address")
def save_address(request_data: AddressRequest):
    wallet = request_data.walletAddress.lower()
    print("Received walletAddress:", wallet)

    if not wallet or not wallet.startswith("0x"):
        raise HTTPException(status_code=400, detail="Invalid wallet address format")

    existing_user = collection.find_one({"walletAddress": wallet})
    user_doc = {
        "walletAddress": wallet,
        "username": request_data.username or f"User_{wallet[:6]}",
        "avatar": request_data.avatar,
        "bio": request_data.bio or "",
        "created_at": datetime.now(),
        "last_updated": datetime.now(),
    }

    if existing_user:
        collection.update_one({"walletAddress": wallet}, {"$set": user_doc})
        return {"message": "User profile updated successfully!", "savedAddress": wallet}

    collection.insert_one(user_doc)
    return {
        "message": "Address and profile saved successfully!",
        "savedAddress": wallet,
    }

@app.post("/api/save-nft")
async def save_nft(request: CreateNFTRequest):
    try:
        existing_nft = nft_collection.find_one({"tokenId": request.tokenId})
        if existing_nft:
            update_data = {
                "$set": {
                    "metadataUri": request.metadataUri,
                    "last_updated": datetime.now(),
                }
            }
            nft_collection.update_one({"tokenId": request.tokenId}, update_data)
            return {
                "message": "NFT updated successfully",
                "nft_id": str(existing_nft["_id"]),
            }
        else:
            nft_doc = {
                "walletAddress": request.walletAddress.lower(),
                "metadataUri": request.metadataUri,
                "tokenId": request.tokenId,
                "fileType": request.fileType,
                "created_at": datetime.now(),
                "price": None,
                "is_listed": False,
                "views": 0,
                "listed_time": None,
                "score": 0,
            }
            result = nft_collection.insert_one(nft_doc)
            return {
                "message": "NFT saved successfully",
                "nft_id": str(result.inserted_id),
            }
    except Exception as e:
        print("Error saving NFT:", str(e))
        raise HTTPException(status_code=500, detail=str(e))

@app.put("/api/update-nft-listing/{token_id}")
async def update_nft_listing(token_id: int, listing_data: dict):
    try:
        update_data = {
            "$set": {
                "price": float(listing_data.get("price", 0)),
                "is_listed": True,
                "listed_time": datetime.now(),
                "last_updated": datetime.now(),
            }
        }

        # Sử dụng token_id từ đường dẫn thay vì từ body
        result = nft_collection.update_one({"tokenId": token_id}, update_data)

        if result.modified_count == 0:
            raise HTTPException(status_code=400, detail=f"Failed to update NFT listing with tokenId: {token_id}")

        # Tìm NFT vừa cập nhật để lấy _id
        nft = nft_collection.find_one({"tokenId": token_id})
        if nft and "_id" in nft:
            # Cập nhật score
            update_nft_score(nft["_id"])

        return {"message": "NFT listing updated successfully"}

    except Exception as e:
        print("Error updating NFT listing:", str(e))
        raise HTTPException(status_code=500, detail=str(e))

@app.post("/api/record-nft-purchase")
async def record_purchase(purchase_data: NFTPurchaseRequest):
    try:
        # Tìm NFT theo tokenId
        nft = nft_collection.find_one({"tokenId": purchase_data.tokenId})

        if not nft:
            raise HTTPException(status_code=404, detail="NFT không tồn tại")

        # Lấy thời gian hiện tại
        current_time = datetime.now()

        # Tính toán số giờ kể từ khi list
        listed_time = nft.get("listed_time")
        if not listed_time:
            print(f"NFT {purchase_data.tokenId} chưa được list")
            listed_time = current_time

        hours_since_listed = (current_time - listed_time).total_seconds() / 3600

        # Lấy số lượng views và user sales
        views = nft.get("views", 0)
        user_sales = get_user_sales(nft["walletAddress"])

        # Tính toán score mới
        new_score = calculate_nft_score(views, hours_since_listed, user_sales)

        # Cập nhật NFT
        update_result = nft_collection.update_one(
            {"tokenId": purchase_data.tokenId},
            {
                "$set": {
                    "is_listed": False,
                    "last_updated": current_time,
                    "score": new_score,  # Cập nhật score luôn tại đây
                }
            },
        )

        if update_result.modified_count == 0:
            raise HTTPException(status_code=400, detail="Không thể cập nhật NFT")

        # Gọi update_nft_score để đảm bảo logic cập nhật điểm được thực thi
        update_nft_score(nft["_id"])

        return {"message": "Giao dịch đã được xử lý thành công"}

    except Exception as e:
        print(f"Lỗi khi xử lý giao dịch: {str(e)}")
        raise HTTPException(status_code=500, detail=str(e))

@app.get("/api/get-user-nfts/{wallet_address}")
async def get_user_nfts(wallet_address: str):
    try:
        nfts = nft_collection.find({"walletAddress": wallet_address.lower()})
        nft_list = []
        for nft in nfts:
            nft["_id"] = str(nft["_id"])
            nft_list.append(nft)
        return nft_list
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.get("/api/nfts")
async def get_nfts():
    try:
        # Lấy tất cả NFTs từ database
        nfts = list(nft_collection.find({}))
        
        # Format NFTs với metadata từ IPFS
        formatted_nfts = []
        for nft in nfts:
            try:
                metadata_uri = nft.get("metadataUri", "")
                if metadata_uri:
                    # Chuyển IPFS URL thành HTTP URL
                    http_url = metadata_uri.replace("ipfs://", "https://ipfs.io/ipfs/")
                    
                    # Fetch metadata từ IPFS
                    async with aiohttp.ClientSession() as session:
                        async with session.get(http_url) as response:
                            if response.status == 200:
                                metadata = await response.json()
                                formatted_nfts.append({
                                    "tokenId": nft["tokenId"],
                                    "name": metadata.get("name", "Unnamed NFT"),
                                    "description": metadata.get("description", ""),
                                    "image": metadata.get("image", "").replace("ipfs://", "https://ipfs.io/ipfs/"),
                                    "price": nft.get("price", 0),
                                    "is_listed": nft.get("is_listed", False),
                                    "walletAddress": nft.get("walletAddress", ""),
                                    "fileType": metadata.get("fileType", nft.get("fileType", "")),
                                    "created_at": nft.get("created_at", ""),
                                    "views": nft.get("views", 0)
                                })
            except Exception as e:
                print(f"Error processing NFT {nft.get('tokenId')}: {str(e)}")
                continue
            
        return formatted_nfts
    except Exception as e:
        print(f"Error getting NFTs: {str(e)}")
        raise HTTPException(status_code=500, detail=str(e))

# Thêm endpoint để force update score
@app.post("/api/update-scores")
async def force_update_scores():
    try:
        all_nfts = list(nft_collection.find({"listed_time": {"$exists": True}}))

        for nft in all_nfts:
            update_nft_score(nft["_id"])

        return {"message": f"Updated scores for {len(all_nfts)} NFTs"}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.get("/api/nfts/filter")
async def filter_nfts(
    min_price: float = None,
    max_price: float = None,
    category: str = None,
    skip: int = 0,
    limit: int = 20,
):
    try:
        # Khởi tạo query với điều kiện is_listed = True
        filter_query = {"is_listed": True}

        # Thêm điều kiện filter theo price
        if min_price is not None:
            filter_query["price"] = {"$gte": min_price}

        if max_price is not None:
            filter_query["price"] = filter_query.get("price", {})
            filter_query["price"]["$lte"] = max_price

        # Thêm điều kiện filter theo category nếu có
        if category:
            filter_query["category"] = category

        # Log để debug
        print(f"Filter query: {filter_query}")

        # Thực hiện query với sort, skip và limit
        nfts = list(
            nft_collection.find(filter_query).sort("score", -1).skip(skip).limit(limit)
        )

        # Convert ObjectId thành string
        for nft in nfts:
            nft["_id"] = str(nft["_id"])

        # Log số lượng kết quả
        print(f"Found {len(nfts)} NFTs matching criteria")

        return nfts

    except Exception as e:
        print(f"Error in filter_nfts: {str(e)}")
        raise HTTPException(status_code=500, detail=str(e))

@app.get("/api/users")
async def get_users():
    try:
        users = list(collection.find({}, {"_id": 0}))
        users_stats = []

        for user in users:
            wallet_address = user["walletAddress"].lower()
            try:
                # Lấy tất cả NFT của user
                all_user_nfts = list(nft_collection.find({"walletAddress": wallet_address}))
                
                # Lấy NFT đang được listed
                listed_nfts = list(nft_collection.find({
                    "walletAddress": wallet_address,
                    "is_listed": True,
                    "price": {"$ne": None}
                }))
                
                # Tính toán dữ liệu
                total_volume = 0
                floor_prices = []
                
                # Tính volume từ tất cả NFT có giá
                for nft in all_user_nfts:
                    try:
                        price_value = nft.get("price")
                        if price_value is not None and price_value != "":
                            price = float(price_value)
                            if price > 0:
                                total_volume += price
                    except Exception as e:
                        print(f"Error processing NFT price for volume: {e}")
                        continue
                
                # Tính floor price từ NFT đang listed
                for nft in listed_nfts:
                    try:
                        price_value = nft.get("price")
                        if price_value is not None and price_value != "":
                            price = float(price_value)
                            if price > 0:
                                floor_prices.append(price)
                    except Exception as e:
                        print(f"Error processing NFT price for floor price: {e}")
                        continue
                
                # Debug log
                print(f"User {wallet_address}: {len(all_user_nfts)} NFTs, Volume: {total_volume}, Floor prices: {floor_prices}")
                
                # Tạo thông tin user
                user_stats = {
                    "username": user.get("username", f"User_{wallet_address[:6]}"),
                    "walletAddress": wallet_address,
                    "avatar": user.get("avatar", "/assets/Demo_user.jpg"),  # Sửa đường dẫn thành tuyệt đối
                    "bio": user.get("bio", ""),
                    "floorPrice": min(floor_prices) if floor_prices else 0,
                    "volume": total_volume,
                    "items": len(all_user_nfts),
                    "sales": get_user_sales(wallet_address),
                    "isVerified": user.get("isVerified", False),
                    "floorChange": 0,     # Thêm giá trị mặc định cho floorChange
                    "volumeChange": 0     # Thêm giá trị mặc định cho volumeChange
                }
                users_stats.append(user_stats)
            except Exception as user_error:
                print(f"Error processing user {wallet_address}: {str(user_error)}")
                # Thêm user với thông tin cơ bản để tránh bỏ qua hoàn toàn
                users_stats.append({
                    "username": user.get("username", f"User_{wallet_address[:6]}"),
                    "walletAddress": wallet_address,
                    "avatar": user.get("avatar", "/assets/Demo_user.jpg"),
                    "floorPrice": 0,
                    "volume": 0,
                    "items": 0,
                    "sales": 0,
                    "isVerified": user.get("isVerified", False),
                    "floorChange": 0,
                    "volumeChange": 0
                })

        # Sort by volume
        users_stats.sort(key=lambda x: x["volume"], reverse=True)
        
        # Thêm dữ liệu giả cho floorChange và volumeChange (có thể bỏ sau khi có dữ liệu thực)
        for index, user in enumerate(users_stats):
            if index == 0:
                user["floorChange"] = 15.75  # Tăng 15.75%
                user["volumeChange"] = 23.42  # Tăng 23.42%
            elif index == 1:
                user["floorChange"] = -8.32  # Giảm 8.32%
                user["volumeChange"] = -12.67  # Giảm 12.67%
            else:
                # Tạo giá trị ngẫu nhiên từ -20 đến +20 cho các user khác
                import random
                user["floorChange"] = round((random.random() * 40 - 20) * 100) / 100
                user["volumeChange"] = round((random.random() * 40 - 20) * 100) / 100
        
        # Debug log
        print(f"Returning data for {len(users_stats)} users")
        
        return users_stats
    except Exception as e:
        print(f"Critical error in get_users: {str(e)}")
        raise HTTPException(status_code=500, detail=str(e))
    
# Notification endpoints
@app.post("/api/notifications")
async def create_notification(notification: Notification):
    try:
        notification_dict = notification.model_dump()
        notification_dict["recipient"] = notification_dict["recipient"].lower()
        result = notifications_collection.insert_one(notification_dict)
        return {
            "message": "Notification created successfully",
            "id": str(result.inserted_id),
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.get("/api/notifications/{wallet_address}")
async def get_notifications(wallet_address: str):
    try:
        notifications = list(
            notifications_collection.find(
                {"recipient": wallet_address.lower()}, {"_id": 0}
            ).sort("timestamp", -1)
        )
        return notifications
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.put("/api/notifications/mark-read")
async def mark_notifications_read(
    wallet_address: str, notification_ids: List[str] = None
):
    try:
        query = {"recipient": wallet_address.lower()}
        if notification_ids:
            query["_id"] = {"$in": [ObjectId(id) for id in notification_ids]}
        notifications_collection.update_many(query, {"$set": {"read": True}})
        return {"message": "Notifications marked as read"}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.delete("/api/notifications/{notification_id}")
async def delete_notification(notification_id: str, wallet_address: str):
    try:
        result = notifications_collection.delete_one(
            {"_id": ObjectId(notification_id), "recipient": wallet_address.lower()}
        )
        if result.deleted_count == 0:
            raise HTTPException(status_code=404, detail="Notification not found")
        return {"message": "Notification deleted successfully"}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.post("/api/generate-art")
async def generate_art_endpoint(request: GenerateArtRequest):
    try:
        image = generate_art(
            num_inference_steps=request.num_inference_steps,
            guidance_scale=request.guidance_scale,
            width=request.width,
            height=request.height,
            user_prompt=request.user_prompt,
        )
        buffered = BytesIO()
        image.save(buffered, format="PNG")
        img_str = base64.b64encode(buffered.getvalue()).decode()
        response_data = {"image": f"data:image/png;base64,{img_str}"}
        return response_data
    except Exception as e:
        print("Error occurred:", str(e))
        raise HTTPException(status_code=500, detail=str(e))

@app.get("/api/top-artists")
async def get_top_artists(limit: int = 12):
    try:
        # Modified pipeline to show all users, not just those with sold NFTs
        # Also fixed field name inconsistencies
        pipeline = [
            # Count all NFTs by wallet address, not just sold ones
            {
                "$group": {
                    "_id": "$walletAddress",  # Use camelCase as in the database
                    "total_sales_value": {"$sum": {"$cond": [{"$and": [{"$eq": ["$is_listed", False]}, {"$ne": ["$price", None]}]}, "$price", 0]}},
                    "nft_count": {"$sum": 1},
                }
            },
            {
                "$lookup": {
                    "from": "users",
                    "localField": "_id",
                    "foreignField": "walletAddress",
                    "as": "user_details",
                }
            },
            # Skip users with no details
            {"$match": {"user_details": {"$ne": []}}},
            {"$unwind": "$user_details"},
            {
                "$project": {
                    "walletAddress": "$_id",  # Use camelCase to match database and frontend
                    "username": "$user_details.username",
                    "avatar": "$user_details.avatar",
                    "totalSalesValue": "$total_sales_value",  # Use camelCase
                    "nftCount": "$nft_count",  # Use camelCase
                }
            },
            {"$sort": {"totalSalesValue": -1}},
            {"$limit": limit},
        ]
        
        # If no NFTs exist yet, fetch users directly
        if nft_collection.count_documents({}) == 0:
            print("No NFTs found, fetching users directly")
            users = list(collection.find().limit(limit))
            return [
                {
                    "walletAddress": user.get("walletAddress"),
                    "username": user.get("username"),
                    "avatar": user.get("avatar"),
                    "totalSalesValue": 0,
                    "nftCount": 0
                }
                for user in users
            ]
        
        top_artists = list(nft_collection.aggregate(pipeline))
        
        # Add debugging information
        print(f"Found {len(top_artists)} artists")
        if top_artists:
            print(f"Sample artist: {top_artists[0]}")
            
        return top_artists
    except Exception as e:
        print(f"Error in get_top_artists: {str(e)}")
        # Return an empty list instead of throwing an error
        return []
    
@app.get("/api/top-nfts")
async def get_top_nfts(limit: int = 24):
    try:
        all_nfts = list(nft_collection.find({"price": {"$ne": None}}))
        for nft in all_nfts:
            listed_time = nft.get("listed_time")
            if listed_time:
                hours_since_listed = (
                    datetime.now() - listed_time
                ).total_seconds() / 3600
                views = nft.get("views", 0)
                user_sales = get_user_sales(nft["walletAddress"])
                new_score = calculate_nft_score(views, hours_since_listed, user_sales)
                nft_collection.update_one(
                    {"_id": nft["_id"]}, {"$set": {"score": new_score}}
                )
        top_nfts = list(
            nft_collection.find({"is_listed": True}).sort("score", -1).limit(limit)
        )
        for nft in top_nfts:
            nft["_id"] = str(nft["_id"])
        return top_nfts
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.post("/api/update-views/{token_id}")
async def update_nft_views(token_id: int):
    try:
        result = nft_collection.update_one(
            {"tokenId": token_id}, {"$inc": {"views": 1}}
        )
        if result.modified_count == 0:
            raise HTTPException(status_code=404, detail="NFT not found")
        nft = nft_collection.find_one({"tokenId": token_id})
        if nft:
            update_nft_score(nft["_id"])
        return {"message": "Views updated successfully"}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.post("/api/update-profile")
async def update_profile(
    username: str = Form(...),
    walletAddress: str = Form(...),
    avatar: Optional[UploadFile] = File(None),
    bio: Optional[str] = Form(None)
):
    try:
        # Kiểm tra xem user có tồn tại không
        existing_user = collection.find_one({"walletAddress": walletAddress.lower()})
        if not existing_user:
            raise HTTPException(status_code=404, detail="User not found")

        # Chuẩn bị dữ liệu cập nhật
        update_data = {
            "username": username,
            "bio": bio or "",  # Nếu không có bio thì lưu chuỗi rỗng
            "last_updated": datetime.now()
        }

        # Xử lý avatar nếu có
        if avatar and avatar.filename:  # Kiểm tra cả filename
            try:
                # Kiểm tra loại file
                if not avatar.content_type.startswith('image/'):
                    raise HTTPException(status_code=400, detail="File must be an image")

                # Đọc và encode ảnh
                contents = await avatar.read()
                encoded_image = base64.b64encode(contents).decode('utf-8')
                update_data["avatar"] = f"data:{avatar.content_type};base64,{encoded_image}"
            except Exception as e:
                print(f"Error processing avatar: {str(e)}")
                # Không raise exception, tiếp tục cập nhật các thông tin khác

        # Cập nhật thông tin user
        result = collection.update_one(
            {"walletAddress": walletAddress.lower()},
            {"$set": update_data}
        )

        if result.modified_count == 0:
            raise HTTPException(status_code=400, detail="Profile update failed")

        return {
            "message": "Profile updated successfully",
            "username": username,
            "bio": bio or "",
            "avatar": update_data.get("avatar", existing_user.get("avatar", ""))
        }

    except Exception as e:
        print(f"Error updating profile: {str(e)}")
        raise HTTPException(status_code=500, detail=str(e))

@app.get("/api/search-nfts")
async def search_nfts(query: str = ""):
    try:
        # Giới hạn tối đa 50 NFT được duyệt
        nfts = list(nft_collection.find({"is_listed": True}).limit(50))
        results = []

        async def fetch_metadata(nft, session):
            try:
                if not nft.get("metadataUri"):
                    return None
                http_url = nft["metadataUri"].replace("ipfs://", "https://ipfs.io/ipfs/")
                timeout = aiohttp.ClientTimeout(total=3)  # ⏳ Timeout 3 giây
                async with session.get(http_url, timeout=timeout) as response:
                    if response.status == 200:
                        metadata = await response.json()
                        if query.lower() in metadata.get("name", "").lower():
                            return {
                                "tokenId": nft["tokenId"],
                                "price": nft.get("price", 0),
                                "views": nft.get("views", 0),
                                "metadataUri": nft["metadataUri"],
                                "name": metadata.get("name", "Unnamed NFT"),
                                "image": metadata.get("image", "").replace("ipfs://", "https://ipfs.io/ipfs/"),
                            }
            except Exception as e:
                print(f"Error fetching metadata for NFT {nft.get('tokenId')}: {str(e)}")
            return None

        async with aiohttp.ClientSession() as session:
            tasks = [fetch_metadata(nft, session) for nft in nfts]
            results = await asyncio.gather(*tasks)
            results = [r for r in results if r is not None]
            return results
    except Exception as e:
        print(f"Search error: {str(e)}")
        raise HTTPException(status_code=500, detail=str(e))

@app.get("/api/search-users")
async def search_users(query: str = ""):
    try:
        if not query:
            return []
        
        # 🛑 Giới hạn kết quả (tối đa 20)
        users = list(
            collection.find(
                {
                    "$or": [
                        {"username": {"$regex": query, "$options": "i"}},
                        {"walletAddress": {"$regex": query, "$options": "i"}},
                    ]
                }
            ).limit(20)
        )

        formatted_users = [
            {
                "id": str(user.get("_id")),
                "username": user.get("username", "Unknown"),
                "walletAddress": user.get("walletAddress", ""),
                "avatar": user.get("avatar", ""),
            }
            for user in users
        ]
        return formatted_users
    except Exception as e:
        print(f"Search users error: {str(e)}")
        raise HTTPException(status_code=500, detail=str(e))


@app.get("/api/carousel-nfts")
async def get_carousel_nfts():
    try:
        carousel_nfts = list(
            nft_collection.find({"is_listed": True}).sort("views", -1).limit(3)
        )
        formatted_nfts = []
        for nft in carousel_nfts:
            try:
                owner = collection.find_one(
                    {"walletAddress": nft.get("walletAddress", "").lower()}
                )
                http_url = nft["metadataUri"].replace(
                    "ipfs://", "https://ipfs.io/ipfs/"
                )
                async with aiohttp.ClientSession() as session:
                    async with session.get(http_url) as response:
                        if response.status == 200:
                            metadata = await response.json()
                            formatted_nft = {
                                "tokenId": nft["tokenId"],
                                "price": nft.get("price", 0),
                                "views": nft.get("views", 0),
                                "name": metadata.get("name", "Unnamed NFT"),
                                "description": metadata.get("description", ""),
                                "image": metadata.get("image", "").replace(
                                    "ipfs://", "https://ipfs.io/ipfs/"
                                ),
                                "owner": {
                                    "address": owner.get("walletAddress")
                                    if owner
                                    else "Unknown",
                                    "username": owner.get("username")
                                    if owner
                                    else "Unknown",
                                    "avatar": owner.get(
                                        "avatar", "../assets/placeholder.jpg"
                                    )
                                    if owner
                                    else "../assets/placeholder.jpg",
                                    "verified": owner.get("verified", False)
                                    if owner
                                    else False,
                                },
                            }
                            formatted_nfts.append(formatted_nft)
            except Exception as e:
                print(f"Error processing NFT {nft.get('tokenId')}: {str(e)}")
                continue
        return formatted_nfts
    except Exception as e:
        print(f"Error getting carousel NFTs: {str(e)}")
        raise HTTPException(status_code=500, detail=str(e))

@app.get("/api/user/{wallet_address}")
async def get_user_info(wallet_address: str):
    user = collection.find_one({"walletAddress": wallet_address.lower()})
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    return {
        "username": user.get("username", "Unknown"),
        "walletAddress": user["walletAddress"],
        "avatar": user.get("avatar", ""),
        "bio": user.get("bio", "")
    }

# Thêm endpoint này vào sau endpoint /api/generate-art
@app.post("/api/generate-video")
async def generate_video_endpoint(request: GenerateVideoRequest):
    try:
        # Đảm bảo inference steps chỉ nhận các giá trị hợp lệ
        valid_steps = [1, 2, 4, 8]
        if request.num_inference_steps not in valid_steps:
            request.num_inference_steps = 4  # giá trị mặc định
        
        # Giới hạn guidance_scale từ 1.0 đến 10.0
        guidance_scale = max(1.0, min(10.0, request.guidance_scale))
        
        video_base64 = generate_video(
            num_inference_steps=request.num_inference_steps,
            guidance_scale=guidance_scale,
            user_prompt=request.user_prompt,
        )
        
        response_data = {"video": f"data:video/mp4;base64,{video_base64}"}
        return response_data
    except Exception as e:
        print("Error occurred:", str(e))
        raise HTTPException(status_code=500, detail=str(e))
    
# Start the server
if __name__ == "__main__":
    current_dir = os.path.dirname(os.path.abspath(__file__))
    os.chdir(current_dir)
    uvicorn.run(app, host="0.0.0.0", port=8000)
