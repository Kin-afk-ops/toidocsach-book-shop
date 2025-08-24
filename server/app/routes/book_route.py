from flask import Blueprint, request, jsonify
from app.services.book_service import create_book_service,get_all_books_service,get_book_by_id_service

book_route = Blueprint("book", __name__)

@book_route.route("/book", methods=["POST"])
def add_book():
    # Nhận form-data từ request
    files = request.files.getlist("files")  # input name="files"
    data = request.form.to_dict()
    data["files"] = files

    try:
        book, status_code = create_book_service(data)
        return jsonify(book), status_code
    except Exception as e:
        return jsonify({"error": str(e)}), 500



@book_route.route("/book", methods=["GET"])
def get_all_books():
    try:
        books, status_code = get_all_books_service()
        return jsonify(books), status_code
    except Exception as e:
        return jsonify({"error": str(e)}), 500
    

    

# GET /book/<uuid:book_id>
@book_route.route("/book/<uuid:book_id>", methods=["GET"])
def get_book(book_id):
    book = get_book_by_id_service(book_id)
    if not book:
        return jsonify({"error": "Book not found"}), 404
    return jsonify(book), 200
