from flask import Blueprint, jsonify, request
from app.models import db, Channel, Server

channels_routes = Blueprint('channels', __name__)


@channels_routes.route('/<int:server_id>', methods=["POST"])
def new_channel(server_id):
    title = request.json["title"]
    serverId = request.json["serverId"]
    if title == None or serverId == None:
        return jsonify("bad data")
    channel = Channel(title=title, serverId=serverId)
    db.session.add(channel)
    db.session.commit()
    return jsonify({"id": channel.id, "title": channel.title, "serverId": channel.serverId})


@channels_routes.route('/<int:server_id>')
def get_all_channels(server_id):
    channels = Channel.query.filter(
        Channel.serverId == server_id).all()
    servers = Server.query.filter(
        Server.id == server_id).all()
    length = Channel.query.filter(Channel.serverId == server_id).count()
    if length:
        channels_list = [{"id": channel.id, "title": channel.title,
                          "serverId": channel.serverId} for channel in channels]
        servers_list = [{"id": server.id, "title": server.title,
                         "description": server.description, "image": server.image, "ownerId": server.ownerId} for server in servers]
        return jsonify(channels_list, servers_list)
    else:
        return jsonify("no servers with that channel")


@channels_routes.route('/<int:server_id>/<int:channel_id>', methods=["PUT"])
def edit_channel(server_id, channel_id):
    channel = Channel.query.filter(Channel.id == channel_id).first()
    title = request.json["title"]
    serverId = request.json["serverId"]
    if channel:
        channel.title = title
        channel.id = serverId
        db.session.commit()
        return jsonify({"title": title, "serverId": serverId})
    else:
        return jsonify("Channel Dosnt Exsist")


@ channels_routes.route('/<int:server_id>/<int:channel_id>', methods=["DELETE"])
def delete_channel(server_id, channel_id):
    channel = Channel.query.filter(Channel.id == channel_id).first()
    if channel:
        db.session.delete(channel)
        db.session.commit()
        return jsonify("Success")
    else:
        return jsonify("Failed to Delete")
    return
