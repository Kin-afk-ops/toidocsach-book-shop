from flask import Blueprint, request, jsonify
from app.services.category_service import (
    create_category_service,
    get_all_categories_service,
    get_category_service,
    update_category_service,
    delete_category_service,
)

category_route = Blueprint("category", __name__, url_prefix="/categories")


@category_route.route("", methods=["POST"])
def create_category():
    data = request.get_json()
    resp, status = create_category_service(data)
    return jsonify(resp), status


@category_route.route("", methods=["GET"])
def get_all_categories():
    resp, status = get_all_categories_service()
    return jsonify(resp), status


@category_route.route("/<uuid:category_id>", methods=["GET"])
def get_category(category_id):
    resp, status = get_category_service(category_id)
    return jsonify(resp), status


@category_route.route("/<uuid:category_id>", methods=["PUT"])
def update_category(category_id):
    data = request.get_json()
    resp, status = update_category_service(category_id, data)
    return jsonify(resp), status


@category_route.route("/<uuid:category_id>", methods=["DELETE"])
def delete_category(category_id):
    resp, status = delete_category_service(category_id)
    return jsonify(resp), status
