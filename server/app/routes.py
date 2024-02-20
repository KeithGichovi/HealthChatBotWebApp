from flask import Blueprint, jsonify, request
from werkzeug.security import generate_password_hash
from .Models import User
from . import db

main = Blueprint('user', __name__)


@main.route('/register', methods=["POST"])
def register():
    data = request.get_json()
    if data is None:
        return jsonify({"message": "Please provide information and register"})

    first_name = data['first_name']
    last_name = data['last_name']
    email = data['email']
    password = generate_password_hash(data['password'])
    if User.query.filter_by(email=email).first():
        return jsonify({"message": "A user with this email already exists"}), 401

    user = User(first_name=first_name, last_name=last_name, email=email, password=password)
    db.session.add(user)
    db.session.commit()
    return jsonify({"message": "User has been registered successfully"}), 201
