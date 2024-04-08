import unittest
from unittest.mock import patch
from server.functions import *


class TestFunctions(unittest.TestCase):

    def test_get_weather(self):
        # Mocking the response
        with patch('server.functions.requests.get') as mocked_get:
            mocked_get.return_value.status_code = 200
            mocked_get.return_value.json.return_value = {'weather': [{'main': 'Clear'}]}
            weather_data = get_weather(51.5074, 0.1278)
            self.assertEqual(weather_data['weather'][0]['main'], 'Clear')

    def test_get_current_datetime_as_json(self):
        json_datetime = get_current_datetime_as_json()
        self.assertTrue(json_datetime.startswith('{"year":'))

    def test_scrape_medicine_info(self):
        # Mocking the webdriver functions
        with patch('server.functions.webdriver') as mocked_driver:
            # Mocking the find_element method
            mocked_find_element = mocked_driver.Firefox.return_value.find_element
            mocked_find_element.return_value = 'paracetamol_link'

            # Mocking the page_source
            mocked_page_source = mocked_driver.Firefox.return_value.page_source
            mocked_page_source.return_value = '<main><a href="paracetamol_link">Paracetamol</a></main>'

            medicine_info = scrape_medicine_info("paracetamol")
            self.assertIsNotNone(medicine_info)

    def test_get_user_name(self):
        user_id = 1
        # Mocking the User.query function
        with patch('server.functions.User.query') as mocked_query:
            # Mocking the filter_by function
            mocked_filter_by = mocked_query.filter_by
            mocked_filter_by.return_value.first.return_value = {'first_name': 'John', 'last_name': 'Doe'}

            user_name = get_user_name(user_id)
            self.assertEqual(user_name['first_name'], 'John')
            self.assertEqual(user_name['last_name'], 'Doe')


if __name__ == '__main__':
    unittest.main()
