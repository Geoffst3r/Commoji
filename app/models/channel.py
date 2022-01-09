from .db import db
from .server import Server

class Channel(db.Model):
    __tablename__ = "channels"

    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.Text, nullable=False)
    serverId = db.Column(db.Integer, db.ForeignKey(Server.id), nullable=False)

    server_relation = db.relationship("Server", back_populates="channels_relation")
    messages_relation = db.relationship("Message", back_populates="channel_relation", cascade="all, delete")
