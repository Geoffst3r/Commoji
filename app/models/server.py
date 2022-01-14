from .db import db
from .user import User


class Server(db.Model):
    __tablename__ = "servers"

    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(100), nullable=False)
    image = db.Column(db.String(255))
    ownerId = db.Column(db.Integer, db.ForeignKey(User.id), nullable=False)

    owner_relation = db.relationship("User", back_populates="servers_relation")
    channels_relation = db.relationship(
        "Channel", back_populates="server_relation", cascade="all, delete")
