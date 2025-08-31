from flask import Blueprint, request, jsonify
from app.services.book_service import create_book_service,get_all_books_service,get_book_by_id_service,update_book_category_service,remove_book_category_service,get_home_books_service,get_list_books_service,get_books_by_category_service,get_book_item_by_id,update_book_service
import math
book_route = Blueprint("book", __name__)

@book_route.route("/book", methods=["POST"])
def add_book():
    # Nhận form-data từ request
    files = request.files.getlist("files")  # input name="files"
    data = request.json
    data["files"] = files

    try:
        book, status_code = create_book_service(data)
        return jsonify(book), status_code
    except Exception as e:
        return jsonify({"error": str(e)}), 500



@book_route.route("/book/all", methods=["GET"])
def get_all_books():
    try:
        books, status_code = get_all_books_service()
        return jsonify(books), status_code
    except Exception as e:
        return jsonify({"error": str(e)}), 500
    



@book_route.route("/book/home", methods=["GET"])
def get_home_books():
    try:
        books, status_code = get_home_books_service()
        return jsonify(books), status_code
    except Exception as e:
        return jsonify({"error": str(e)}), 500
    




@book_route.route("/book/list", methods=["GET"])
def get_list_books():
    try:
        # Lấy page từ query param, mặc định là 1
        page = request.args.get("page", 1, type=int)
        books, total_pages, status_code = get_list_books_service(page)
        return jsonify({
            "books": books,
            "total_pages": total_pages,
            "current_page": page
        }), status_code
    except Exception as e:
        return jsonify({"error": str(e)}), 500
    

@book_route.route("/bookItems/<uuid:book_id>", methods=["GET"])
def get_book_item(book_id):
    book, error = get_book_item_by_id(book_id)
    if error:
        return jsonify({"error": error}), 404

    return jsonify(book.to_dict(include_detail=True, include_category=True)), 200
   
    

@book_route.route("/book/category/<uuid:category_id>", methods=["GET"])
def get_books_by_category(category_id):
    try:
        # Lấy page từ query param (mặc định = 1)
        page = request.args.get("page", 1, type=int)
        books, total_pages, status_code = get_books_by_category_service(category_id, page)
        return jsonify({
            "books": books,
            "total_pages": total_pages,
            "current_page": page
        }), status_code
    except Exception as e:
        return jsonify({"error": str(e)}), 500
    

# GET /book/<uuid:book_id>
@book_route.route("/book/<uuid:book_id>", methods=["GET"])
def get_book(book_id):
    book = get_book_by_id_service(book_id)
    if not book:
        return jsonify({"error": "Book not found"}), 404
    return jsonify(book), 200




@book_route.route("/book/<uuid:book_id>/category", methods=["PUT"])
def update_book_category(book_id):
    data = request.get_json()
    category_id = data.get("category_id")
    if not category_id:
        return jsonify({"error": "category_id is required"}), 400

    resp, status = update_book_category_service(book_id, category_id)
    return jsonify(resp), status




@book_route.route("/book/<uuid:book_id>", methods=["PUT"])
def update_book(book_id):
    data = request.get_json()


    resp, status = update_book_service(data, book_id)
    return jsonify(resp), status




@book_route.route("/book/<uuid:book_id>/category", methods=["DELETE"])
def remove_book_category(book_id):
    resp, status = remove_book_category_service(book_id)
    return jsonify(resp), status