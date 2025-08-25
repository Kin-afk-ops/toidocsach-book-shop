from flask import Blueprint, request,jsonify
from app.services.user_service import delete_user_service

user_route = Blueprint("user", __name__, url_prefix="/user")

@user_route.route("/delete/<uuid:user_id>", methods=["DELETE"])
def delete_user(user_id):
    try:
        result = delete_user_service(user_id)
        if result["success"]:
            return jsonify({"message": "User deleted successfully"}), 200
        else:
            return jsonify({"error": result["error"]}), 400
    except Exception as e:
        return jsonify({"error": str(e)}), 500

