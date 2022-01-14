from flask import Blueprint, jsonify, request
from app.models import db, Server, Channel, Message, User
from sqlalchemy.exc import IntegrityError
from flask_login import current_user
from sqlalchemy import desc
import json


message_routes = Blueprint('messages', __name__)

# http://localhost:5000/channels/?title=firsttitle&description=someDescriptiveStuff&ownerId=1


# SERVER ROUTES:
@message_routes.route('/<int:channel_id>/', methods=['POST'])
def new_message(channel_id):
    userId = None
    if current_user.is_authenticated:
            user = current_user.to_dict()
            userId = user['id']

    if not request.data:
        return jsonify('bad data'), 400

    else:
        data = request.json
        try:
            new_message = {
                'message': data['message'],
                'userId': userId,
                # 'userId': user.id
                'channelId': channel_id
            }

            new_message_db = Message(
                **new_message
            )

            db.session.add(new_message_db)
            db.session.commit()
            return new_message

        except IntegrityError as e:
            print(e)
            return jsonify('Database entry error'), 400

date_handler = lambda obj: (
    obj.isoformat()
    if isinstance(obj, (datetime.datetime, datetime.date))
    else None
)

@message_routes.route('/<int:channel_id>/')
def get_all_messages(channel_id):
    messages = db.session.query(Message, User).join(User).filter(Message.channelId == channel_id).all()
    if messages:
        message_list = [{'id': message.id, 'message': message.message, 'userId': message.userId,
                        'channelId': message.channelId, 'username': user.username, 'timeStamp': json.dumps(message.created_on.isoformat())} for message, user in messages]

        print('****************   ******* messages', message_list[0]['timeStamp'])
        return jsonify(message_list)
    else:
        return jsonify("Messages not found in database for this channel."), 404
