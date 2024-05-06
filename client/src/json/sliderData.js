import {
  RxCrop,
  RxPencil2,
  RxReader,
  RxRocket,
  RxAccessibility,
} from "react-icons/rx";

import Appointments from '../images/Appointment.jpg';
import Medication from '../images/medication.jpg';
import MentalHealth from '../images/mentalHealth.jpg';
import Symptom from '../images/Symptom.jpg';
import Health from '../images/healthAdvice.jpg';


/**
 * 
 * @constant services
 * @description - This constant is used to store the services data.
 * @type {Array<Object>}
 * 
 */
export const services = [
    {
        "icon": RxCrop,
        "title": "Appointments",
        "content": "Seamless scheduling for your busy life.",
        "backgroundImage": Appointments
    },
    {
        "icon": RxPencil2,
        "title": "Medication Information",
        "content": "Empower yourself with medication insights.",
        "backgroundImage": Medication
    },
    {
        "icon": RxRocket,
        "title": "Mental Health Support",
        "content": "Find compassion and tools for mental wellness.",
        "backgroundImage": MentalHealth
    },
    {
        "icon": RxReader,
        "title": "Symptom Checking",
        "content": "Personalized insights for better health decisions.",
        "backgroundImage": Symptom
    },
    {
        "icon": RxAccessibility,
        "title": "Health Advice",
        "content": "Expert advice, anytime, anywhere.",
        "backgroundImage": Health
    }
]

