from app import db
from app.models.address_model import Address
from sqlalchemy.exc import SQLAlchemyError

def create_address(data, user_id):
    try:
        address = Address(
            user_id=user_id,
            country=data.get("country", "Vietnam"),
            province=data.get("province"),
            ward=data.get("ward"),
            address=data.get("address")
        )
        db.session.add(address)
        db.session.commit()
        return address, 201
    except SQLAlchemyError as e:
        db.session.rollback()
        return {"error": str(e)}, 500


def get_addresses(user_id):
    try:
        addresses = Address.query.filter_by(user_id=user_id).all()
        return [addr.to_dict() for addr in addresses], 200
    except SQLAlchemyError as e:
        return {"error": str(e)}, 500


def get_address_by_id(user_id, address_id):
    try:
        address = Address.query.filter_by(id=address_id, user_id=user_id).first()
        if not address:
            return {"error": "Address not found"}, 404
        return address.to_dict(), 200
    except SQLAlchemyError as e:
        return {"error": str(e)}, 500


def update_address(user_id, address_id, data):
    try:
        address = Address.query.filter_by(id=address_id, user_id=user_id).first()
        if not address:
            return {"error": "Address not found"}, 404

        address.country = data.get("country", address.country)
        address.province = data.get("province", address.province)
        address.ward = data.get("ward", address.ward)
        address.address = data.get("address", address.address)

        db.session.commit()
        return address.to_dict(), 200
    except SQLAlchemyError as e:
        db.session.rollback()
        return {"error": str(e)}, 500


def delete_address(user_id, address_id):
    try:
        address = Address.query.filter_by(id=address_id, user_id=user_id).first()
        if not address:
            return {"error": "Address not found"}, 404

        db.session.delete(address)
        db.session.commit()
        return {"message": "Address deleted"}, 200
    except SQLAlchemyError as e:
        db.session.rollback()
        return {"error": str(e)}, 500
