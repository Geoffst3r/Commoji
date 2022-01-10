from .db import db
from .message import Message
from .user import User

class Reaction(db.Model):
    __tablename__ = "reactions"

    id = db.Column(db.Integer, primary_key=True)
    reaction = db.Column(db.String(50), nullable=False)
    userId = db.Column(db.Integer, db.ForeignKey(User.id), nullable=False)
    messageId = db.Column(db.Integer, db.ForeignKey(Message.id), nullable=False)

    user_relation = db.relationship("User", back_populates="reactions_relation")
    message_relation = db.relationship("Message", back_populates="reactions_relation")
