import sys
sys.path.append("..")
from app.Models import User


def get_user_name(user_id):
    user = User.query.filter_by(id=user_id).first()
    if user:
        return {
            'first_name': user.first_name,
            'last_name': user.last_name
        }
    else:
        return None

