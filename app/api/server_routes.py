from flask import Blueprint, jsonify, request
from app.models import db, Server, Channel, Message, User
from sqlalchemy.exc import IntegrityError
from flask_login import current_user

server_routes = Blueprint('servers', __name__)

# http://localhost:5000/channels/?title=firsttitle&description=someDescriptiveStuff&ownerId=1


# SERVER ROUTES:
@server_routes.route('/', methods=['POST'])
def new_server():

    print('befor dict!!!!!1', request.json)
    data = request.json
    title = data["title"]
    if title == '':
        return jsonify("bad data")
    try:
        new_server = {
            'title': data['title'],
            'ownerId': data['ownerId']
        }
        if 'image' in data and data["image"] != '':
            print('image here')
            new_server['image'] = data['image']
        new_server_db = Server(
            **new_server
        )
        db.session.add(new_server_db)
        db.session.commit()
        new_channel = {
            'title': 'General',
            'serverId': new_server_db.id
        }
        new_channel_db = Channel(
            **new_channel
        )
        db.session.add(new_channel_db)
        db.session.commit()

        # new_user = User(username=new_channel_db.title,
        #                 email=f'{new_channel_db.title}@channel.com', hashed_password='pbkdf2:sha256:2600000$PCG9')
        # db.session.add(new_user)
        # db.session.commit()
        new_message = Message(
            message=f'Welcome to #{new_channel_db.title}!', userId=2, channelId=new_channel_db.id)

        db.session.add(new_message)
        db.session.commit()

        new_server_db_dict = {
            'id': new_server_db.id,
            'title': new_server_db.title,
            'ownerId': new_server_db.ownerId,
            'generalId': new_channel_db.id
        }
        return new_server_db_dict
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
        server_list = [{'serverId': server.id, 'title': server.title,
                        'image': server.image if server.image else 'none', 'ownerId': server.ownerId} for server in servers]
        return jsonify(server_list)
    else:
        return jsonify("Servers not found in database for this user."), 404

# @server_routes.route('/<int:server_id>')
# def get_server(server_id):
#     pass
#     server = Server.query.filter(Server.id == server_id).first()
#     if server:
#         return server
#     else:
#         return jsonify("Server not found in database."), 404


@server_routes.route('/<int:server_id>/', methods=['PUT'])
def update_server(server_id):
    pass

    title = None
    image = None
    ownerId = None
    server = Server.query.filter(Server.id == server_id).first()

    if not request.json:
        return jsonify('bad data'), 400
    elif server:
        data = request.json
        print('DATA', data)
        if 'title' in data:
            server.title = data['title']
        if 'image' in data:
            server.image = data['image']
        if 'ownerId' in data:
            server.ownerId = data['ownerId']

        db.session.commit()
        return jsonify('updated server')

    else:
        return jsonify("server not found in database."), 404


@server_routes.route('/<int:server_id>/', methods=['DELETE'])
def delete_server(server_id):
    pass
    server = Server.query.filter(Server.id == server_id).first()
    if server:
        db.session.delete(server)
        db.session.commit()
        return jsonify('deleted server')
    else:
        return jsonify("server not found in database."), 404

# Channel Routes:


@server_routes.route('/<int:server_id>/', methods=["POST"])
def new_channel(server_id):
    data = request.get_json(force=True)
    title = data["title"]
    if title == '' or server_id == '':
        return jsonify("bad data")
    channel = Channel(title=title, serverId=server_id)
    db.session.add(channel)
    db.session.commit()

    # new_user = User(username=channel.title,
    #                 email=f'{channel.title}@channel.com', hashed_password='pbkdf2:sha256:2600000$PCG9')
    # db.session.add(new_user)
    # db.session.commit()
    new_message = Message(
        message=f'Welcome to #{channel.title}!', userId=2, channelId=channel.id)

    db.session.add(new_message)
    db.session.commit()
    return jsonify({"id": channel.id, "title": channel.title, "serverId": channel.serverId})


@server_routes.route('/<int:server_id>/')
def get_all_channels(server_id):
    channels = Channel.query.filter(
        Channel.serverId == server_id).all()
    server = Server.query.filter(
        Server.id == server_id).first()
    length = Channel.query.filter(Channel.serverId == server_id).count()
    if length:
        channels_list = [{"id": channel.id, "title": channel.title,
                          "serverId": channel.serverId} for channel in channels]
        servers_list = {"id": server.id, "title": server.title,
                        "image": server.image, "ownerId": server.ownerId}
        return jsonify(channels_list, servers_list)
    else:
        return jsonify("no servers with that channel")


@server_routes.route('/<int:server_id>/<int:channel_id>/', methods=["PUT"])
def edit_channel(server_id, channel_id):
    data = request.get_json(force=True)
    channel = Channel.query.filter(Channel.id == channel_id).first()
    title = data["title"]
    if channel:
        channel.title = title
        db.session.commit()
        return jsonify({"title": title})
    else:
        return jsonify("Channel Dosnt Exsist")


@server_routes.route('/<int:server_id>/<int:channel_id>/', methods=["DELETE"])
def delete_channel(server_id, channel_id):
    channel = Channel.query.filter(Channel.id == channel_id).first()
    if channel:
        db.session.delete(channel)
        db.session.commit()
        return jsonify("Success")
    else:
        return jsonify("Failed to Delete")
