from app import app, db
from models import Brand

# Your initial brand data
initial_brands = [
    {
        "name": "Honda",
        "image_url": "https://tinyurl.com/4d7xb2t6",
    },
    {
        "name": "Subaru",
        "image_url": "https://tinyurl.com/4ffmyduh",
    },
    {
        "name": "Mazda",
        "image_url": "https://tinyurl.com/jww4dpy4",
    },
    {
        "name": "Ford",
        "image_url": "https://tinyurl.com/j6dzasyz",
    },
    {
        "name": "Nissan",
        "image_url": "https://tinyurl.com/yn7u49sm",
    },
    {
        "name": "Audi",
        "image_url": "https://tinyurl.com/yc56c6sd",
    },
    {
        "name": "Ferrari",
        "image_url": "https://tinyurl.com/3xycc435",
    },
    {
        "name": "Tesla",
        "image_url": "https://tinyurl.com/3x3fvs3b",
    },
]


def seed_brands():
    # Create an application context
    with app.app_context():
        # Create the database tables if they don't exist
        db.create_all()

        # Seed the database with initial brand data
        for brand_data in initial_brands:
            brand = Brand(
                name=brand_data["name"],
                image_url=brand_data["image_url"],
            )
            db.session.add(brand)

        # Commit the changes to the database
        db.session.commit()

if __name__ == '__main__':
    seed_brands()

# from app import app, db  # Import your Flask app and SQLAlchemy instance
# from models import User  # Import your User model

# # Your initial user data
# initial_users = [
#     {
#         "username": "user4",
#         "email": "user4@example.com",
#         "password": "password4",
#         "profile_image": "https://tinyurl.com/mr3knads",
#     },
#     {
#         "username": "user5",
#         "email": "user5@example.com",
#         "password": "password5",
#         "profile_image": "https://tinyurl.com/mr3knads",
#     },
#     {
#         "username": "user6",
#         "email": "user6@example.com",
#         "password": "password6",
#         "profile_image": "https://tinyurl.com/mr3knads",
#     },
#     {
#         "username": "admin",
#         "email": "admin@cars.com",
#         "password": "adminpassword",
#         "profile_image": "https://tinyurl.com/mr3knads",
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


# from app import app, db
# from models import Car

# # Your initial car data
# initial_cars = [
#     {
#         "make": "Mazda",
#         "model": "Camry",
#         "year": 2022,
#         "price": 28000.0,
#         "description": "A popular midsize sedan.",
#         "image_url": "https://tinyurl.com/5a9e9wkm",
#         "admin_id": 1,  
#         "brand_id": 3,  
#     },
#     {
#         "make": "Ford",
#         "model": "Mustang",
#         "year": 2022,
#         "price": 45000.0,
#         "description": "A classic American muscle car.",
#         "image_url": "https://tinyurl.com/2p9jxndf",
#         "admin_id": 1,  
#         "brand_id": 4,  
#     },
#     {
#         "make": "Nissan",
#         "model": "Rogue",
#         "year": 2022,
#         "price": 32000.0,
#         "description": "A popular compact SUV.",
#         "image_url": "https://tinyurl.com/3xckpebe",
#         "admin_id": 1,  
#         "brand_id": 5,  
#     },
#     {
#         "make": "Audi",
#         "model": "A4",
#         "year": 2022,
#         "price": 48000.0,
#         "description": "A luxury compact sedan.",
#         "image_url": "https://tinyurl.com/44rm76rn",
#         "admin_id": 1,  
#         "brand_id": 6,  
#     },
#     {
#         "make": "Ferrari",
#         "model": "488 GTB",
#         "year": 2022,
#         "price": 300000.0,
#         "description": "An exotic sports car.",
#         "image_url": "https://tinyurl.com/mr4brn2f",
#         "admin_id": 1,  
#         "brand_id": 7,  
#     },
#     {
#         "make": "Tesla",
#         "model": "Model 3",
#         "year": 2022,
#         "price": 55000.0,
#         "description": "An electric luxury sedan.",
#         "image_url": "https://tinyurl.com/3yymfaa9",
#         "admin_id": 1,  
#         "brand_id": 8,  
#     },
#     {
#         "make": "Mazda",
#         "model": "CX-5",
#         "year": 2022,
#         "price": 28000.0,
#         "description": "A favprite among the sedans.",
#         "image_url": "https://tinyurl.com/yebs4jpv",
#         "admin_id": 1,  
#         "brand_id": 3,  
#     },
#     {
#         "make": "Ford",
#         "model": "Ranger",
#         "year": 2022,
#         "price": 45000.0,
#         "description": "More than a traditional pickup truck.",
#         "image_url": "https://tinyurl.com/ye6v2yn9",
#         "admin_id": 1,  
#         "brand_id": 4,  
#     },
#     {
#         "make": "Nissan",
#         "model": "GTI",
#         "year": 2022,
#         "price": 32000.0,
#         "description": "A popular sports car.",
#         "image_url": "https://tinyurl.com/4n838pcb",
#         "admin_id": 1,  
#         "brand_id": 5,  
#     },
#     {
#         "make": "Audi",
#         "model": "Quattro",
#         "year": 2022,
#         "price": 48000.0,
#         "description": "A sedan you must love.",
#         "image_url": "https://tinyurl.com/25544b9u",
#         "admin_id": 1,  
#         "brand_id": 6,  
#     },
#     {
#         "make": "Ferrari",
#         "model": "812 Competizione",
#         "year": 2022,
#         "price": 300000.0,
#         "description": "An exotic sports car.",
#         "image_url": "https://tinyurl.com/4y94k243",
#         "admin_id": 1,  
#         "brand_id": 7,  
#     },
#     {
#         "make": "Tesla",
#         "model": "Model X",
#         "year": 2022,
#         "price": 55000.0,
#         "description": "An electric luxury.",
#         "image_url": "https://tinyurl.com/yc2zdeek",
#         "admin_id": 1,  
#         "brand_id": 8,  
#     },
#     {
#         "make": "Mazda",
#         "model": "Demio",
#         "year": 2022,
#         "price": 14000.0,
#         "description": "A tiny yet popular sedan.",
#         "image_url": "https://tinyurl.com/v4e7yr9h",
#         "admin_id": 1,  
#         "brand_id": 3,  
#     },
#     {
#         "make": "Ford",
#         "model": "Raptor",
#         "year": 2022,
#         "price": 55000.0,
#         "description": "A classic pickup that can do it all.",
#         "image_url": "https://tinyurl.com/yphm6pjn",
#         "admin_id": 1,  
#         "brand_id": 4,  
#     },
#     {
#         "make": "Nissan",
#         "model": "GTR",
#         "year": 2022,
#         "price": 32000.0,
#         "description": "A popular Japanese sports car.",
#         "image_url": "https://tinyurl.com/vc748eun",
#         "admin_id": 1,  
#         "brand_id": 5,  
#     },
#     {
#         "make": "Audi",
#         "model": "Q5",
#         "year": 2022,
#         "price": 48000.0,
#         "description": "An exclusive SUV.",
#         "image_url": "https://tinyurl.com/3khxw24v",
#         "admin_id": 1,  
#         "brand_id": 6,  
#     },
#     {
#         "make": "Ferrari",
#         "model": "Monza SP-1",
#         "year": 2022,
#         "price": 330000.0,
#         "description": "A rare sports car.",
#         "image_url": "https://tinyurl.com/45p8uwzv",
#         "admin_id": 1,  
#         "brand_id": 7,  
#     },
#     {
#         "make": "Tesla",
#         "model": "Model 2",
#         "year": 2022,
#         "price": 45000.0,
#         "description": "A decent electric vehicle.",
#         "image_url": "https://tinyurl.com/mpfbs62c",
#         "admin_id": 1,  
#         "brand_id": 8,  
#     },
#     {
#         "make": "Mazda",
#         "model": "Axela",
#         "year": 2022,
#         "price": 18000.0,
#         "description": "A popular midsize sedan.",
#         "image_url": "https://tinyurl.com/429d6jpa",
#         "admin_id": 1,  
#         "brand_id": 3,  
#     },
#     {
#         "make": "Ford",
#         "model": "Everest",
#         "year": 2022,
#         "price": 24000.0,
#         "description": "A classic American muscle car.",
#         "image_url": "https://tinyurl.com/nhjacnbt",
#         "admin_id": 1,  
#         "brand_id": 4,  
#     },
#     {
#         "make": "Nissan",
#         "model": "X Trail",
#         "year": 2022,
#         "price": 27000.0,
#         "description": "A popular compact SUV.",
#         "image_url": "https://tinyurl.com/49ky44py",
#         "admin_id": 1,  
#         "brand_id": 5,  
#     },
#     {
#         "make": "Audi",
#         "model": "Q3",
#         "year": 2022,
#         "price": 34000.0,
#         "description": "A good sedan for daily activities.",
#         "image_url": "https://tinyurl.com/4ufwu37a",
#         "admin_id": 1,  
#         "brand_id": 6,  
#     },
#     {
#         "make": "Ferrari",
#         "model": "Daytona",
#         "year": 2022,
#         "price": 36000.0,
#         "description": "A rare sports car.",
#         "image_url": "https://tinyurl.com/5d5ar4ky",
#         "admin_id": 1,  
#         "brand_id": 7,  
#     },
#     {
#         "make": "Tesla",
#         "model": "Model 1",
#         "year": 2022,
#         "price": 55000.0,
#         "description": "An electric luxury sedan.",
#         "image_url": "https://tinyurl.com/mryzcrfj",
#         "admin_id": 1,  
#         "brand_id": 8,  
#     },
#     {
#         "make": "Mazda",
#         "model": "CX-30",
#         "year": 2022,
#         "price": 24000.0,
#         "description": "A populaR family sedan.",
#         "image_url": "https://tinyurl.com/52tpymyp",
#         "admin_id": 1,  
#         "brand_id": 3,  
#     },
#     {
#         "make": "Ford",
#         "model": "Shelby GT500",
#         "year": 2022,
#         "price": 45000.0,
#         "description": "A racecar that give a vinatge theme.",
#         "image_url": "https://tinyurl.com/ymr5vtbs",
#         "admin_id": 1,  
#         "brand_id": 4,  
#     },
#     {
#         "make": "Nissan",
#         "model": "Patrol",
#         "year": 2022,
#         "price": 62000.0,
#         "description": "An SUV worth your time.",
#         "image_url": "https://tinyurl.com/4p5ybjbw",
#         "admin_id": 1,  
#         "brand_id": 5,  
#     },
#     {
#         "make": "Audi",
#         "model": "Q8",
#         "year": 2022,
#         "price": 38000.0,
#         "description": "A modern SUV that can do it all.",
#         "image_url": "https://tinyurl.com/34duxyfn",
#         "admin_id": 1,  
#         "brand_id": 6,  
#     },
#     {
#         "make": "Ferrari",
#         "model": "ROMA",
#         "year": 2022,
#         "price": 500000.0,
#         "description": "An rare car.",
#         "image_url": "https://tinyurl.com/36h79ydy",
#         "admin_id": 1,  
#         "brand_id": 7,  
#     },
#     {
#         "make": "Tesla",
#         "model": "Cybertruck",
#         "year": 2022,
#         "price": 85000.0,
#         "description": "An electric truck.",
#         "image_url": "https://tinyurl.com/3a4pe577",
#         "admin_id": 1,  
#         "brand_id": 8,  
#     },
#     {
#         "make": "Mazda",
#         "model": "BT 50",
#         "year": 2022,
#         "price": 22000.0,
#         "description": "A nice pickup for daily use.",
#         "image_url": "https://tinyurl.com/3nyxdu3t",
#         "admin_id": 1,  
#         "brand_id": 3,  
#     },
#     {
#         "make": "Ford",
#         "model": "Bronco",
#         "year": 2022,
#         "price": 45000.0,
#         "description": "A strong SUV.",
#         "image_url": "https://tinyurl.com/ye9xjby3",
#         "admin_id": 1,  
#         "brand_id": 4,  
#     },
#     {
#         "make": "Nissan",
#         "model": "Juke",
#         "year": 2022,
#         "price": 19000.0,
#         "description": "An affordable family car",
#         "image_url": "https://tinyurl.com/mstsb4uy",
#         "admin_id": 1,  
#         "brand_id": 5,  
#     },
#     {
#         "make": "Audi",
#         "model": "SQ8",
#         "year": 2022,
#         "price": 38000.0,
#         "description": "A car that offeres everything you'd want.",
#         "image_url": "https://tinyurl.com/54jkddp6",
#         "admin_id": 1,  
#         "brand_id": 6,  
#     },
#     {
#         "make": "Ferrari",
#         "model": "Purosangue",
#         "year": 2022,
#         "price": 200000.0,
#         "description": "A ferrari that looks good and feels good.",
#         "image_url": "https://tinyurl.com/5ypmk5pb",
#         "admin_id": 1,  
#         "brand_id": 7,  
#     },
#     {
#         "make": "Tesla",
#         "model": "Model Y",
#         "year": 2022,
#         "price": 45000.0,
#         "description": "An tiny electric vehicle.",
#         "image_url": "https://tinyurl.com/2uefct96",
#         "admin_id": 1,  
#         "brand_id": 8,  
#     },
# ]


# def seed_cars():
#     # Create an application context
#     with app.app_context():
#         # Create the database tables if they don't exist
#         db.create_all()

#         # Seed the database with initial car data
#         for car_data in initial_cars:
#             car = Car(
#                 make=car_data["make"],
#                 model=car_data["model"],
#                 year=car_data["year"],
#                 price=car_data["price"],
#                 description=car_data["description"],
#                 image_url=car_data["image_url"],
#                 admin_id=car_data["admin_id"],
#                 brand_id=car_data["brand_id"],
#             )
#             db.session.add(car)

#         # Commit the changes to the database
#         db.session.commit()

# if __name__ == '__main__':
#     seed_cars()
