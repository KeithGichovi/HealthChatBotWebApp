import datetime
import json


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

