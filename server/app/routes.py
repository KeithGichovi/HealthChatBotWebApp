from flask import Blueprint, jsonify, request
from werkzeug.security import generate_password_hash
from .Models import User
from . import db
from openai import OpenAI
import os
from dotenv import load_dotenv
from flask_jwt_extended import jwt_required

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
    pass


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
