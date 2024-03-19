from datetime import datetime
from flask import Blueprint, jsonify, request
from werkzeug.security import generate_password_hash, check_password_hash
from .Models import User, Chat, Thread
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
    user_chat = Chat(user_id=user.id)
    db.session.add(user_chat)
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
    refreshToken = create_refresh_token(identity={
        "id": user.id,
        "email": user.email,
        "first_name": user.first_name,
        "last_name": user.last_name
    })
    user_chats = Chat.query.filter_by(user_id=user.id).first()
    if user_chats is None:
        new_chat = Chat(user_id=user.id)
        db.session.add(new_chat)
        db.session.commit()
    return jsonify({"message": "Successful login", "access_token": access_token, "refresh_token": refreshToken}), 200


# @main.route('/chatbot', methods=["POST"]) @jwt_required() def chatbot(): system_message = os.getenv(
# 'SYSTEM_MESSAGE') data = request.get_json() if data is None: return jsonify({"message": "Please send a message to
# the chatbot"}) chat = data['user'] user_id = get_jwt_identity()['id'] user_chat = Chat.query.filter_by(
# user_id=user_id).first() new_user_message = Messages(chat_id=user_chat.id, user_id=user_id, content=chat,
# created_at=datetime.utcnow()) db.session.add(new_user_message) db.session.commit() chat_messages =
# Messages.query.filter_by(chat_id=user_chat.id).order_by(Messages.created_at.desc()).limit(10).all()
# reversed_chat_messages = reversed(chat_messages) conversation = [{"role": "system", "content": system_message}] for
# message in reversed_chat_messages: role = "user" if message.user_id == user_id and not message.is_bot else
# "assistant" conversation.append({"role": role, "content": message.content}) response =
# client.chat.completions.create( model="gpt-3.5-turbo-1106", messages=conversation, temperature=2, max_tokens=4096,
# top_p=0.8, frequency_penalty=1.2, presence_penalty=1.2, ) new_bot_message = Messages(chat_id=user_chat.id,
# user_id=user_id, content=response.choices[0].message.content, is_bot=True, created_at=datetime.utcnow())
# db.session.add(new_bot_message) db.session.commit() return jsonify({"message": response.choices[
# 0].message.content}), 200


@main.route('/refresh_token', methods=["POST"])
@jwt_required(refresh=True)
def refresh_token():
    current_user = get_jwt_identity()
    new_access_token = create_access_token(identity=current_user)
    return jsonify({"access_token": new_access_token}), 200


@main.route('/chatbot', methods=["POST"])
@jwt_required()
def chatbot():
    data = request.get_json()
    if data is None or 'user' not in data:
        return jsonify({"message": "Please send a message to the chatbot"}), 400

    content = data['user']
    user_id = get_jwt_identity()['id']
    assistant_id = os.getenv('ASSISTANT_ID')
    # Check if user's thread exists, if not create a thread
    thread_result = Thread.query.filter_by(user_id=user_id).first()
    if thread_result is None:
        make_new_thread = client.beta.threads.create()
        new_thread_id = make_new_thread.id
        new_thread = Thread(user_id=user_id, thread_id=new_thread_id, created_at=datetime.utcnow())
        db.session.add(new_thread)
        db.session.commit()
    else:
        new_thread_id = thread_result.thread_id
    # Send message to the thread
    messages = client.beta.threads.messages.create(
        thread_id=new_thread_id,
        role='user',
        content=content
    )
    # Get user information
    user_info = get_user_info(user_id)
    instructions = f'address the user by their name {user_info["firstname"]} {user_info["lastname"]}'
    # Run assistant
    run = client.beta.threads.runs.create(
        thread_id=new_thread_id,
        assistant_id=assistant_id,
        instructions=instructions
    )
    # Check run status
    run_status = client.beta.threads.runs.retrieve(
        thread_id=new_thread_id,
        run_id=run.id
    )
    if run_status.status == 'completed':
        # Fetch messages from the thread
        messages = client.beta.threads.messages.list(thread_id=new_thread_id)
        for message in messages.data:
            content = message.content[0].text.value
        return jsonify({"messages": content}), 200
    return jsonify({"message": "Assistant run is not completed"}), 400


def get_user_info(user_id):
    user = User.query.filter_by(id=user_id).first()
    if user is None:
        return jsonify({"message": "User does not exist"}), 404
    else:
        return {
            "user_id": user.id,
            "firstname": user.first_name,
            "lastname": user.last_name
        }
