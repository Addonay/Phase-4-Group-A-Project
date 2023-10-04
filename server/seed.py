from flask import Flask
from models import db, Inquiry, User, NotificationPreference, Notification, Review, Rating
from config import Config
import datetime

app = Flask(__name__)
app.config.from_object(Config)

# Initialize the database
db.init_app(app)

def seed_data():
    with app.app_context():
        db.create_all()

          # Seed the User table with initial data
        user1 = User.query.filter_by(username="user1").first()
        if not user1:
            user1 = User(username="user1")
            db.session.add(user1)

        user2 = User.query.filter_by(username="user2").first()
        if not user2:
            user2 = User(username="user2")
            db.session.add(user2)

        db.session.commit()

        # Seed the Inquiry table with initial data
        inquiry1 = Inquiry(name="John Doe", email="johndoe@example.com", message="I'm interested in your product.")
        inquiry2 = Inquiry(name="Alice Smith", email="alice@example.com", message="Please provide more information about your service.")
        db.session.add_all([inquiry1, inquiry2])
        db.session.commit()

        # Seed the NotificationPreference table with initial data
        preference1 = NotificationPreference(user_id=user1.id, notification_type="email")
        preference2 = NotificationPreference(user_id=user2.id, notification_type="sms")
        db.session.add_all([preference1, preference2])
        db.session.commit()

        # Seed the Notification table with initial data
        notification1 = Notification(user_id=user1.id, message="You have a new message.", timestamp=datetime.datetime.now())
        notification2 = Notification(user_id=user2.id, message="New product available.", timestamp=datetime.datetime.now())
        db.session.add_all([notification1, notification2])
        db.session.commit()

        # Seed the Review table with initial data
        review1 = Review(rating=4, comment="Great product!")
        review2 = Review(rating=5, comment="Excellent service!")
        db.session.add_all([review1, review2])
        db.session.commit()

        # Seed the Rating table with initial data
        rating1 = Rating(stars=5, description="Highly recommended!")
        rating2 = Rating(stars=4, description="Very good!")
        db.session.add_all([rating1, rating2])
        db.session.commit()

if __name__ == "__main__":
    seed_data()
