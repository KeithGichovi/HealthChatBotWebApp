import sys
import datetime
import json
import os
import requests
from dotenv import load_dotenv
sys.path.append("..")
from app.Models import AppointmentType, User


load_dotenv()


class OpenFunctions:
    @staticmethod
    def fetch_appointment_type_offered():
        types = AppointmentType.query.all()
        appointments_offered = []
        for appointment_type in types:
            appointments_offered.append({
                "type": appointment_type.type,
                "description": appointment_type.description
            })
        return appointments_offered

    @staticmethod
    def get_current_datetime_as_json():
        current_datetime = datetime.datetime.now()
        datetime_dict = {
            "year": current_datetime.year,
            "month": current_datetime.month,
            "day": current_datetime.day,
            "day_of_week": current_datetime.strftime("%A"),  # Add day of the week
            "hour": current_datetime.hour,
            "minute": current_datetime.minute,
            "second": current_datetime.second
        }
        return json.dumps(datetime_dict)

    @staticmethod
    def get_user_name(user_id):
        user = User.query.filter_by(id=user_id).first()
        if user:
            return {
                'first_name': user.first_name,
                'last_name': user.last_name
            }
        else:
            return None

    @staticmethod
    def get_weather(lat, lon):
        weather_key = os.getenv('OPEN_WEATHER_API_KEY')
        url = f'https://api.openweathermap.org/data/2.5/weather?lat={lat}&lon={lon}&units=metric&appid={weather_key}'
        response = requests.get(url)
        if response.status_code == 200:
            return response.json()
        else:
            print(f"Failed to fetch weather data. Status code: {response.status_code}")
            return None
