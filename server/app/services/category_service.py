from app.models.category_model import Category
from app.extensions import db
from app.services.cloudinary_service import upload_one_image_to_cloudinary



# CREATE
def create_category_service(data):
    title = data.get("title")
    file = data.get("file")

    if not title:
        return {"error": "Thiếu title"}, 400

    image_url = None
    image_public_id = None

    # Upload file lên Cloudinary (nếu có)
    if file:
        result = upload_one_image_to_cloudinary(file)
        image_url = result.get("image_url")
        image_public_id = result.get("image_public_id")

    category = Category(
        title=title,
        image_url=image_url,
        image_public_id=image_public_id,
    )

    try:
        db.session.add(category)
        db.session.commit()
        return category.to_dict(), 201
    except Exception as e:
        db.session.rollback()
        return {"error": str(e)}, 500

# READ ALL
def get_all_categories_service():
    categories = Category.query.all()
    return [c.to_dict() for c in categories], 200


# READ ONE
def get_category_service(category_id):
    category = Category.query.get(category_id)
    if not category:
        return {"error": "Không tìm thấy danh mục"}, 404
    return category.to_dict(), 200


# UPDATE
def update_category_service(category_id, data):
    category = Category.query.get(category_id)
    if not category:
        return {"error": "Không tìm thấy danh mục"}, 404

    title = data.get("title")
    image = data.get("image")

    if title:
        category.title = title
    if image:
        category.image = image

    db.session.commit()
    return category.to_dict(), 200


# DELETE
def delete_category_service(category_id):
    category = Category.query.get(category_id)
    if not category:
        return {"error": "Không tìm thấy danh mục"}, 404

    db.session.delete(category)
    db.session.commit()
    return {"message": "Xóa danh mục thành công"}, 200
