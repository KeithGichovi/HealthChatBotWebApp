from .fetch_appointment_type_offered import fetch_appointment_type_offered
from .get_common_health_questions import get_common_health_questions
from .get_current_datetime_as_json import get_current_datetime_as_json
from .get_user_name import get_user_name
from .get_weather import get_weather
from .scrape_medicine_info import Scraper
from .ManageBooking import ManageBooking

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
    },
    {
        "name": "book_appointment",
        "description": "Appointments run from 9am to 5pm on weekdays, 9am to 3pm on weekends and public holidays. Book an appointment for a user based on provided details. Before booking an appointment, ask user their preferred date and time. Checks if the user has already booked a future appointment and prevents double booking. Returns a message indicating the success or failure of the booking operation.",
        "parameters": {
            "type": "object",
            "properties": {
                "appointment_type_id": {
                    "type": "number",
                    "description": "ID representing the type of appointment. Should be fetched from the result of the fetch_appointment_type_offered function."
                },
                "appointment_datetime": {
                    "type": "string",
                    "description": "Date and time of the appointment the user wants to book the appointment."
                },
                "notes": {
                    "type": "string",
                    "description": "These are mandatory paragraphs gathered from the interaction with the user, to explain the details of the reason for booking appointment.They must be in markdown format."
                }
            },
            "required": ["user_id", "appointment_type_id", "appointment_datetime", "notes"]
        }
    },
    {
        "name": "manage_booking_by_time",
        "description": "Helps users amend their appointments by choosing a different time or day. They can change either or both.",
        "parameters": {
            "type": "object",
            "properties": {
                "new_appointment_time": {
                    "type": "string",
                    "description": "The Updated Date and Time of the appointment."
                }
            },
            "required": ["new_appointment_time"]
        }
    },
    {
        "name": "manage_booking_by_appointment_type",
        "description": "Helps users amend their appointments by choosing a different appointment_type, refer to the types of appointments offered.",
        "parameters": {
            "type": "object",
            "properties": {
                "new_appointment_type": {
                    "type": "string",
                    "description": "The new type of appointment."
                }
            },
            "required": ["new_appointment_type"]
        }
    },
    {
        "name": "cancel_booking",
        "description": "Cancels the appointment by the user",
        "parameters": {
            "type": "object",
            "properties": {},
            "required": []
        }
    },
    {
        "name": "get_bookings",
        "description": "Fetch the upcoming appointments for the user.",
        "parameters": {
            "type": "object",
            "properties": {},
            "required": []
        }
    }
]
