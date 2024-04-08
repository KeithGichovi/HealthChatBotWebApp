import unittest
from unittest.mock import patch, MagicMock
from datetime import datetime
from server.app.Models import *


class TestModels(unittest.TestCase):
    def setUp(self):
        self.user_data = {
            "id": 1,
            "first_name": "John",
            "last_name": "Doe",
            "email": "john@example.com",
            "password": "password123",
            "created_at": datetime.utcnow()
        }

        self.thread_data = {
            "id": 1,
            "user_id": 1,
            "thread_id": "thread123",
            "created_at": datetime.utcnow()
        }

        self.appointment_type_data = {
            "id": 1,
            "type": "Type A",
            "description": "Description for Type A"
        }

        self.appointment_data = {
            "id": 1,
            "user_id": 1,
            "appointment_type_id": 1,
            "appointment_time": datetime.utcnow(),
            "created_at": datetime.utcnow()
        }

    def test_user_model(self):
        user = User(**self.user_data)
        self.assertEqual(user.id, self.user_data["id"])
        self.assertEqual(user.first_name, self.user_data["first_name"])
        self.assertEqual(user.last_name, self.user_data["last_name"])
        self.assertEqual(user.email, self.user_data["email"])
        self.assertEqual(user.password, self.user_data["password"])
        self.assertEqual(user.created_at, self.user_data["created_at"])

    def test_thread_model(self):
        thread = Thread(**self.thread_data)
        self.assertEqual(thread.id, self.thread_data["id"])
        self.assertEqual(thread.user_id, self.thread_data["user_id"])
        self.assertEqual(thread.thread_id, self.thread_data["thread_id"])
        self.assertEqual(thread.created_at, self.thread_data["created_at"])

    def test_appointment_type_model(self):
        appointment_type = AppointmentType(**self.appointment_type_data)
        self.assertEqual(appointment_type.id, self.appointment_type_data["id"])
        self.assertEqual(appointment_type.type, self.appointment_type_data["type"])
        self.assertEqual(appointment_type.description, self.appointment_type_data["description"])

    def test_appointment_model(self):
        appointment = Appointment(**self.appointment_data)
        self.assertEqual(appointment.id, self.appointment_data["id"])
        self.assertEqual(appointment.user_id, self.appointment_data["user_id"])
        self.assertEqual(appointment.appointment_type_id, self.appointment_data["appointment_type_id"])
        self.assertEqual(appointment.appointment_time, self.appointment_data["appointment_time"])
        self.assertEqual(appointment.created_at, self.appointment_data["created_at"])


if __name__ == '__main__':
    unittest.main()
