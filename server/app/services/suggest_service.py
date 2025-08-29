from app.models.book_item_model import BookItem
from app.extensions import db
import unicodedata

def strip_accents(text: str) -> str:
    """Bỏ dấu tiếng Việt"""
    return ''.join(
        c for c in unicodedata.normalize('NFD', text)
        if unicodedata.category(c) != 'Mn'
    )

def get_suggestions(search: str, history: list[str]) -> list[str]:
    search = search.strip()
    if not search:
        return []

    normalized_search = strip_accents(search.lower())

    # 1. Lọc từ history
    history_suggestions = [
        h for h in history
        if normalized_search in strip_accents(h.lower())
    ]

    # 2. Query DB theo title
    db_query = db.session.query(BookItem.title).all()
    db_suggestions = []
    for (title,) in db_query:
        if normalized_search in strip_accents(title.lower()):
            db_suggestions.append(title)

    # 3. Gộp và loại trùng
    result = []
    seen = set()
    for item in history_suggestions + db_suggestions:
        normalized_item = strip_accents(item.lower())
        if normalized_item not in seen:
            result.append(item)
            seen.add(normalized_item)

    # 4. Giới hạn 10 kết quả
    return result
