from app.models import db, Reaction


# Adds a demo user, you can add other users here if you want
def seed_reactions():
    reaction1 = Reaction(reaction='far fa-grin-beam fa-2x', userId=1, messageId=1)
    reaction2 = Reaction(reaction='far fa-grin-beam fa-2x', userId=2, messageId=2)
    reaction3 = Reaction(reaction='far fa-grin-beam fa-2x', userId=3, messageId=3)

    db.session.add(reaction1)
    db.session.add(reaction2)
    db.session.add(reaction3)

    db.session.commit()


# Uses a raw SQL query to TRUNCATE the users table.
# SQLAlchemy doesn't have a built in function to do this
# TRUNCATE Removes all the data from the table, and RESET IDENTITY
# resets the auto incrementing primary key, CASCADE deletes any
# dependent entities
def undo_reactions():
    db.session.execute('TRUNCATE reactions RESTART IDENTITY CASCADE;')
    db.session.commit()
