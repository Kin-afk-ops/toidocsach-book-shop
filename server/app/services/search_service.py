from sqlalchemy import or_
from app.models.book_item_model import BookItem
from app.models.book_detail_model import BookDetail
from app.models.category_model import Category
from sqlalchemy import func

from app.extensions import db
import unicodedata

def strip_accents(text: str) -> str:
    return ''.join(
        c for c in unicodedata.normalize('NFD', text)
        if unicodedata.category(c) != 'Mn'
    )


def search_books(keyword: str):
    keyword = keyword.strip()
    if not keyword:
        return []

    # Bỏ dấu trước khi đưa vào LIKE
    normalized_keyword = strip_accents(keyword)

    query = (
        db.session.query(BookItem)
        .join(BookDetail, BookItem.id == BookDetail.book_id, isouter=True)
        .join(Category, BookItem.category_id == Category.id, isouter=True)
        .filter(
            or_(
                func.unaccent(BookItem.title).ilike(f"%{normalized_keyword}%"),
                func.unaccent(BookDetail.description).ilike(f"%{normalized_keyword}%"),
                func.unaccent(BookDetail.author).ilike(f"%{normalized_keyword}%"),
                func.unaccent(BookDetail.publisher).ilike(f"%{normalized_keyword}%"),
                func.unaccent(BookDetail.language).ilike(f"%{normalized_keyword}%"),
                func.unaccent(BookDetail.layout).ilike(f"%{normalized_keyword}%"),
                func.unaccent(Category.title).ilike(f"%{normalized_keyword}%")
            )
        )
        .all()
    )

    return [book.to_dict(include_detail=True, include_category=True) for book in query]
