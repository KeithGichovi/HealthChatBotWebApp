from datetime import datetime
from . import db


class User(db.Model):
    __tablename__ = 'user'
    id = db.Column(db.Integer, primary_key=True)
    first_name = db.Column(db.String(255), nullable=False)
    last_name = db.Column(db.String(255), nullable=False)
    email = db.Column(db.String(255), unique=True, nullable=False)
    password = db.Column(db.String(255), nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)

    def __repr__(self):
        return (f'<User id = {self.id}, first_name = {self.first_name}, last_name = {self.last_name},'
                f' email = {self.email} ,password = {self.password}> created_at = {self.created_at}')


class Thread(db.Model):
    __tablename__ = 'threads'
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id', ondelete='CASCADE'))
    thread_id = db.Column(db.String(255), unique=True, nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)

    def __repr__(self):
        return (f'<Thread id={self.id}, user_id={self.user_id}, '
                f'thread_id="{self.thread_id}", created_at={self.created_at}>')


class AppointmentType(db.Model):
    __tablename__ = 'appointment_types'
    id = db.Column(db.Integer, primary_key=True)
    type = db.Column(db.String(255), unique=True, nullable=False)
    description = db.Column(db.Text, nullable=False)

    def __repr__(self):
        return (f"<AppointmentType id: {self.id} , type: {self.type}, description: {self.description} "
                f"appointments: {self.appointments} >")


class Appointment(db.Model):
    __tablename__ = 'appointments'
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id', ondelete='CASCADE'))
    appointment_type_id = db.Column(db.Integer, db.ForeignKey('appointment_types.id'))
    appointment_time = db.Column(db.DateTime)
    created_at = db.Column(db.DateTime)

    def __repr__(self):
        return (f"<Appointment id: {self.id}> user_id: {self.user_id}, location_id: {self.location_id}, "
                f"appointment_type_id: {self.appointment_type_id} , appointment_time: {self.appointment_time}"
                f"created_at: {self.created_at}>")

