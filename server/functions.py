import os
from dotenv import load_dotenv
import requests
import json
import datetime
load_dotenv()


def get_weather(lat, lon):
    weather_key = os.getenv('OPEN_WEATHER_API_KEY')
    url = f'https://api.openweathermap.org/data/2.5/weather?lat={lat}&lon={lon}&units=metric&appid={weather_key}'
    response = requests.get(url)
    if response.status_code == 200:
        return response.json()
    else:
        print(f"Failed to fetch weather data. Status code: {response.status_code}")
        return None


def get_current_datetime_as_json():
    current_datetime = datetime.datetime.now()
    datetime_dict = {
        "year": current_datetime.year,
        "month": current_datetime.month,
        "day": current_datetime.day,
        "hour": current_datetime.hour,
        "minute": current_datetime.minute,
        "second": current_datetime.second
    }
    return json.dumps(datetime_dict)


tools_list = [
    {
        "type": "function",
        "function": {
            "name": "get_weather",
            "description": "Get weather data based on latitude and longitude coordinates.",
            "parameters": {
                "type": "object",
                "properties": {
                    "lat": {
                        "type": "number",
                        "description": "Latitude of the location."
                    },
                    "lon": {
                        "type": "number",
                        "description": "Longitude of the location."
                    }
                },
                "required": ["lat", "lon"]
            }
        }
    }
]
