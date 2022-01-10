from flask import Blueprint, jsonify, request
from app.models import db, Server
from sqlalchemy.exc import IntegrityError

server_routes = Blueprint('channels', __name__)

# http://localhost:5000/ratings/title=firsttitle&description=someDescriptiveStuff&ownerId=1

@server_routes.route('/', methods=['POST'])
def new_server():
    pass
    if not request.args:
        return jsonify('bad data'), 400
    elif len(request.args) < 3:
        return jsonify('Missing arguments'), 400

    else:
        data = dict(request.args)
        try:

            new_server = {
                'title': data['title'],
                'description': data['description'],
                'ownerId': data['ownerId']
            }

            if data['image']:
                new_server['image'] = data['image']

            new_server_db = Server(
                **new_server
            )
            return new_server
        except IntegrityError as e:
            print(e)
            return jsonify('Database entry error'), 400


@server_routes.route('/<int:server_id>')
def get_server(server_id):
    pass
    # server = Server.query.filter(Server.id == server_id).first()
    # if server:
    #     return server
    # else:
    #     return jsonify("Server not found in database."), 404


@server_routes.route('/<int:server_id>', methods=['PUT'])
def update_server(server_id):
    pass
    
    # title = None
    # description = None
    # image = None
    # ownerId = None
    # server = Server.query.filter(Server.id == server_id).first()

    # if not request.args:
    #         return jsonify('bad data'), 400
    # elif server:
    #     data = dict(request.args)
    #     if data['title']:
    #       server.title = data['title']
    #     if data['description']:
    #       server.description = data['description']
    #     if data['image']:
    #       server.image = data['image']
    #     if data['ownerId']:
    #       server.ownerId = data['ownerId']
    #     db.session.commit
          # return server

    # else:
    #     return jsonify("server not found in database."), 404


@server_routes.route('/<int:server_id>', methods=['DELETE'])
def delete_server(server_id):
    pass
    
    # server = Server.query.filter(Server.id == server_id).first()
    # if server:
    #     db.session.delete(server)
    #     return server
    # else:
    #     return jsonify("server not found in database."), 404
