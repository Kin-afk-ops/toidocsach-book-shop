import uuid
from datetime import datetime
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy import ForeignKey, Text
from sqlalchemy.orm import relationship

from app.extensions import db

class Address(db.Model):
    __tablename__ = "addresses"

    id = db.Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    user_id = db.Column(UUID(as_uuid=True), ForeignKey("users.id", ondelete="CASCADE"), nullable=False)

    country = db.Column(Text, nullable=False, default="Vietnam")  # Vietnam hoặc Other
    province = db.Column(Text, nullable=True)  # chỉ chọn nếu country=Vietnam
    ward = db.Column(Text, nullable=True)      # chỉ chọn nếu country=Vietnam
    address = db.Column(Text, nullable=False)  # địa chỉ chi tiết, không giới hạn ký tự

    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    updated_at = db.Column(db.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)

    user = relationship("User", backref="addresses")

    def to_dict(self):
        return {
            "id": str(self.id),
            "user_id": str(self.user_id),
            "country": self.country,
            "province": self.province,
            "ward": self.ward,
            "address": self.address,
            "created_at": self.created_at.isoformat(),
            "updated_at": self.updated_at.isoformat(),
        }
