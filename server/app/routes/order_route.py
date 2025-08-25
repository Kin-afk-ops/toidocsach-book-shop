from flask import Blueprint, request, jsonify
from app.utils.jwt_helper import require_user

from app.services.order_service import (
    get_orders_by_user,
    get_order_by_id,
    checkout_cart,
    update_order_status
)

order_route = Blueprint("order_route", __name__)


@order_route.route("/order/<uuid:user_id>", methods=["GET"])
@require_user
def get_orders(user_id):
    orders = get_orders_by_user(user_id)
    return jsonify(orders), 200


@order_route.route("/order/<uuid:order_id>", methods=["GET"])
def get_order(order_id):
    order = get_order_by_id(order_id)
    if not order:
        return jsonify({"error": "Order not found"}), 404
    return jsonify(order), 200


@order_route.route("/order/<uuid:user_id>/checkout", methods=["POST"])
@require_user
def checkout(user_id):
    """
    Client gửi JSON:
    {
        "items": [
            {"book_id": "uuid1", "quantity": 2},
            {"book_id": "uuid2", "quantity": 1}
        ]
    }
    """
    data = request.get_json()
    client_items = data.get("items", [])

    order, status = checkout_cart(user_id, client_items)
    return jsonify(order), status


@order_route.route("/order/<uuid:order_id>/status", methods=["PUT"])
@require_user
def update_status(order_id):
    data = request.get_json()
    status_value = data.get("status")
    order, status = update_order_status(order_id, status_value)
    return jsonify(order), status
