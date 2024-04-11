import os
import requests
from dotenv import load_dotenv

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
