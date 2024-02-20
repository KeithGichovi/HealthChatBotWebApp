from . import db


class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    first_name = db.Column(db.String(255), nullable=False)
    last_name = db.Column(db.String(255), nullable=False)
    email = db.Column(db.String(255), unique=True, nullable=False)
    password = db.Column(db.String(255), nullable=False)

    def __repr__(self):
        return (f'<User id = {self.id}, first_name = {self.first_name}, last_name = {self.last_name},'
                f' email = {self.email} ,password = {self.password}>')

