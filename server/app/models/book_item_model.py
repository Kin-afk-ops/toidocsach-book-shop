import uuid
from datetime import datetime
from sqlalchemy.dialects.postgresql import UUID, JSONB
from sqlalchemy.orm import relationship

from sqlalchemy import Text,ForeignKey
from app.extensions import db

class BookItem(db.Model):
    __tablename__ = 'book_items'

    id = db.Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    title = db.Column(Text, nullable=False)  # Không giới hạn độ dài
    
    # Hình ảnh: lưu URL và public_id từ Cloudinary, nhiều ảnh dùng ARRAY
    images = db.Column(JSONB, nullable=True)

    price = db.Column(db.Float, nullable=False)
    discount = db.Column(db.Float, default=0.0)  # đơn vị %

    quantity = db.Column(db.Integer, default=0)   # Số lượng còn lại
    sold_count = db.Column(db.Integer, default=0) # Số lượng đã bán


    category_id = db.Column(UUID(as_uuid=True), ForeignKey("categories.id", ondelete="SET NULL"), nullable=True)
    category = relationship("Category", backref="books")

    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    updated_at = db.Column(db.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)
    detail = relationship("BookDetail", back_populates="book_item", uselist=False, cascade="all, delete-orphan")

    def to_dict(self, include_detail: bool = False, include_category: bool = True):
        data = {
            "id": str(self.id),
            "title": self.title,
            "images": self.images,
            "price": self.price,
            "discount": self.discount,
            "quantity": self.quantity,
            "sold_count": self.sold_count,
            "created_at": self.created_at.isoformat(),
            "updated_at": self.updated_at.isoformat(),
        }

        if include_detail and self.detail:
            data["detail"] = self.detail.to_dict()

        if include_category and self.category:
            data["category"] = self.category.to_dict()

        return data
        