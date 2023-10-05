# from app import app, db
# from models import Brand

# # Your initial brand data
# initial_brands = [
#     {
#         "name": "Honda",
#         "image_url": "https://tinyurl.com/4d7xb2t6",
#     },
#     {
#         "name": "Subaru",
#         "image_url": "https://tinyurl.com/4ffmyduh",
#     },
#     {
#         "name": "Mazda",
#         "image_url": "https://tinyurl.com/jww4dpy4",
#     },
#     {
#         "name": "Ford",
#         "image_url": "https://tinyurl.com/j6dzasyz",
#     },
#     {
#         "name": "Nissan",
#         "image_url": "https://tinyurl.com/yn7u49sm",
#     },
#     {
#         "name": "Audi",
#         "image_url": "https://tinyurl.com/yc56c6sd",
#     },
#     {
#         "name": "Ferrari",
#         "image_url": "https://tinyurl.com/3xycc435",
#     },
#     {
#         "name": "Tesla",
#         "image_url": "https://tinyurl.com/3x3fvs3b",
#     },
# ]


# def seed_brands():
#     # Create an application context
#     with app.app_context():
#         # Create the database tables if they don't exist
#         db.create_all()

#         # Seed the database with initial brand data
#         for brand_data in initial_brands:
#             brand = Brand(
#                 name=brand_data["name"],
#                 image_url=brand_data["image_url"],
#             )
#             db.session.add(brand)

#         # Commit the changes to the database
#         db.session.commit()

# if __name__ == '__main__':
#     seed_brands()

# from app import app, db  # Import your Flask app and SQLAlchemy instance
# from models import User  # Import your User model

# # Your initial user data
# initial_users = [
#     {
#         "username": "user4",
#         "email": "user4@example.com",
#         "password": "password4",
#         "profile_image": "https://example.com/profile1.jpg",
#     },
#     {
#         "username": "user5",
#         "email": "user5@example.com",
#         "password": "password5",
#         "profile_image": "https://example.com/profile2.jpg",
#     },
#     {
#         "username": "user6",
#         "email": "user6@example.com",
#         "password": "password6",
#         "profile_image": "https://example.com/profile3.jpg",
#     },
#     {
#         "username": "admin",
#         "email": "admin@cars.com",
#         "password": "adminpassword",
#         "profile_image": "https://example.com/admin1.jpg",
#         "user_role": "admin",  # Admin user
#     },
# ]

# def seed_users():
#     # Create an application context
#     with app.app_context():
#         # Create the database tables if they don't exist
#         db.create_all()

#         # Seed the database with initial user data
#         for user_data in initial_users:
#             user = User(
#                 username=user_data["username"],
#                 email=user_data["email"],
#                 password=user_data["password"],
#                 profile_image=user_data["profile_image"],
#             )
#             db.session.add(user)

#         # Commit the changes to the database
#         db.session.commit()

# if __name__ == '__main__':
#     seed_users()


from app import app, db
from models import Car, Brand, Admin

# Your initial car data
initial_cars = [
    {
        "make": "Mazda",
        "model": "Camry",
        "year": 2022,
        "price": 28000.0,
        "description": "A popular midsize sedan.",
        "image_url": "https://tinyurl.com/5a9e9wkm",
        "admin_id": 1,  
        "brand_id": 3,  
    },
    {
        "make": "Ford",
        "model": "Mustang",
        "year": 2022,
        "price": 45000.0,
        "description": "A classic American muscle car.",
        "image_url": "https://tinyurl.com/2p9jxndf",
        "admin_id": 1,  
        "brand_id": 4,  
    },
    {
        "make": "Nissan",
        "model": "Rogue",
        "year": 2022,
        "price": 32000.0,
        "description": "A popular compact SUV.",
        "image_url": "https://tinyurl.com/3xckpebe",
        "admin_id": 1,  
        "brand_id": 5,  
    },
    {
        "make": "Audi",
        "model": "A4",
        "year": 2022,
        "price": 48000.0,
        "description": "A luxury compact sedan.",
        "image_url": "https://tinyurl.com/44rm76rn",
        "admin_id": 1,  
        "brand_id": 6,  
    },
    {
        "make": "Ferrari",
        "model": "488 GTB",
        "year": 2022,
        "price": 300000.0,
        "description": "An exotic sports car.",
        "image_url": "https://tinyurl.com/mr4brn2f",
        "admin_id": 1,  
        "brand_id": 7,  
    },
    {
        "make": "Tesla",
        "model": "Model 3",
        "year": 2022,
        "price": 55000.0,
        "description": "An electric luxury sedan.",
        "image_url": "https://tinyurl.com/3yymfaa9",
        "admin_id": 1,  
        "brand_id": 8,  
    },
]

def seed_cars():
    # Create an application context
    with app.app_context():
        # Create the database tables if they don't exist
        db.create_all()

        # Seed the database with initial car data
        for car_data in initial_cars:
            car = Car(
                make=car_data["make"],
                model=car_data["model"],
                year=car_data["year"],
                price=car_data["price"],
                description=car_data["description"],
                image_url=car_data["image_url"],
                admin_id=car_data["admin_id"],
                brand_id=car_data["brand_id"],
            )
            db.session.add(car)

        # Commit the changes to the database
        db.session.commit()

if __name__ == '__main__':
    seed_cars()
