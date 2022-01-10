from flask import Blueprint, jsonify, request
from app.models import db, Server
from sqlalchemy.exc import IntegrityError
from flask_login import current_user

server_routes = Blueprint('servers', __name__)

# http://localhost:5000/channels/?title=firsttitle&description=someDescriptiveStuff&ownerId=1

@server_routes.route('/', methods=['POST'])
def new_server():
    if not request.args:
        return jsonify('bad data'), 400
    elif len(request.args) < 3:
        return jsonify('Missing arguments'), 400

    else:
        print('befor dict!!!!!1')
        data = dict(request.args)
        print('AFTER dict!!!!!1')
        try:
            new_server = {
                'title': data['title'],
                'description': data['description'],
                'ownerId': data['ownerId']
            }
            
            if 'image' in data:
                print('image here')
                new_server['image'] = data['image']

            new_server_db = Server(
                **new_server
            )

            db.session.add(new_server_db)
            db.session.commit()
            return new_server
        except IntegrityError as e:
            print(e)
            return jsonify('Database entry error'), 400


@server_routes.route('/')
def get_all_server():
    # if current_user.is_authenticated:
    #     user = current_user.to_dict()

    # servers = Server.query.filter(Server.ownerId == user.id).all()
    servers = Server.query.all()
    if servers:
        servers_dict = {server.id: {'title': server.title, 'description': server.description, 'image': server.image if server.image else 'none', 'ownerId': server.ownerId } for server in servers }
        print('!!!!!!!0000000 servers_dict', servers_dict)
        return jsonify(servers_dict)
    else:
        return jsonify("Servers not found in database for this user."), 404

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
