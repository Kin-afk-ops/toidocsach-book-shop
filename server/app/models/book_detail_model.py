import uuid
from datetime import datetime
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy import Text, ForeignKey
from app.extensions import db
from sqlalchemy.orm import relationship


class BookDetail(db.Model):
    __tablename__ = 'book_details'

    id = db.Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    
    # Kết nối với BookItem
    book_id = db.Column(UUID(as_uuid=True), ForeignKey('book_items.id'), nullable=False)
    
    supplier = db.Column(Text, nullable=True)
    author = db.Column(Text, nullable=True)
    publisher = db.Column(Text, nullable=True)

    publish_year = db.Column(db.Integer, nullable=True)
    weight = db.Column(db.Float, nullable=True)  # tính bằng kg
    size = db.Column(Text, nullable=True)  # ví dụ: "20x30cm"
    quantity_of_pages = db.Column(db.Integer, nullable=True)

    description = db.Column(Text, nullable=True)
    language = db.Column(db.String(50), nullable=True)
    layout = db.Column(db.String(100), nullable=True)  # 👈 thêm mới

    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    updated_at = db.Column(db.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)

    def to_dict(self):
        return {
            "id": str(self.id),
            "book_id": str(self.book_id),
            "supplier": self.supplier,
            "author": self.author,
            "publisher": self.publisher,
            "publish_year": self.publish_year,
            "weight": self.weight,
            "size": self.size,
            "quantity_of_pages": self.quantity_of_pages,
            "description": self.description,
            "language":self.language,
            "layout":self.layout,
            "created_at": self.created_at.isoformat(),
            "updated_at": self.updated_at.isoformat(),
        }
    book_item = relationship("BookItem", back_populates="detail")