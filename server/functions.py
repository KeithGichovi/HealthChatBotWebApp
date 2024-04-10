import os
from dotenv import load_dotenv
import requests
import json
import datetime
from bs4 import BeautifulSoup
from selenium import webdriver
from selenium.common import NoSuchElementException
from selenium.webdriver.common.by import By
from selenium.webdriver.firefox.options import Options
from app.Models import User, AppointmentType

load_dotenv()

tools_list = [
    {
        "name": "get_weather",
        "description": "Get weather data based on latitude and longitude coordinates. based on weather information, provide information and advice on how user can keep safe in terms of health based on the weather data.",
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
    },
    {
        "name": "get_current_datetime_as_json",
        "description": "Simply get the current date and time. Call this function every second if you need to. Especially when dealing with requests from the user that are time-bound like appointments, and pregnancy estimation, menustration cycle.",
        "parameters": {
            "type": "object",
            "properties": {},
            "required": []
        }
    },
    {
        "name": "scrape_medicine_info",
        "description": "Get the information about the medicine from the NHS website. Provide all links returned by the function to the user.",
        "parameters": {
            "type": "object",
            "properties": {
                "medicine": {
                    "type": "string",
                    "description": "The named medicine"
                }
            },
            "required": [
                "medicine"
            ]
        }
    },
    {
        "name": "get_user_name",
        "description": "Fetches the first name and last name of a user by their user ID. The chatbot should refer to the user by their first name, last name or both when they make a request. This is a personalisation function that runs infinitely.",
        "parameters": {
            "type": "object",
            "properties": {
                "user_id": {
                    "type": "integer",
                    "description": "The ID of the user to fetch the name from."
                }
            },
            "required": ["user_id"]
        }
    },
    {
        "name": "fetch_appointment_type_offered",
        "description": "Acquires all the types of appointments offered",
        "parameters": {
            "type": "object",
            "properties": {},
            "required": []
        }
    }
]


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


def scrape_medicine_info(medicine):
    base_url = f"https://www.nhs.uk/medicines/"
    # headless browser -  browses without opening a GUI
    options = Options()
    options.add_argument("--headless")
    options.add_argument("--no-sandbox")
    driver = webdriver.Firefox(options=options)
    # Check if the medicine name appears in the page content
    try:
        # open the base url
        driver.get(base_url)
        medicine_link = driver.find_element(By.PARTIAL_LINK_TEXT, medicine.capitalize())
        if not medicine_link:
            raise NoSuchElementException
    except NoSuchElementException:
        driver.quit()
        return None
    # click link if returned
    medicine_link.click()
    # scrape all the links within the main tag
    soup = BeautifulSoup(driver.page_source, 'html.parser')
    # get the links within the main body
    main_links = soup.find('main').find_all('a', href=True)
    # json to be returned
    medicine_info = {
        "name": medicine,
        "links": [],
    }
    for link in main_links:
        # strips all text in link
        link_text = link.text.strip()
        # click the link to navigate
        try:
            driver.find_element(By.PARTIAL_LINK_TEXT, link_text).click()
        except NoSuchElementException:
            pass
        # read content of each link
        link_soup = BeautifulSoup(driver.page_source, 'html.parser')
        # pass the content as a string
        link_content = link_soup.find('main').text.strip()
        # return relevant links
        link_url = link['href']
        # append the dictionary.
        medicine_info["links"].append({'text': link_text, 'url': link_url, "content": link_content})
    driver.quit()
    return medicine_info


def get_user_name(user_id):
    user = User.query.filter_by(id=user_id).first()
    if user:
        return {
            'first_name': user.first_name,
            'last_name': user.last_name
        }
    else:
        return None


def get_common_health_questions():
    url = "https://api.nhs.uk/common-health-questions"
    headers = {
        'Subscription-Key': os.getenv('NHS_API_KEY')
    }

    try:
        response = requests.get(url=url, headers=headers)
        response.raise_for_status()  # Raise an error for bad response status codes
        data = response.json()
        formatted_data = json.dumps(data, indent=4)
        print(formatted_data)
    except requests.exceptions.RequestException as e:
        print(f"Error fetching data: {e}")


def fetch_appointment_type_offered():
    types = AppointmentType.query.all()
    appointments_offered = []
    for appointment_type in types:
        appointments_offered.append({
            "type": appointment_type.type,
            "description": appointment_type.description
        })
    return appointments_offered


