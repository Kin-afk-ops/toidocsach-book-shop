from flask import Blueprint, request, jsonify
from app.utils.jwt_helper import require_user

from app.services.cart_service import (
    get_cart_by_user,
    add_to_cart,
    update_cart_item,
    remove_from_cart,
    clear_cart,
)

cart_route = Blueprint("cart_route", __name__)


@cart_route.route("/cart/<uuid:user_id>", methods=["GET"])
@require_user
def get_cart(user_id):
    cart = get_cart_by_user(user_id)
    return jsonify(cart), 200


@cart_route.route("/cart/<user_id>/add", methods=["POST"])
@require_user
def add_item(user_id):
    data = request.get_json()
    book_id = data.get("book_id")
    quantity = data.get("quantity", 1)

    result, status = add_to_cart(user_id, book_id, quantity)
    return jsonify(result), status


@cart_route.route("/cart/<uuid:user_id>/update", methods=["PUT"])
@require_user
def update_item(user_id):
    data = request.get_json()
    book_id = data.get("book_id")
    quantity = data.get("quantity")

    result, status = update_cart_item(user_id, book_id, quantity)
    return jsonify(result), status


@cart_route.route("/cart/<uuid:user_id>/remove", methods=["DELETE"])
@require_user
def remove_item(user_id):
    book_id = request.args.get("book_id")

    result, status = remove_from_cart(user_id, book_id)
    return jsonify(result), status


@cart_route.route("/cart/<user_id>/clear", methods=["DELETE"])
@require_user
def clear(user_id):
    result, status = clear_cart(user_id)
    return jsonify(result), status
