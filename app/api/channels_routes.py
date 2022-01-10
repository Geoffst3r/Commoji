from flask import Blueprint, jsonify, request
from app.models import db, Channel

channels_routes = Blueprint('channels', __name__)


@channels_routes.route('/', method=["POST"])
def new_channel():
    title = request.args.get(key="title", default=None, type=None)
    serverId = request.args.get(key="serverId", default=None, type=None)
    serverId = int(serverId)
    if title == None or serverId == None:
        return jsonify("bad data")
    channel = Channel(title=title, serverId=serverId)
    db.session.add(channel)
    db.session.commit()
    return jsonify({"id": channel.id, "book_id": channel.book_id, "value": channel.value, "email": channel.email})


@channels_routes.route('/<int:server_id>')
def get_all_channels():

    return


@channels_routes.route('/<int:server_id>', method=["PUT"])
def edit_channel():

    return


@channels_routes.route('/<int:server_id>', method=["DELETE"])
def delete_channel():

    return
