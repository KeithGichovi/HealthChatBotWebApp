from flask import Blueprint, jsonify, request
from werkzeug.security import generate_password_hash, check_password_hash
from .Models import User
from . import db
from openai import OpenAI
import os
from dotenv import load_dotenv
from flask_jwt_extended import jwt_required, create_access_token, create_refresh_token, get_jwt_identity

main = Blueprint('user', __name__)

load_dotenv()
key = os.getenv('OPENAI_API_KEY')
client = OpenAI(api_key=key)


@main.route('/register', methods=["POST"])
def register():
    data = request.get_json()
    if data is None:
        return jsonify({"message": "Please provide information and register"})
    first_name = data['first_name']
    last_name = data['last_name']
    email = data['email']
    password = data['password']
    confirm_password = data['confirm_password']
    if password != confirm_password:
        return jsonify({"message": "The passwords do not match."})
    if User.query.filter_by(email=email).first():
        return jsonify({"message": "A user with this email already exists"}), 401
    hashed_password = generate_password_hash(password)
    user = User(first_name=first_name, last_name=last_name, email=email, password=hashed_password)
    db.session.add(user)
    db.session.commit()
    return jsonify({"message": "User has been registered successfully"}), 201


@main.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    if data is None:
        return jsonify({"message": "Both Email and password are required"}), 401
    email = data['email']
    password = data['password']
    user = User.query.filter_by(email=email).first()
    if user is None or not check_password_hash(user.password, password):
        return jsonify({"message": "Invalid email or password"}), 401
    access_token = create_access_token(identity={
        "id": user.id,
        "email": user.email,
        "first_name": user.first_name,
        "last_name": user.last_name
    })
    refresh_token = create_refresh_token(identity={
        "id": user.id,
        "email": user.email,
        "first_name": user.first_name,
        "last_name": user.last_name
    })
    return jsonify({"message": "Successful login", "access_token": access_token, "refresh_token": refresh_token}), 201


@main.route('/chatbot', methods=["POST"])
@jwt_required()
def chatbot():
    system_message = (os.getenv('SYSTEM_MESSAGE'))
    conversation = [{"role": "system", "content": system_message}]
    data = request.get_json()
    if data is None:
        return jsonify({"message": "Please send a message to the chatbot"})
    chat = data['user']
    while True:
        conversation.append({"role": "user", "content": chat})
        response = client.chat.completions.create(
            model="gpt-3.5-turbo",
            messages=conversation,
            temperature=1,
            max_tokens=4096,
            top_p=1,
            frequency_penalty=0,
            presence_penalty=0,

        )
        conversation.append({"role": "assistant", "content": response.choices[0].message.content})
        # print([message for message in conversation if message["role"] != "system"])
        return jsonify({"message": response.choices[0].message.content}), 200


@main.route('/refresh_token', methods=["POST"])
@jwt_required(refresh=True)
def refresh_token():
    current_user = get_jwt_identity()
    new_access_token = create_access_token(identity=current_user)
    return jsonify({"access_token": new_access_token}), 201
