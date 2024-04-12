from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
from flask_jwt_extended import JWTManager
from flask_cors import CORS
import pymysql
from .config import Config

pymysql.install_as_MySQLdb()

db = SQLAlchemy()
migrate = Migrate()
jwt = JWTManager()
cors = CORS()


def create_app():
    app = Flask(__name__)
    app.config.from_object(Config)
    db.init_app(app)
    migrate.init_app(app, db)
    jwt.init_app(app)
    cors.init_app(app)

    from .routes import main
    app.register_blueprint(main)

    return app
