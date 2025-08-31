from app.extensions import db
from app.models.book_item_model import BookItem
from app.models.book_detail_model import BookDetail
from app.models.category_model import Category
import math
from app.services.cloudinary_service import upload_images_to_cloudinary

def create_book_service(data):
    title = data.get("title")
    price = data.get("price")
    # files = data.get("files", [])
    images_links = data.get("images", []) 

    if not title or price is None:
        return {"error": "Thiếu title hoặc price"}, 400

    # Upload ảnh nếu có
    # images = data.get("images", [])
    # if files:
    #     images = upload_images_to_cloudinary(files)
    images = [{"image_url": url, "image_public_id": "upload_by_link"} for url in images_links]

    # Tạo BookItem
    book_item = BookItem(
        title=title,
        images=images,  # lưu list object
        price=price,
        discount=data.get("discount", 0.0),
        quantity=data.get("quantity", 0),
        sold_count=data.get("sold_count", 0),
        category_id=data.get("category_id","")
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
    

def get_home_books_service():
    try:
        books = (
            BookItem.query
            .order_by(BookItem.created_at.desc())
            .limit(10)  # chỉ lấy tối đa 10 sản phẩm mới
            .all()
        )
        return [book.to_dict() for book in books], 200
    except Exception as e:
        raise e


def get_list_books_service(page: int, per_page: int = 20):
    try:
        # Đếm tổng số sách
        total_books = BookItem.query.count()
        total_pages = math.ceil(total_books / per_page)

        # Lấy sách theo trang
        books = (
            BookItem.query
            .order_by(BookItem.created_at.desc())
            .offset((page - 1) * per_page)
            .limit(per_page)
            .all()
        )

        return [book.to_dict() for book in books], total_pages, 200
    except Exception as e:
        raise e



def get_books_by_category_service(category_id, page: int, per_page: int = 20):
    try:
        # Đếm tổng số sách trong category này
        total_books = BookItem.query.filter_by(category_id=category_id).count()
        total_pages = math.ceil(total_books / per_page) if total_books > 0 else 1

        # Lấy sách theo category + phân trang
        books = (
            BookItem.query
            .filter_by(category_id=category_id)
            .order_by(BookItem.created_at.desc())
            .offset((page - 1) * per_page)
            .limit(per_page)
            .all()
        )

        return [book.to_dict() for book in books], total_pages, 200
    except Exception as e:
        raise e



def get_book_by_id_service(book_id: str):
    book = BookItem.query.filter_by(id=book_id).first()
    return book.to_dict(include_detail=True) if book else None



def get_book_item_by_id(book_id: str):
    """
    Lấy BookItem theo ID
    """
    try:
        book = BookItem.query.get(book_id)
        if not book:
            return None, "Không tìm thấy sách với id này"
        return book, None
    except Exception as e:
        return None, str(e)

def update_book_category_service(book_id, category_id):
    book = BookItem.query.get(book_id)
    if not book:
        return {"error": "Không tìm thấy sách"}, 404

    category = Category.query.get(category_id)
    if not category:
        return {"error": "Không tìm thấy danh mục"}, 404

    book.category_id = category.id
    db.session.commit()

    return book.to_dict(include_detail=True, include_category=True), 200



def update_book_service(data, book_id):
    try:
        book = BookItem.query.get(book_id)
        if not book:
            return {"error": "Book not found"}, 404

        # Update BookItem fields
        if "title" in data:
            book.title = data["title"]
        if "price" in data:
            book.price = data["price"]
        if "discount" in data:
            book.discount = data["discount"]
        if "quantity" in data:
            book.quantity = data["quantity"]
        if "sold_count" in data:
            book.sold_count = data["sold_count"]
        if "images" in data:  # danh sách [{image_url, image_public_id}]
            book.images = data["images"]
        if "category_id" in data:
            book.category_id = data["category_id"]

        # Update BookDetail (nếu có)
        if not book.detail:
            # Nếu chưa có detail thì tạo mới
            book.detail = BookDetail(book_id=book.id)

        detail = book.detail
        if "supplier" in data:
            detail.supplier = data["supplier"]
        if "author" in data:
            detail.author = data["author"]
        if "publisher" in data:
            detail.publisher = data["publisher"]
        if "publish_year" in data:
            detail.publish_year = data["publish_year"]
        if "weight" in data:
            detail.weight = data["weight"]
        if "size" in data:
            detail.size = data["size"]
        if "quantity_of_pages" in data:
            detail.quantity_of_pages = data["quantity_of_pages"]
        if "description" in data:
            detail.description = data["description"]
        if "language" in data:
            detail.language = data["language"]
        if "layout" in data:
            detail.layout = data["layout"]

        db.session.commit()

        return book.to_dict(include_detail=True, include_category=True), 200

    except Exception as e:
        db.session.rollback()
        return {"error": str(e)}, 500


def remove_book_category_service(book_id):
    book = BookItem.query.get(book_id)
    if not book:
        return {"error": "Book not found"}, 404

    book.category_id = None
    db.session.commit()

    return book.to_dict(include_detail=True, include_category=True), 200