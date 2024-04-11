import sys
sys.path.append("..")
from app.Models import AppointmentType


def fetch_appointment_type_offered():
    types = AppointmentType.query.all()
    appointments_offered = []
    for appointment_type in types:
        appointments_offered.append({
            "type": appointment_type.type,
            "description": appointment_type.description
        })
    return appointments_offered
