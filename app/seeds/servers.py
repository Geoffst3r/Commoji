from app.models import db, Server


# Adds a demo user, you can add other users here if you want
def seed_servers():
    server1 = Server(
        title='Fruit Seeds', description='This is for seeding data, need to update',
        ownerId=2,
        image="https://cdn.shopify.com/s/files/1/1061/1924/products/16_large.png"
        )
    server2 = Server(
        title='Vegetable Seeds', description='This is for seeding data, need to update',
        ownerId=2,
        image="https://image.emojisky.com/542/2542-middle.png")
    # server3 = Server(
    #     title='Tree Seeds', description='This is for seeding data, need to update',
    #     ownerId=3,
    #     image="https://hotemoji.com/images/dl/1/devil-emoji-by-twitter.png")

    db.session.add(server1)
    db.session.add(server2)
    # db.session.add(server3)

    db.session.commit()


# Uses a raw SQL query to TRUNCATE the users table.
# SQLAlchemy doesn't have a built in function to do this
# TRUNCATE Removes all the data from the table, and RESET IDENTITY
# resets the auto incrementing primary key, CASCADE deletes any
# dependent entities
def undo_servers():
    db.session.execute('TRUNCATE servers RESTART IDENTITY CASCADE;')
    db.session.commit()
