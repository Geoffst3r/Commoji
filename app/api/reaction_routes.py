import json
from flask import Blueprint, jsonify, request
from sqlalchemy import exc
from app.models import db, Server, Channel, Message, User, Reaction
from sqlalchemy.exc import IntegrityError
from flask_login import current_user
from sqlalchemy import desc


reaction_routes = Blueprint('reactions', __name__)

# New Reaction
@reaction_routes.route('/')
def all_reactions():
    reactions = Reaction.query.all()
    if reactions:
        reaction_list = [{'id': reaction.id,
                            'reaction': reaction.reaction,
                            'userId': reaction.userId,
                            'messageId': reaction.messageId,} for reaction in reactions]
    return jsonify(reaction_list)

@reaction_routes.route('/<int:message_id>/', methods=['GET'])
def get_reactions(message_id):
    reactions = Reaction.query.filter(Reaction.messageId == message_id).all()
    if reactions:
        reaction_list = [{'id': reaction.id,
                            'reaction': reaction.reaction,
                            'userId': reaction.userId,
                            'messageId': reaction.messageId,} for reaction in reactions]
    return jsonify(reaction_list)


@reaction_routes.route('/<int:message_id>/', methods=['POST'])
def new_reaction(message_id):
    userId = None
    if current_user.is_authenticated:
            user = current_user.to_dict()
            userId = user['id']

    if not request.data:
        msg = 'bad data'
        return jsonify(msg), 400

    else:
        data = request.get_json(force=True)
        try:
            existing_reaction = Reaction.query.filter(
                Reaction.userId == userId,
                Reaction.messageId == message_id,
                Reaction.reaction == data['reaction']
                ).first()
            if existing_reaction:
                db.session.delete(existing_reaction)
                db.session.commit()
                output = {'id': existing_reaction.id, 'userId': existing_reaction.userId,
                    'messageId': existing_reaction.messageId, 'reaction': existing_reaction.reaction,
                    'msg': 'reaction removed'}
                return jsonify(output)
            else:
                new_reaction = {
                    "messageId": message_id,
                    "reaction": data['reaction'],
                    'userId': userId
                }

                new_reaction_db = Reaction(**new_reaction)
                db.session.add(new_reaction_db)
                db.session.commit()
                output = {'id': new_reaction_db.id, 'userId': new_reaction_db.userId,
                    'messageId': new_reaction_db.messageId, 'reaction': new_reaction_db.reaction,
                    'msg': 'success'}
                return jsonify(output)

        except IntegrityError as e:
            print(e)
            return jsonify('Database error.'), 400
