import unittest
from flask import Flask
from flask_jwt_extended import JWTManager
from server.app import create_app
from server.app.config import Config


class TestAppSetup(unittest.TestCase):
    def setUp(self):
        self.app = create_app()
        self.client = self.app.test_client()

    def test_app_creation(self):
        self.assertIsInstance(self.app, Flask)
        self.assertTrue(self.app.config['SECRET_KEY'])
        self.assertEqual(self.app.config['SQLALCHEMY_DATABASE_URI'], 'mysql://root:password@127.0.0.1:3306/MediSync')

    def test_jwt_initialized(self):
        jwt_extension = self.app.extensions.get('jwt')
        print("App extensions:", self.app.extensions)
        self.assertTrue(isinstance(jwt_extension, JWTManager), f"JWT extension is {jwt_extension}")

    def test_routes_registered(self):
        response = self.client.get('/')
        self.assertEqual(response.status_code, 404)


if __name__ == '__main__':
    unittest.main()
