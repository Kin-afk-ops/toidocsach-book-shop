from sqlalchemy import or_
from app.models.book_item_model import BookItem
from app.models.book_detail_model import BookDetail
from app.models.category_model import Category
from sqlalchemy import func, text
import re

from app.extensions import db
import unicodedata

def strip_accents(text: str) -> str:
    return ''.join(
        c for c in unicodedata.normalize('NFD', text)
        if unicodedata.category(c) != 'Mn'
    )


def normalize_text(text: str) -> str:
    # Chuyển về lowercase
    text = text.lower()

    # Chuẩn hóa unicode (bỏ dấu tiếng Việt)
    text = unicodedata.normalize("NFD", text)
    text = "".join(ch for ch in text if unicodedata.category(ch) != "Mn")

    # Bỏ ký tự đặc biệt, chỉ giữ chữ và số
    text = re.sub(r"[^a-z0-9\s]", " ", text)

    # Xóa khoảng trắng thừa
    text = re.sub(r"\s+", " ", text).strip()

    return text

def search_books(keyword: str):
    keyword = keyword.strip()
    if not keyword:
        return []

    normalized_keyword = normalize_text(keyword)

    def normalized_column(col):
        return func.trim(
            func.regexp_replace(
                func.regexp_replace(
                    func.unaccent(func.lower(col)),
                    r'[^a-z0-9\s]', ' ', 'g'
                ),
                r'\s+', ' ', 'g'
            )
        )
    query = (
        db.session.query(BookItem)
        .join(BookDetail, BookItem.id == BookDetail.book_id, isouter=True)
        .join(Category, BookItem.category_id == Category.id, isouter=True)
        .filter(
            or_(
                normalized_column(BookItem.title).ilike(f"%{normalized_keyword}%"),
                normalized_column(BookDetail.description).ilike(f"%{normalized_keyword}%"),
                normalized_column(BookDetail.author).ilike(f"%{normalized_keyword}%"),
                normalized_column(BookDetail.publisher).ilike(f"%{normalized_keyword}%"),
                normalized_column(BookDetail.language).ilike(f"%{normalized_keyword}%"),
                normalized_column(BookDetail.layout).ilike(f"%{normalized_keyword}%"),
                normalized_column(Category.title).ilike(f"%{normalized_keyword}%"),
            )
        )
        .all()
    )

    return [book.to_dict(include_detail=True, include_category=True) for book in query]


def search_books_with_pagination(keyword: str, page: int = 1, limit: int = 10):
    """
    Search có phân trang
    """
    all_results = search_books(keyword)
    total = len(all_results)
    total_pages = (total + limit - 1) // limit
    start = (page - 1) * limit
    end = start + limit
    paginated_results = all_results[start:end]

    return {
        "books": paginated_results,
        "total_pages": total_pages,
        "current_page": page
    }
