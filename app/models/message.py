from .db import db
from .user import User
from .channel import Channel

class Message(db.Model):
    __tablename__ = "messages"

    id = db.Column(db.Integer, primary_key=True)
    message = db.Column(db.Text, nullable=False)
    userId = db.Column(db.Integer, db.ForeignKey(User.id), nullable=False)
    channelId = db.Column(db.Integer, db.ForeignKey(Channel.id), nullable=False)

    user_relation = db.relationship("User", back_populates="messages_relation")
    channel_relation = db.relationship("Channel", back_populates="messages_relation")
    reactions_relation = db.relationship("Reaction", back_populates="message_relation", cascade="all, delete")
