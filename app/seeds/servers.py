from app.models import db, Server


# Adds a demo user, you can add other users here if you want
def seed_servers():
    server1 = Server(
        title='Demo', description='This is for seeding data, need to update',
        ownerId=1)
    server2 = Server(
        title='Demo2', description='This is for seeding data, need to update',
        ownerId=2)
    server3 = Server(
        title='Demo3', description='This is for seeding data, need to update',
        ownerId=3)

    db.session.add(server1)
    db.session.add(server2)
    db.session.add(server3)

    db.session.commit()


# Uses a raw SQL query to TRUNCATE the users table.
# SQLAlchemy doesn't have a built in function to do this
# TRUNCATE Removes all the data from the table, and RESET IDENTITY
# resets the auto incrementing primary key, CASCADE deletes any
# dependent entities
def undo_servers():
    db.session.execute('TRUNCATE servers RESTART IDENTITY CASCADE;')
    db.session.commit()
