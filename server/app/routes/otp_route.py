from flask import Blueprint, request
from app.services.otp_service import generate_otp_service

otp_route = Blueprint("otp", __name__)

@otp_route.route("/auth/otp", methods=["POST"])
def otp():
    data = request.get_json()
    email = data.get("email")
    if not email:
        return {"error": "Thiếu email"}, 400
    return generate_otp_service(email)
