from flask_jwt_extended import jwt_required, get_jwt
from functools import wraps
from flask import jsonify

def require_user(fn):
    @wraps(fn)
    @jwt_required()
    def wrapper(*args, **kwargs):
        claims = get_jwt()
        print(f"[DEBUG] JWT Claims: {claims}")

        user_id = claims.get("sub")  # "sub" là claim mặc định khi tạo JWT (thường lưu user_id)
        if not user_id:
            return jsonify({"msg": "Invalid token"}), 401

        # Gắn user_id vào kwargs để route sử dụng
        kwargs["jwt_user_id"] = user_id
        return fn(*args, **kwargs)
    return wrapper
