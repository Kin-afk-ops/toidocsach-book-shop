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
    cart = get_cart_by_user(user_id)

    # Kiểm tra book có tồn tại không
    book = BookItem.query.get(book_id)
    if not book:
        return {"error": "Book not found"}, 404

    # Kiểm tra item đã có trong cart chưa
    item = CartItem.query.filter_by(cart_id=cart.id, book_id=book_id).first()
    if item:
        item.quantity += quantity
    else:
        item = CartItem(cart_id=cart.id, book_id=book_id, quantity=quantity)
        db.session.add(item)

    db.session.commit()
    return cart.to_dict(), 200


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
    cart = get_cart_by_user(user_id)
    item = CartItem.query.filter_by(cart_id=cart.id, book_id=book_id).first()
    if not item:
        return {"error": "Item not found in cart"}, 404

    db.session.delete(item)
    db.session.commit()
    return cart.to_dict(), 200


def clear_cart(user_id):
    cart = get_cart_by_user(user_id)
    for item in cart.items:
        db.session.delete(item)
    db.session.commit()
    return {"message": "Cart cleared"}, 200
