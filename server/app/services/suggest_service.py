from app.models.book_item_model import BookItem
from app.extensions import db

def get_suggestions(search: str, history: list[str]) -> list[str]:
    search = search.strip().lower()
    if not search:
        return []

    # 1. Lọc từ history
    history_suggestions = [h for h in history if search in h.lower()]

    # 2. Query DB theo title
    db_suggestions = (
        db.session.query(BookItem.title)
        .filter(BookItem.title.ilike(f"%{search}%"))
        .limit(10)
        .all()
    )
    db_suggestions = [title for (title,) in db_suggestions]

    # 3. Gộp lại và loại trùng
    result = []
    seen = set()
    for item in history_suggestions + db_suggestions:
        if item not in seen:
            result.append(item)
            seen.add(item)

    return result
