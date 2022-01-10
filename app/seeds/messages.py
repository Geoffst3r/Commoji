from app.models import db, Message


# Adds a demo user, you can add other users here if you want
def seed_messages():
    message1 = Message(channelId=1, userId=1, message="Testing")
    message2 = Message(channelId=2, userId=2, message="Testing")
    message3 = Message(channelId=3, userId=3, message="Testing")

    db.session.add(message1)
    db.session.add(message2)
    db.session.add(message3)

    db.session.commit()


# Uses a raw SQL query to TRUNCATE the users table.
# SQLAlchemy doesn't have a built in function to do this
# TRUNCATE Removes all the data from the table, and RESET IDENTITY
# resets the auto incrementing primary key, CASCADE deletes any
# dependent entities
def undo_messages():
    db.session.execute('TRUNCATE messages RESTART IDENTITY CASCADE;')
    db.session.commit()
