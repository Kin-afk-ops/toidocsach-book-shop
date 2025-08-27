from app.extensions import db
from app.models.cart_model import Cart, CartItem
from app.models.order_model import Order, OrderItem
from app.models.book_item_model import BookItem


def get_orders_by_user(user_id):
    orders = Order.query.filter_by(user_id=user_id).order_by(Order.created_at.desc()).all()
    return [order.to_dict(include_items=True) for order in orders]


def get_order_by_id(order_id):
    order = Order.query.get(order_id)
    if not order:
        return None
    return order.to_dict(include_items=True)


def checkout_cart(user_id, client_items, receiver_data, address_data):
    if not client_items:
        return {"error": "No items to checkout"}, 400

    cart = Cart.query.filter_by(user_id=user_id).first()
    if not cart or not cart.items:
        return {"error": "Cart is empty"}, 400

    # Tạo order kèm thông tin người nhận + địa chỉ
    order = Order(
        user_id=user_id,
        fullname=receiver_data.get("fullname"),
        phone=receiver_data.get("phone"),
        note=receiver_data.get("note"),
        payment_method=receiver_data.get("payment_method"),
        country=address_data.get("country", "Vietnam"),
        province=address_data.get("province"),
        ward=address_data.get("ward"),
        address=address_data.get("address"),
        status="pending"
    )

    total_amount = 0

    for item_data in client_items:
        book_id = item_data.get("book_id")
        quantity = item_data.get("quantity", 1)

        cart_item = CartItem.query.filter_by(cart_id=cart.id, book_id=book_id).first()
        if not cart_item:
            continue

        book = cart_item.book_item
        if not book:
            continue

        quantity = min(quantity, cart_item.quantity)

        order_item = OrderItem(
            book_id=book.id,
            quantity=quantity,
            price=book.price
        )
        order.items.append(order_item)
        total_amount += float(book.price) * quantity

        cart_item.quantity -= quantity
        if cart_item.quantity <= 0:
            db.session.delete(cart_item)

    order.amount = total_amount
    db.session.add(order)
    db.session.commit()

    if not cart.items:
        db.session.delete(cart)
        db.session.commit()
        current_cart = None
    else:
        current_cart = cart.to_dict(include_items=True)


    return {
        "message": "Đã tạo đơn hàng thành công",
        "cart": current_cart
    }, 200


def update_order_status(order_id, status_value):
    order = Order.query.get(order_id)
    if not order:
        return {"error": "Order not found"}, 404

    order.status = status_value
    db.session.commit()
    return order.to_dict(include_items=True), 200



def update_order_canceled_status(order_id, user_id):
    order = Order.query.get(order_id)
    if not order:
        return {"error": "Order not found"}, 404

    # Kiểm tra đơn hàng có thuộc user_id này không (bảo mật)
    if str(order.user_id) != str(user_id):
        return {"error": "Permission denied"}, 403

    # Cập nhật trạng thái thành canceled
    order.status = "cancelled"
    db.session.commit()

    # Lấy danh sách orders mới của user (không bao gồm order_id này)
    orders = (
        Order.query.filter(Order.user_id == user_id, Order.id != order_id)
        .all()
    )

    return [o.to_dict(include_items=True) for o in orders], 200
