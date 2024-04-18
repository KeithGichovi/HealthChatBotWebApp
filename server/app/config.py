import secrets
import os

from dotenv import load_dotenv

load_dotenv()


class Config:
    SECRET_KEY = secrets.token_hex(16)
    # SQLALCHEMY_DATABASE_URI = f'mysql://root:password@127.0.0.1:3306/MediSync'
    # SQLALCHEMY_DATABASE_URI = f'mysql://{os.getenv("COCKROACH_DB_USERNAME")}:{os.getenv("COCKROACH_DB_PASSWORD")}@{os.getenv("COCKROACH_DB_HOST")}:{os.getenv("COCKROACH_DB_PORT")}/{os.getenv("COCKROACH_DB_DB")}'
    SQLALCHEMY_DATABASE_URI = f'mysql://{os.getenv("FREE_HOSTING_DB_USERNAME")}:{os.getenv("FREE_HOSTING_DB_PASSWORD")}@{os.getenv("FREE_HOSTING_DB_HOST")}:{os.getenv("FREE_HOSTING_DB_PORT")}/{os.getenv("FREE_HOSTING_DB_DB")}'
    SQLALCHEMY_TRACK_MODIFICATIONS = False
    JWT_SECRET_KEY = secrets.token_hex(16)
    CORS_HEADERS = "Content-Type"
