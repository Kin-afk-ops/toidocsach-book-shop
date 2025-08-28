from flask import Blueprint, request, jsonify

search_route = Blueprint("search_route", __name__)


@search_route.route("/search", methods=["POST"])
def search_book():


