from app.models import db, Channel


# Adds a demo user, you can add other users here if you want
def seed_channels():
    channel1 = Channel(
        title='This is for seeding data, need to update', serverId=1)
    channel2 = Channel(
        title='This is for seeding data, need to update', serverId=2)
    channel3 = Channel(
        title='This is for seeding data, need to update', serverId=3)

    db.session.add(channel1)
    db.session.add(channel2)
    db.session.add(channel3)

    db.session.commit()


# Uses a raw SQL query to TRUNCATE the users table.
# SQLAlchemy doesn't have a built in function to do this
# TRUNCATE Removes all the data from the table, and RESET IDENTITY
# resets the auto incrementing primary key, CASCADE deletes any
# dependent entities
def undo_channels():
    db.session.execute('TRUNCATE channels RESTART IDENTITY CASCADE;')
    db.session.commit()
