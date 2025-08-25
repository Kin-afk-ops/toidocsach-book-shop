import os
from flask import Flask
from flask_cors import CORS , cross_origin
from flask_jwt_extended import JWTManager
from dotenv import load_dotenv
from datetime import timedelta
import cloudinary
from app.models.user_model import User  
from app.models.book_item_model import BookItem  
from app.models.book_detail_model import BookDetail  
from app.models.cart_model import Cart  
from app.models.order_model import Order  
from app.models.address_model import Address  
from app.models.category_model import Category  


from flask import Flask


# Khoi tao flask server
from app.extensions import db  

# Khoi tao jwt 


def create_app():
    app = Flask(__name__)

    CORS(app, supports_credentials=True, origins=["http://localhost:3000"])
    load_dotenv()

    app.config['SQLALCHEMY_DATABASE_URI'] = (
    f"postgresql://{os.getenv('DB_USER')}:{os.getenv('DB_PASS')}@"
    f"{os.getenv('DB_HOST')}:{int(os.getenv('DB_PORT', 5432))}/{os.getenv('DB_NAME')}")
    app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
    app.config['JWT_SECRET_KEY'] = os.getenv("JWT_SECRET_KEY", "super-secret-key") 
    app.config['JWT_TOKEN_LOCATION'] = ['cookies']
    # app.config['JWT_ACCESS_COOKIE_NAME'] = 'access_token'
    app.config['JWT_ACCESS_COOKIE_PATH'] = '/'
    app.config["JWT_REFRESH_COOKIE_PATH"] = "/"
    app.config["JWT_ACCESS_TOKEN_EXPIRES"] = timedelta(days=7)   # Access token sống 7 ngày
    app.config["JWT_REFRESH_TOKEN_EXPIRES"] = timedelta(days=30) # Refresh token sống 30 ngày
    app.config['JWT_COOKIE_CSRF_PROTECT'] = False

    


    # # ⚠️ Khi frontend và backend khác origin + HTTPS (ngrok), bắt buộc:
    app.config['JWT_COOKIE_SAMESITE'] = "None"
    app.config['JWT_COOKIE_SECURE'] = True  # Bắt buộc nếu SameSite=None 

    jwt = JWTManager()

    jwt.init_app(app)
    db.init_app(app) 


   

      # ✅ Phải đặt sau khi init_app và import model
    with app.app_context():
        # db.drop_all()
        db.create_all()

    app.config["CORS_HEADERS"] = "Content-Type"
    # Register các blueprint
    from app.routes.auth_route import auth_route
    from app.routes.otp_route import otp_route
    from app.routes.book_route import book_route
    from app.routes.cart_route import cart_route
    from app.routes.order_route import order_route
    from app.routes.address_route import address_route
    from app.routes.category_route import category_route
    from app.routes.user_route import user_route
    # from app.routes.speech_routes import speech_route




    app.register_blueprint(auth_route)
    app.register_blueprint(otp_route)
    app.register_blueprint(book_route)
    app.register_blueprint(cart_route)
    app.register_blueprint(order_route)
    app.register_blueprint(category_route)
    app.register_blueprint(address_route)
    app.register_blueprint(user_route)

    # app.register_blueprint(speech_route)

    return app



