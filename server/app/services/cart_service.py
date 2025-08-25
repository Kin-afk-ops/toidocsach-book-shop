from app.extensions import db
from app.models.cart_model import Cart, CartItem
from app.models.book_item_model import BookItem


def get_cart_by_user(user_id):
    cart = Cart.query.filter_by(user_id=user_id).first()
    if not cart:
        cart = Cart(user_id=user_id)
        db.session.add(cart)
        db.session.commit()
    return cart.to_dict(include_items=True)

def add_to_cart(user_id, book_id, quantity=1):
    # Lấy cart từ db (SQLAlchemy model)
    cart = Cart.query.filter_by(user_id=user_id).first()
    if not cart:
        # tạo mới nếu chưa có
        cart = Cart(user_id=user_id)
        db.session.add(cart)
        db.session.commit()

    # Giữ cart là model instance, không chuyển sang dict
    item = CartItem.query.filter_by(cart_id=cart.id, book_id=book_id).first()
    if item:
        item.quantity += quantity
    else:
        item = CartItem(cart_id=cart.id, book_id=book_id, quantity=quantity)
        db.session.add(item)

    db.session.commit()
    return cart.to_dict(include_items=True), 200

def update_cart_item(user_id, book_id, quantity):
    cart = get_cart_by_user(user_id)
    item = CartItem.query.filter_by(cart_id=cart.id, book_id=book_id).first()
    if not item:
        return {"error": "Item not found in cart"}, 404

    if quantity <= 0:
        db.session.delete(item)
    else:
        item.quantity = quantity

    db.session.commit()
    return cart.to_dict(), 200


def remove_from_cart(user_id, book_id):
    cart = Cart.query.filter_by(user_id=user_id).first()
    if not cart:
        return {"message": "Cart not found"}, 404
    item = CartItem.query.filter_by(cart_id=cart.id, book_id=book_id).first()
    if not item:
        return {"error": "Item not found in cart"}, 404

    db.session.delete(item)
    db.session.commit()
    return {"message": "Item removed successfully"}, 200


def clear_cart(user_id):
    cart = get_cart_by_user(user_id)
    for item in cart.items:
        db.session.delete(item)
    db.session.commit()
    return {"message": "Cart cleared"}, 200
