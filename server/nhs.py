import requests
import os
from dotenv import load_dotenv
load_dotenv()

url = "https://api.nhs.uk/common-health-questions"

headers = {
    'Subscription-Key': os.getenv('NHS_API_KEY')
}

response = requests.get(url=url, headers=headers)

if response.status_code == 200:
    data = response.json()
    print(data)
else:
    print(f"Error: {response.status_code}")
