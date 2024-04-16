import json
import sys
sys.path.append("..")
from app.Models import Appointment, db
from datetime import datetime


class ManageBooking:
    def __init__(self, user_id):
        self.now = datetime.now()
        self.user_id = user_id
        self.existing_appointment = Appointment.query.filter_by(user_id=self.user_id).all()

    def get_bookings(self):
        appointments_json = []
        for appointment in self.existing_appointment:
            appointments_json.append({
                "appointment_time": appointment.appointment_time.strftime("%Y-%m-%d %H:%M:%S"),
                "appointment_type_id": appointment.appointment_type_id,
            })
        return json.dumps(appointments_json)

    def appointment_history(self):
        return self.existing_appointment

    def manage_booking_by_time(self, new_appointment_time, new_appointment_end_time):
        bookings = self.existing_appointment

        if bookings:
            for appointment in bookings:
                if appointment.appointment_time >= self.now:
                    appointment.appointment_time = new_appointment_time
                    appointment.appointment_end_time = new_appointment_end_time
                    db.session.commit()
                    return {
                        "message": "Appointment datetime successfully updated",
                        "appointment_id": appointment.id,
                        "user_id": appointment.user_id,
                        "appointment_time": appointment.appointment_time.strftime("%Y-%m-%d %H:%M:%S"),
                        "notes": appointment.notes
                    }
        else:
            return {
                "message": "no appointments found, under your name"
            }

    def manage_booking_by_appointment_type(self, new_appointment_type):
        if self.existing_appointment:
            if self.existing_appointment.appointment_type >= self.now:
                self.existing_appointment.appointment_type = new_appointment_type
                db.session.commit()
                return {
                    "message": "Appointment datetime successfully updated",
                    "appointment_id": self.existing_appointment.id,
                    "user_id": self.existing_appointment.user_id,
                    "appointment_time": self.existing_appointment.appointment_time.strftime("%Y-%m-%d %H:%M:%S"),
                    "notes": self.existing_appointment.notes
                }
        else:
            return {
                "message": "no appointments found, under your name"
            }

    def cancel_booking(self):
        if self.existing_appointment:
            for x in self.existing_appointment:
                if x.appointment_time >= self.now:
                    db.session.delete(x)
                    db.session.commit()
                    return {
                        "message": "successfully cancelled appointment"
                    }
        else:
            return {
                "message": "no appointments found"
            }

    def book_appointment(self, appointment_type_id, appointment_datetime, notes, appointment_end_time):
        already_booked = []
        for x in self.existing_appointment:
            if x.appointment_time >= self.now:
                already_booked.append({
                    "appointment_time": x.appointment_time.strftime("%Y-%m-%dT%H:%M:%S"),
                    "notes": x.notes
                })

        if already_booked:
            return {
                "message": "You have already booked the following appointment(s)",
                "appointments": already_booked
            }

        new_appointment = Appointment(
            user_id=self.user_id,
            appointment_type_id=appointment_type_id,
            appointment_time=appointment_datetime,
            notes=notes,
            appointment_end_time=appointment_end_time,
            created_at=datetime.utcnow()
        )
        db.session.add(new_appointment)
        db.session.commit()
        return {
            "Appointment_time": new_appointment.appointment_time.strftime("%Y-%m-%dT%H:%M:%S"),
            "Notes": new_appointment.notes,
            "booking time": new_appointment.created_at.strftime("%Y-%m-%dT%H:%M:%S")
        }

