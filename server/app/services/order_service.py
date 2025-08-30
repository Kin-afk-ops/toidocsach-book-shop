from app.extensions import db
from app.models.cart_model import Cart, CartItem
from app.models.order_model import Order, OrderItem
from app.models.book_item_model import BookItem
from app.utils.send_email import send_email


def get_orders_by_user(user_id, page=1, per_page=10):
    # Sử dụng paginate của Flask-SQLAlchemy
    pagination = Order.query.filter_by(user_id=user_id)\
        .order_by(Order.created_at.desc())\
        .paginate(page=page, per_page=per_page, error_out=False)

    orders = [order.to_dict(include_items=True) for order in pagination.items]

    return {
        "orders": orders,
        "current_page": pagination.page,
        "total_page": pagination.pages,
    }


def get_order_by_id(order_id):
    order = Order.query.get(order_id)
    if not order:
        return None
    return order.to_dict(include_items=True)




def send_order_confirmation_email(order,email):
    """
    Gửi email xác nhận đơn hàng
    """
    subject = f"Xác nhận đơn hàng #{order.id} - Toidocsach Shop"

    # Build HTML body
    items_html = ""
    for item in order.items:
        discount = getattr(item, "discount", 0)  # nếu item không có discount thì = 0
        final_price = item.price - (item.price * discount) / 100
        items_html += f"<li>{item.book_item.title} x {item.quantity} - {final_price}₫</li>"

    body_html = f"""    
    <html>
      <body style="font-family: Arial, sans-serif; line-height: 1.6;">
        <h2 style="color: #2c3e50;">Xác nhận đơn hàng</h2>
        <p>Xin chào <strong>{order.fullname}</strong>,</p>
        <p>Cảm ơn bạn đã đặt hàng tại <strong>Book Shop</strong>. Chi tiết đơn hàng của bạn như sau:</p>
        <ul>
          {items_html}
        </ul>
        <p><strong>Tổng tiền: {order.amount}₫</strong></p>
        <p>Địa chỉ giao hàng:</p>
        <p>{order.address}, {order.ward}, {order.province}, {order.country}</p>
        <p>Ghi chú: {order.note or "Không có"}</p>
        <p>Trạng thái đơn hàng: Đang xử lý</p>
        <hr style="margin:20px 0;">
        <p>Trân trọng,<br><strong>Book Shop Team</strong></p>
      </body>
    </html>
    """

    send_email(email, subject, body_html)

def checkout_cart(user_id, client_items, receiver_data, address_data,email):
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

        # Chỉ lấy số lượng còn lại trong giỏ nếu client gửi nhiều hơn
        quantity = min(quantity, cart_item.quantity)

        # Tính giá sau discount
        final_price = book.price - (book.price * book.discount / 100) if book.discount else book.price

        # Tạo order item với giá đã tính
        order_item = OrderItem(
            book_id=book.id,
            quantity=quantity,
            price=final_price
        )
        order.items.append(order_item)

        # Cộng tổng amount
        total_amount += final_price * quantity

        # Trừ số lượng trong giỏ và xóa nếu hết
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

   # Gửi email xác nhận đơn hàng
    try:
        send_order_confirmation_email(order,email)
    except Exception as e:
        print("Gửi email xác nhận đơn hàng thất bại:", e)

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
