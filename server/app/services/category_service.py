from app.models.category_model import Category
from app.extensions import db

# CREATE
def create_category_service(data):
    title = data.get("title")
    image = data.get("image")

    if not title:
        return {"error": "Title is required"}, 400

    if Category.query.filter_by(title=title).first():
        return {"error": "Category already exists"}, 409

    category = Category(title=title, image=image)
    db.session.add(category)
    db.session.commit()

    return category.to_dict(), 201


# READ ALL
def get_all_categories_service():
    categories = Category.query.all()
    return [c.to_dict() for c in categories], 200


# READ ONE
def get_category_service(category_id):
    category = Category.query.get(category_id)
    if not category:
        return {"error": "Category not found"}, 404
    return category.to_dict(), 200


# UPDATE
def update_category_service(category_id, data):
    category = Category.query.get(category_id)
    if not category:
        return {"error": "Category not found"}, 404

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
        return {"error": "Category not found"}, 404

    db.session.delete(category)
    db.session.commit()
    return {"message": "Category deleted successfully"}, 200
