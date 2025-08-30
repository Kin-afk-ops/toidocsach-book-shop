from app import db
from app.models.user_model import User  # model User của bạn

def delete_user_service(user_id):
    try:
        user = User.query.get(user_id)
        if not user:
            return {"success": False, "error": "Không tìm thấy người dùng"}

        db.session.delete(user)
        db.session.commit()
        return {"success": True}
    except Exception as e:
        db.session.rollback()
        return {"success": False, "error": str(e)}
