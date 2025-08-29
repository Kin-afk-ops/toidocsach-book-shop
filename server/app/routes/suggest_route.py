from flask import Blueprint, request, jsonify
from app.services.suggest_service import get_suggestions

suggest_route = Blueprint("suggest_route", __name__)

@suggest_route.route("/suggest", methods=["POST"])
def suggest():
    data = request.get_json() or {}
    search = data.get("search", "")
    history = data.get("history", [])

    suggestions = get_suggestions(search, history)
    return jsonify(suggestions)
