import requests

url = "https://api.nhs.uk/common-health-questions"

headers = {
    'Subscription-Key': "52dae55c6aef4e1097f4f644421d0627"
}

response = requests.get(url=url, headers=headers)

if response.status_code == 200:
    data = response.json()
    print(data)
else:
    print(f"Error: {response.status_code}")
