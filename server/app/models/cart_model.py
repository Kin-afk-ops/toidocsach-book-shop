import uuid
from datetime import datetime
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy import ForeignKey, Integer
from sqlalchemy.orm import relationship
from app.extensions import db


class Cart(db.Model):
    __tablename__ = "carts"

    id = db.Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    user_id = db.Column(UUID(as_uuid=True), ForeignKey("users.id", ondelete="CASCADE"), unique=True, nullable=False)

    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    updated_at = db.Column(db.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)

    # Quan hệ: 1 cart có nhiều cart_items
    items = relationship("CartItem", back_populates="cart", cascade="all, delete-orphan")

    def to_dict(self, include_items=False):
        data = {
            "id": str(self.id),
            "user_id": str(self.user_id),
            "created_at": self.created_at.isoformat(),
            "updated_at": self.updated_at.isoformat(),
        }
        if include_items:
            data["items"] = [item.to_dict(include_book=True) for item in self.items]
        return data


class CartItem(db.Model):
    __tablename__ = "cart_items"

    id = db.Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    cart_id = db.Column(UUID(as_uuid=True), ForeignKey("carts.id", ondelete="CASCADE"))
    book_id = db.Column(UUID(as_uuid=True), ForeignKey("book_items.id", ondelete="CASCADE"))
    quantity = db.Column(Integer, default=1)

    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    updated_at = db.Column(db.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)

    cart = relationship("Cart", back_populates="items")
    book_item = relationship("BookItem")

    def to_dict(self, include_book=False):
        data = {
            "id": str(self.id),
            "cart_id": str(self.cart_id),
            "book_id": str(self.book_id),
            "quantity": self.quantity,
            "created_at": self.created_at.isoformat(),
            "updated_at": self.updated_at.isoformat(),
        }
        if include_book and self.book_item:
            data["book"] = self.book_item.to_dict(include_detail=True)
        return data
