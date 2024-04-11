import os
import requests
import json


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

