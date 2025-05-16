import os
import json
import re
import numpy as np

# Load từ khóa từ file JSON (giả sử file keywords.json nằm cùng thư mục với chatbot_logic.py)
KEYWORDS_FILE = os.path.join(os.path.dirname(__file__), "keywords.json")
with open(KEYWORDS_FILE, "r", encoding="utf-8") as f:
    KEYWORDS = json.load(f)

def search_nfts_by_price(message, nft_collection):
    """
    Tìm NFT theo mức giá.
    """
    m = message.lower()
    # Dùng từ khóa từ file JSON
    below_keywords = KEYWORDS.get("price_below", [])
    above_keywords = KEYWORDS.get("price_above", [])
    
    is_below = any(keyword in m for keyword in below_keywords)
    is_above = any(keyword in m for keyword in above_keywords)
    
    if not is_below and not is_above:
        return "⚠ Không tìm thấy từ khóa giá phù hợp trong yêu cầu của bạn."
    
    num_match = re.search(r"(\d+(\.\d+)?)", m)
    if not num_match:
        return "⚠ Không tìm thấy số mức giá trong yêu cầu của bạn."
    
    try:
        price_limit = float(num_match.group(1))
    except Exception as e:
        return f"⚠ Lỗi chuyển đổi số: {e}"
    
    if is_below:
        nfts = list(nft_collection.find({"price": {"$lt": price_limit}}))
        if not nfts:
            return f"⚠ Không tìm thấy NFT nào có giá dưới {price_limit} TIA."
    elif is_above:
        nfts = list(nft_collection.find({"price": {"$gt": price_limit}}))
        if not nfts:
            return f"⚠ Không tìm thấy NFT nào có giá trên {price_limit} TIA."
    
    nft_list = [{"tokenId": nft.get("tokenId", "N/A"),
                 "metadataUri": nft.get("metadataUri", ""),
                 "price": nft.get("price", "N/A")} for nft in nfts]
    
    return {"nfts": nft_list}

def vector_search(query, model, index, nft_collection, k=5):
    """
    Tìm kiếm NFT dựa trên nội dung truy vấn sử dụng FAISS.
    """
    if not query:
        return "Vui lòng cung cấp từ khoá tìm kiếm."
    
    try:
        query_vec = model.encode([query])
    except Exception as e:
        return f"Lỗi khi mã hóa truy vấn: {e}"
    
    try:
        distances, indices = index.search(np.array(query_vec, dtype=np.float32), k=k)
    except Exception as e:
        return f"Lỗi khi thực hiện tìm kiếm trong FAISS: {e}"
    
    if indices[0][0] == -1:
        return "⚠ Không tìm thấy kết quả phù hợp."
    
    nft_ids = [int(idx) for idx in indices[0] if idx != -1]
    if not nft_ids:
        return "⚠ Không tìm thấy NFT nào phù hợp."
    
    try:
        matched_nfts = list(nft_collection.find(
            {"tokenId": {"$in": nft_ids}},
            {"_id": 0, "tokenId": 1, "metadataUri": 1, "price": 1}
        ))
    except Exception as e:
        return f"Lỗi khi truy xuất dữ liệu NFT từ cơ sở dữ liệu: {e}"
    
    if not matched_nfts:
        return "⚠ Không tìm thấy NFT nào phù hợp sau khi truy vấn cơ sở dữ liệu."
    
    return {"nfts": matched_nfts}

def process_message(message: str, model, index, nft_collection, selenium_utils=None) -> str:
    """
    Xử lý tin nhắn của người dùng dựa trên danh sách từ khóa.
    """
    message = message.lower().strip()
    
    if not message:
        return "Vui lòng nhập câu hỏi của bạn."
    
    # 1. Lời chào
    if any(greet in message for greet in KEYWORDS.get("greetings", [])):
        return ("Xin chào! Tôi có thể giúp gì cho bạn hôm nay? (Bạn có thể hỏi về NFT, giá, marketplace, tạo nghệ thuật, thông tin người dùng, báo cáo, v.v.)")
    
    # 2. Kiểm tra yêu cầu về danh sách users trong index
    if "trong trang index này có những user nào" in message:
        return "SHOW_TOP_ARTISTS"
    
    if "Vậy có user nào có số lượng nft trên 100 cái không" in message:
        return "Không có user nào thoả mãn điều kiện trên"
    
    # 3. Marketplace với yêu cầu search
    marketplace_keywords = KEYWORDS.get("marketplace", [])
    search_keywords = KEYWORDS.get("search", [])
    if any(word in message for word in marketplace_keywords) and any(word in message for word in search_keywords):
        try:
            # Lấy từ khoá tìm kiếm từ tin nhắn
            if "từ khoá" in message:
                keyword = message.split("từ khoá")[-1].strip()
            elif "search" in message:
                keyword = message.split("search")[-1].strip()
            elif "tìm kiếm" in message:
                keyword = message.split("tìm kiếm")[-1].strip()
            else:
                keyword = ""
            if not keyword:
                keyword = "CHECK"
            print(f"Đã trích xuất từ khoá: '{keyword}'")
            return f"REDIRECT:marketplace:search:{keyword}"
        except Exception as e:
            print(f"Lỗi xử lý tìm kiếm marketplace: {str(e)}")
            return "Xin lỗi, tôi không thể thực hiện tìm kiếm lúc này."
    
    # 4. Nếu chỉ nói "marketplace" mà không có yêu cầu search
    if any(word in message for word in marketplace_keywords):
        return "🔗 Đang mở trang Marketplace..."
    
    # 5. Tìm kiếm theo mức giá
    if any(word in message for word in KEYWORDS.get("price_below", [])) or \
       any(word in message for word in KEYWORDS.get("price_above", [])):
        return search_nfts_by_price(message, nft_collection)
    
    # 6. Tạo nghệ thuật
    if any(word in message for word in KEYWORDS.get("art", [])):
        return "Chức năng tạo nghệ thuật đang được xử lý, vui lòng chờ trong giây lát..."
    
    # 7. Tìm NFT theo từ khoá
    if any(word in message for word in KEYWORDS.get("nft_search", [])):
        return vector_search(message, model, index, nft_collection)
    
    # 8. Thông tin người dùng
    if any(word in message for word in KEYWORDS.get("user_info", [])):
        return "Chức năng tìm kiếm thông tin người dùng chưa được triển khai."
    
    # 9. Báo cáo, thống kê
    if any(word in message for word in KEYWORDS.get("report", [])):
        return "Chức năng báo cáo đang được cập nhật, vui lòng thử lại sau."
    
    # 10. Tạo NFT
    if any(word in message for word in KEYWORDS.get("create_nft", [])):
        return "Chức năng tạo NFT đang được xử lý, vui lòng chờ trong giây lát..."
    
    # 11. Trợ giúp, menu
    if any(word in message for word in KEYWORDS.get("help", [])):
        return (
            "Các lệnh có sẵn:\n"
            "- Marketplace: Mở trang Marketplace hoặc tìm kiếm NFT theo từ khoá.\n"
            "- Giá dưới/trên X TIA: Tìm NFT theo mức giá.\n"
            "- Tạo nghệ thuật: Sinh ảnh nghệ thuật từ mô tả.\n"
            "- Tìm NFT: Tìm NFT theo từ khoá (sử dụng vector search).\n"
            "- Tạo NFT: Tạo và đăng tải NFT (chưa triển khai).\n"
            "- Thông tin người dùng: Xem hồ sơ của người dùng (chưa triển khai).\n"
            "- Báo cáo: Xem thống kê, báo cáo (chưa triển khai).\n"
            "Ví dụ: 'marketplace search cho tôi từ khoá CHECK', 'giá dưới 0.3 TIA', 'tìm nft anime', v.v."
        )
    
    # 12. Fallback: nếu không nhận diện được, dùng vector search
    return vector_search(message, model, index, nft_collection)
