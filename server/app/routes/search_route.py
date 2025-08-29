from flask import Blueprint, request, jsonify
from app.services.search_service import search_books

search_route = Blueprint("search_route", __name__)

@search_route.route("/search", methods=["POST"])
def search_book():
    data = request.get_json() or {}
    keyword = data.get("keyword", "").strip()

    results = search_books(keyword)
    return jsonify(results)
