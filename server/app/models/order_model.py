import uuid
from datetime import datetime
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy import ForeignKey, Integer, Numeric, String
from sqlalchemy.orm import relationship
from app.extensions import db

class Order(db.Model):
    __tablename__ = "orders"

    id = db.Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    user_id = db.Column(UUID(as_uuid=True), ForeignKey("users.id", ondelete="CASCADE"), nullable=False)
    amount = db.Column(Numeric(), nullable=False, default=0)
    status = db.Column(String(50), default="pending")  # pending, processing, completed, cancelled

    # Người nhận hàng
    fullname = db.Column(String(100), nullable=False)   # tên người nhận
    phone = db.Column(String(20), nullable=False)       # số điện thoại
    note = db.Column(String(255), nullable=True)        # ghi chú đơn hàng (optional)

    # Địa chỉ giao hàng
    country = db.Column(String(100), nullable=False)
    province = db.Column(String(100), nullable=True)
    ward = db.Column(String(100), nullable=True)
    address = db.Column(String(255), nullable=False)
    payment_method = db.Column(String(255), nullable=False)

    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    updated_at = db.Column(db.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)

    items = relationship("OrderItem", back_populates="order", cascade="all, delete-orphan")

    def to_dict(self, include_items=False):
        data = {
            "id": str(self.id),
            "user_id": str(self.user_id),
            "amount": float(self.amount),
            "status": self.status,
            "fullname": self.fullname,
            "phone": self.phone,
            "note": self.note,
            "country": self.country,
            "province": self.province,
            "ward": self.ward,
            "address": self.address,
            "created_at": self.created_at.isoformat(),
            "updated_at": self.updated_at.isoformat(),
        }
        if include_items:
            data["items"] = [item.to_dict(include_book=True) for item in self.items]
        return data


class OrderItem(db.Model):
    __tablename__ = "order_items"

    id = db.Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    order_id = db.Column(UUID(as_uuid=True), ForeignKey("orders.id", ondelete="CASCADE"), nullable=False)
    book_id = db.Column(UUID(as_uuid=True), ForeignKey("book_items.id", ondelete="CASCADE"), nullable=False)
    quantity = db.Column(Integer, default=1)
    price = db.Column(Numeric(10, 2), nullable=False)  # Giá tại thời điểm đặt hàng

    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    updated_at = db.Column(db.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)

    order = relationship("Order", back_populates="items")
    book_item = relationship("BookItem")

    def to_dict(self, include_book=False):
        data = {
            "id": str(self.id),
            "order_id": str(self.order_id),
            "book_id": str(self.book_id),
            "quantity": self.quantity,
            "price": float(self.price),
            "created_at": self.created_at.isoformat(),
            "updated_at": self.updated_at.isoformat(),
        }
        if include_book and self.book_item:
            data["book"] = self.book_item.to_dict(include_detail=True)
        return data
