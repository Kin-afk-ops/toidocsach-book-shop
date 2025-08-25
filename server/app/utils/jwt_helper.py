# app/utils/decorators.py
from functools import wraps
from flask_jwt_extended import verify_jwt_in_request, get_jwt_identity
from flask import abort

def require_user(fn):
    """
    Decorator tự động lấy user_id từ JWT và truyền vào route handler
    """
    @wraps(fn)
    def wrapper(*args, **kwargs):
        # Xác thực JWT
        verify_jwt_in_request()
        user_id = get_jwt_identity()  # Lấy từ access token
        # Inject vào kwargs
        kwargs["user_id"] = user_id
        return fn(*args, **kwargs)
    return wrapper
