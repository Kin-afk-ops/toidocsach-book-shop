from app.extensions import db
from app.models.cart_model import Cart, CartItem
from app.models.order_model import Order, OrderItem
from app.models.book_item_model import BookItem


def get_orders_by_user(user_id):
    orders = Order.query.filter_by(user_id=user_id).all()
    return [order.to_dict(include_items=True) for order in orders]


def get_order_by_id(order_id):
    order = Order.query.get(order_id)
    if not order:
        return None
    return order.to_dict(include_items=True)


def checkout_cart(user_id, client_items):
  
    if not client_items:
        return {"error": "No items to checkout"}, 400

    cart = Cart.query.filter_by(user_id=user_id).first()
    if not cart or not cart.items:
        return {"error": "Cart is empty"}, 400

    order = Order(user_id=user_id)
    total_amount = 0

    # Duyệt các item client muốn checkout
    for item_data in client_items:
        book_id = item_data.get("book_id")
        quantity = item_data.get("quantity", 1)

        # Kiểm tra item trong cart
        cart_item = CartItem.query.filter_by(cart_id=cart.id, book_id=book_id).first()
        if not cart_item:
            continue  # bỏ qua item không tồn tại trong cart

        book = cart_item.book_item
        if not book:
            continue

        # Giới hạn quantity <= số lượng trong cart
        quantity = min(quantity, cart_item.quantity)

        order_item = OrderItem(
            book_id=book.id,
            quantity=quantity,
            price=book.price
        )
        order.items.append(order_item)
        total_amount += float(book.price) * quantity

        # Cập nhật cart: trừ số lượng đã checkout
        cart_item.quantity -= quantity
        if cart_item.quantity <= 0:
            db.session.delete(cart_item)

    order.amount = total_amount

    db.session.add(order)
    db.session.commit()

    # Nếu cart rỗng sau checkout, xóa cart
    if not cart.items:
        db.session.delete(cart)
        db.session.commit()

    return order.to_dict(include_items=True), 200



def update_order_status(order_id, status_value):
    order = Order.query.get(order_id)
    if not order:
        return {"error": "Order not found"}, 404

    order.status = status_value
    db.session.commit()
    return order.to_dict(include_items=True), 200
