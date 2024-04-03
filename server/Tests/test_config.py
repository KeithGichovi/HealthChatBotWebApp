import unittest
from server.app.config import Config
from unittest.mock import patch


class TestConfig(unittest.TestCase):
    @patch('server.app.config.secrets.token_hex')
    def test_secret_key(self, token_hex_mock):
        token_hex_mock.return_value = 'test_secret_key'
        config = Config()
        self.assertEqual(config.SECRET_KEY, 'test_secret_key')

    def test_database_uri(self):
        config = Config()
        self.assertEqual(config.SQLALCHEMY_DATABASE_URI, 'mysql://root:password@127.0.0.1:3306/MediSync')

    @patch('server.app.config.secrets.token_hex')
    def test_jwt_secret_key(self, mock_token_hex):
        mock_token_hex.return_value = 'test_jwt_secret_key'
        config = Config()
        self.assertEqual(config.JWT_SECRET_KEY, 'test_jwt_secret_key')

if __name__ == '__main__':
    unittest.main()
