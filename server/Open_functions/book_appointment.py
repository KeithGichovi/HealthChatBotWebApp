import sys
sys.path.append("..")
from app.Models import Appointment, db
from datetime import datetime


def book_appointment(user_id, appointment_type_id, appointment_datetime, notes):
    current_time = datetime.now()
    existing_appointments = Appointment.query.filter_by(user_id=user_id).all()
    already_booked = []

    for x in existing_appointments:
        if x.appointment_time >= current_time:
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
        user_id=user_id,
        appointment_type_id=appointment_type_id,
        appointment_time=appointment_datetime,
        notes=notes,
        created_at=datetime.utcnow()
    )
    db.session.add(new_appointment)
    db.session.commit()
    return {
        "Appointment_time": new_appointment.appointment_time.strftime("%Y-%m-%dT%H:%M:%S"),
        "Notes": new_appointment.notes,
        "booking time": new_appointment.created_at.strftime("%Y-%m-%dT%H:%M:%S")
    }
