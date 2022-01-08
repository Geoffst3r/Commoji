from flask import Blueprint, jsonify, request
# from app.models import Server
from sqlalchemy.exc import IntegrityError

server_routes = Blueprint('users', __name__)


@server_routes.route('/', methods=['POST'])
def new_server():
    pass
    # if not request.args:
    #     return jsonify('bad data'), 400
    # elif len(request.args) != 4:
    #     return jsonify('Missing arguments'), 400

    # else:
    #     data = dict(request.args)
    #     try:

    #         new_server = {
    #             'title': data['title'],
    #             'description': data['description'],
    #             'ownerId': data['ownerId']
    #         }

    #         if data['image']:
    #             new_server['image'] = data['image']

    #         new_server_db = Server(
    #             **new_server
    #         )
    #         return new_server
    #     except IntegrityError as e:
    #         print(e)
    #         return jsonify('Database entry error'), 400

