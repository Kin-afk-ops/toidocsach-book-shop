from flask import Blueprint, request,jsonify
from app.services.auth_service import register_user_service,login_user_service
from flask_jwt_extended import create_access_token,set_access_cookies,get_jwt_identity,get_jwt,unset_jwt_cookies,jwt_required

auth_route = Blueprint("auth", __name__, url_prefix="/auth")

@auth_route.route("/register", methods=["POST"])
def register_user():
    data = request.get_json()
    email = data.get("email")
    password = data.get("password")
    otp = data.get("otp")
    return register_user_service(email, password, otp)


@auth_route.route("/login", methods=["POST"])
def login_user():
    data = request.get_json()
    if not data:
        return jsonify({"msg": "Missing JSON in request"}), 400

    result, error = login_user_service(data)
    if error:
        return jsonify({"msg": error}), 401
    return result 



@auth_route.route('/token/refresh', methods=['POST'])
@jwt_required(refresh=True)

def refresh():

    current_user = get_jwt_identity()
    
    # Bạn có thể lấy thêm thông tin role từ JWT claims nếu cần
    claims = get_jwt()
    role = claims.get("role", "user")  # hoặc mặc định là "user"

    new_access_token = create_access_token(identity=current_user, additional_claims={"role": role})
    
    resp = jsonify({"refresh": True, "msg": "Access token refreshed successfully"})
    set_access_cookies(resp, new_access_token)
    return resp, 200