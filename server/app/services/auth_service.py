from werkzeug.security import generate_password_hash,check_password_hash
from flask import jsonify
from flask_jwt_extended import create_access_token,set_access_cookies,create_refresh_token,set_refresh_cookies,get_jwt_identity
from app.models.user_model import User
from app import db
from app.extensions import redis_client

def register_user_service(email, password, otp):
    if not email or not password or not otp:
        return {"error": "Thiếu email, password hoặc otp"}, 400

    # check OTP trong redis
    saved_otp = redis_client.get(f"otp:{email}")
    if not saved_otp:
        return {"error": "OTP hết hạn hoặc không tồn tại"}, 400
    if otp != saved_otp:
        return {"error": "OTP không đúng"}, 400

    # check trùng user
    if User.query.filter_by(email=email).first():
        return {"error": "User đã tồn tại"}, 409

    hashed_password = generate_password_hash(password)
    new_user = User(email=email, password=hashed_password)

    db.session.add(new_user)
    db.session.commit()

    # xoá OTP khi đã dùng
    redis_client.delete(f"otp:{email}")

    return {
        "message": "Đăng ký user thành công",
        "user": {"id": new_user.id, "email": new_user.email}
    }, 201



def login_user_service(data):
    email = data.get("email")
    password = data.get("password")

    if not email or not password:
        return None, "Email and password are required"

    user = User.query.filter_by(email=email).first()

    if not user:
        return None, "User not found"

    if not check_password_hash(user.password, password):
        return None, "Invalid password"
    # additional_claims = {"role": admin.role}
    access_token = create_access_token(identity=str(user.id),)
    refresh_token = create_refresh_token(identity=str(user.id))
   
    resp = jsonify({
        "id": user.id,
        "email": user.email,
    })
    set_access_cookies(resp, access_token)
    set_refresh_cookies(resp, refresh_token)

    return resp, None



def recovery_password_service(email, otp, new_password):
    if not email or not otp or not new_password:
        return {"error": "Thiếu email, otp hoặc mật khẩu mới"}, 400

    # Kiểm tra OTP trong Redis
    saved_otp = redis_client.get(f"otp:{email}")
    if not saved_otp:
        return {"error": "OTP hết hạn hoặc không tồn tại"}, 400
    if otp != saved_otp:
        return {"error": "OTP không đúng"}, 400

    # Kiểm tra user tồn tại
    user = User.query.filter_by(email=email).first()
    if not user:
        return {"error": "User không tồn tại"}, 404

    # Cập nhật mật khẩu mới
    hashed_password = generate_password_hash(new_password)
    user.password = hashed_password
    db.session.commit()

    # Xoá OTP sau khi dùng
    redis_client.delete(f"otp:{email}")

    return {"message": "Đổi mật khẩu thành công"}, 200