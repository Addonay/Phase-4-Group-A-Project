from app import app, db
from models import User

# Your initial user data
initial_users = [
    {
        "username": "user4",
        "email": "user4@example.com",
        "password": "password4",
        "profile_image": "https://tinyurl.com/mr3knads",
    },
    {
        "username": "user5",
        "email": "user5@example.com",
        "password": "password5",
        "profile_image": "https://tinyurl.com/mr3knads",
    },
    {
        "username": "user6",
        "email": "user6@example.com",
        "password": "password6",
        "profile_image": "https://tinyurl.com/mr3knads",
    },
    {
        "username": "admin",
        "email": "admin@cars.com",
        "password": "adminpassword",
        "profile_image": "https://tinyurl.com/mr3knads",
        "user_role": "admin",  # Admin user
    },
]

def seed_users():
    # Create an application context
    with app.app_context():
        # Create the database tables if they don't exist
        db.create_all()

        # Seed the database with initial user data
        for user_data in initial_users:
            user = User(
                username=user_data["username"],
                email=user_data["email"],
                password=user_data["password"],
                profile_image=user_data["profile_image"],
                user_role=user_data.get("user_role", "client"),  # Default role is "client"
            )
            db.session.add(user)

        # Commit the changes to the database
        db.session.commit()

if __name__ == '__main__':
    seed_users()

from app import app, db
from models import Admin, Review

# Seed data for the Admin table
def seed_admin():
    # Create an application context
    with app.app_context():
        # Create the database tables if they don't exist
        db.create_all()

        # Check if there is an admin user with the username "admin"
        admin = Admin.query.filter_by(username="admin").first()

        # If there's no admin user, create one
        if not admin:
            admin = Admin(
                username="admin",
                email="admin@cars.com",
                password="adminpassword",
                profile_image="https://tinyurl.com/mr3knads",
            )
            db.session.add(admin)

        # Commit the changes to the database
        db.session.commit()

# Seed data for the Review table
def seed_reviews():
    # Create an application context
    with app.app_context():
        # Create the database tables if they don't exist
        db.create_all()

        # Sample reviews data
        sample_reviews = [
            {
                "username": "user4",
                "car_make": "Mazda",
                "comment": "Great car!",
            },
            {
                "username": "user5",
                "car_make": "Ford",
                "comment": "Love the Mustang!",
            },
            {
                "username": "user6",
                "car_make": "Nissan",
                "comment": "Rogue is awesome!",
            },
        ]

        # Seed the database with sample reviews
        for review_data in sample_reviews:
            review = Review(
                username=review_data["username"],
                car_make=review_data["car_make"],
                comment=review_data["comment"],
            )
            db.session.add(review)

        # Commit the changes to the database
        db.session.commit()

if __name__ == '__main__':
    seed_admin()
    seed_reviews()
