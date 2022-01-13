from flask import Blueprint, jsonify, request
from sqlalchemy import exc
from app.models import db, Server, Channel, Message, User, Reaction
from sqlalchemy.exc import IntegrityError
from flask_login import current_user
from sqlalchemy import desc


reaction_routes = Blueprint('reactions', __name__)

# New Reaction
@reaction_routes.route('/')
def test_base():
    print('Hitting reaction route')
    return '{}'

@reaction_routes.route('/<int:message_id>/', methods=['POST'])
def new_reaction(message_id):
    print('HITTING ROUTE')
    # userId = None
    # if current_user.is_authenticated:
    #         user = current_user.to_dict()
    #         userId = user['id']

    # if not request.data:
    #     return jsonify('bad data'), 400

    # else:
    data = request.json
    try:
        new_reaction = {
            "messageId": message_id,
            "reaction": data['reaction'],
            'userId': 1
        }

        new_reaction_db = Reaction(**new_reaction)
        db.session.add(new_reaction_db)
        db.session.commit()
        return new_reaction

    except IntegrityError as e:
        print(e)
        return jsonify('Database error.'), 400
