from app.extensions import db
from app.models.book_item_model import BookItem
from app.models.book_detail_model import BookDetail
from app.services.cloudinary_service import upload_images_to_cloudinary

def create_book_service(data):
    title = data.get("title")
    price = data.get("price")
    files = data.get("files", [])

    if not title or price is None:
        return {"error": "Thiếu title hoặc price"}, 400

    # Upload ảnh nếu có
    images = data.get("images", [])
    if files:
        images = upload_images_to_cloudinary(files)

    # Tạo BookItem
    book_item = BookItem(
        title=title,
        images=images,  # lưu list object
        price=price,
        discount=data.get("discount", 0.0),
        quantity=data.get("quantity", 0),
        sold_count=data.get("sold_count", 0)
    )

    # Tạo BookDetail
    book_detail = BookDetail(
        book_item=book_item,
        supplier=data.get("supplier"),
        author=data.get("author"),
        publisher=data.get("publisher"),
       
        publish_year=data.get("publish_year"),
        weight=data.get("weight"),
        size=data.get("size"),
        quantity_of_pages=data.get("quantity_of_pages"),
        description=data.get("description"),
        layout=data.get("layout"),
        language=data.get("language")

    )

    try:
        db.session.add(book_item)
        db.session.add(book_detail)
        db.session.commit()
        return {"book_item": book_item.to_dict(), "book_detail": book_detail.to_dict()}, 201
    except Exception as e:
        db.session.rollback()
        return {"error": str(e)}, 500



def get_all_books_service():
    try:
        books = BookItem.query.order_by(BookItem.created_at.desc()).all()
        return [book.to_dict() for book in books], 200
    except Exception as e:
        raise e
    


def get_book_by_id_service(book_id: str):
    book = BookItem.query.filter_by(id=book_id).first()
    return book.to_dict(include_detail=True) if book else None