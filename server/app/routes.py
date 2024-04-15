from datetime import datetime
from flask import Blueprint, jsonify, request
from werkzeug.security import generate_password_hash, check_password_hash
from .Models import *
from . import db
from dotenv import load_dotenv
from flask_jwt_extended import jwt_required, create_access_token, create_refresh_token, get_jwt_identity
from sqlalchemy import desc
import sys
sys.path.append("..")
from server.assistant import client

main = Blueprint('user', __name__)

load_dotenv()


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
    refreshToken = create_refresh_token(identity={
        "id": user.id,
        "email": user.email,
        "first_name": user.first_name,
        "last_name": user.last_name
    })
    # from server.assistant import client
    new_thread = client.beta.threads.create()
    new_user_thread = Thread(user_id=user.id, thread_id=new_thread.id, created_at=datetime.utcnow())
    db.session.add(new_user_thread)
    db.session.commit()
    return jsonify({"message": "Successful login", "access_token": access_token, "refresh_token": refreshToken}), 200


@main.route('/chatbot', methods=["POST"])
@jwt_required()
def chatbot():
    data = request.get_json()
    if data is None:
        return jsonify({"message": "Please send a message to the chatbot"})
    chat = data['user']
    user_id = get_jwt_identity()['id']
    user_thread = Thread.query.filter_by(user_id=user_id).order_by(desc(Thread.created_at)).first()
    from server.assistant import assistant
    message_data = assistant(
        content=chat,
        thread_id=user_thread.thread_id,
        user_id=user_id
    )
    assistant_response = None
    if message_data is not None:
        sorted_messages = sorted(message_data, key=lambda x: x.created_at, reverse=True)
        for message in sorted_messages:
            if message.role == 'assistant':
                assistant_response = message
                break
    if assistant_response:
        latest_message_value = assistant_response.content[0].text.value
        return jsonify({"message": latest_message_value})
    else:
        return jsonify({"message": "No response from the chatbot"}), 500


@main.route('/refresh_token', methods=["POST"])
@jwt_required()
def refresh_token():
    current_user = get_jwt_identity()
    new_access_token = create_access_token(identity=current_user)
    return jsonify({"access_token": new_access_token}), 200


@main.route('/appointments', methods=["GET"])
@jwt_required()
def get_appointments():
    current_user_id = get_jwt_identity()['id']

    appointments = db.session.query(
            Appointment.id,
            AppointmentType.type,
            Appointment.appointment_time,
            Appointment.appointment_end_time
    ).join(
        AppointmentType, Appointment.appointment_type_id == AppointmentType.id
    ).filter(
        Appointment.user_id == current_user_id
    ).all()

    appointments_data = []
    for appointment in appointments:
        appointment_data = {
            "id": appointment.id,
            "title": appointment.type,
            "start": appointment.appointment_time.strftime("%Y-%m-%dT%H:%M:%S"),
            "end": appointment.appointment_end_time.strftime("%Y-%m-%dT%H:%M:%S")
        }
        appointments_data.append(appointment_data)

    return jsonify(appointments_data)


