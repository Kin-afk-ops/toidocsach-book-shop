from flask import Blueprint, request, jsonify
from app.services.search_service import search_books,search_books_with_pagination

search_route = Blueprint("search_route", __name__)

@search_route.route("/search", methods=["POST"])
def search_book():
    data = request.get_json() or {}
    keyword = data.get("keyword", "").strip()
    page = int(data.get("page", 1))
    limit = int(data.get("limit", 20))

    result = search_books_with_pagination(keyword, page, limit)
    return jsonify(result)
