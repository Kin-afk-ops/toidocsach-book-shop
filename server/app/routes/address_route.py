from flask import Blueprint, request, jsonify
from app.utils.jwt_helper import require_user

from app.services.address_service import (
    create_address,
    get_addresses,
    get_address_by_id,
    update_address,
    delete_address,
)

address_route = Blueprint("address_route", __name__)

# Create address
@address_route.route("/address/<uuid:user_id>", methods=["POST"])
@require_user
def create(user_id):
    data = request.json
    result, status = create_address(data, user_id)
    return jsonify(result), status

# Get all addresses by user
@address_route.route("/address/<uuid:user_id>", methods=["GET"])
def get_all(user_id):
    result, status = get_addresses(user_id)
    return jsonify(result), status

# Get address by ID
@address_route.route("/address/<uuid:user_id>/<uuid:address_id>", methods=["GET"])
@require_user
def get_one(user_id, address_id):
    result, status = get_address_by_id(user_id, address_id)
    return jsonify(result), status

# Update address
@address_route.route("/address/<uuid:user_id>/<uuid:address_id>", methods=["PUT"])
@require_user
def update(user_id, address_id):
    data = request.json
    result, status = update_address(user_id, address_id, data)
    return jsonify(result), status

# Delete address
@address_route.route("/address/<uuid:user_id>/<uuid:address_id>", methods=["DELETE"])
def delete(user_id, address_id):
    result, status = delete_address(user_id, address_id)
    return jsonify(result), status
