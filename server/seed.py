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
        "model": "CX-5",
        "year": 2022,
        "price": 28000.0,
        "description": "A favprite among the sedans.",
        "image_url": "https://media.istockphoto.com/id/1442957155/photo/new-suv-mazda-cx-5-at-parking-lot.jpg?s=612x612&w=0&k=20&c=PjmoqHYlLKglbXD2ubhVHBUZsVDn3yyDJ1L7qEbkQDg=",
        "admin_id": 1,  
        "brand_id": 3,  
    },
    {
        "make": "Ford",
        "model": "Ranger",
        "year": 2022,
        "price": 45000.0,
        "description": "More than a traditional pickup truck.",
        "image_url": "https://media.istockphoto.com/id/1472219985/photo/side-turkey-january-23-2023.jpg?s=612x612&w=0&k=20&c=pX9S2M4ghOZkXx4bHcbfrqdWq7z_5_L9cvXE86SGpDY=",
        "admin_id": 1,  
        "brand_id": 4,  
    },
    {
        "make": "Nissan",
        "model": "GTI",
        "year": 2022,
        "price": 32000.0,
        "description": "A popular sports car.",
        "image_url": "https://media.istockphoto.com/id/459226839/photo/nissan-gt-r.jpg?s=612x612&w=0&k=20&c=Xp-KLaa1Y3K7and0r8oIKPbmmBrNOl9lbk5k0XSEB6c=",
        "admin_id": 1,  
        "brand_id": 5,  
    },
    {
        "make": "Audi",
        "model": "Quattro",
        "year": 2022,
        "price": 48000.0,
        "description": "A sedan you must love.",
        "image_url": "https://media.istockphoto.com/id/1389756629/photo/audi-q8-stopped-on-a-street.jpg?s=612x612&w=0&k=20&c=3DXjQ0sOITD3Ew5SoOtxLqEI1mDTHydsPzFfxF-0nHM=",
        "admin_id": 1,  
        "brand_id": 6,  
    },
    {
        "make": "Ferrari",
        "model": "812 Competizione",
        "year": 2022,
        "price": 300000.0,
        "description": "An exotic sports car.",
        "image_url": "https://media.istockphoto.com/id/1651657158/photo/cc-850.jpg?s=612x612&w=0&k=20&c=jv-PkS3QMYflJIzOuhuyRG2tkaGsdn_7iYBcDXvI1Vc=",
        "admin_id": 1,  
        "brand_id": 7,  
    },
    {
        "make": "Tesla",
        "model": "Model X",
        "year": 2022,
        "price": 55000.0,
        "description": "An electric luxury.",
        "image_url": "https://media.istockphoto.com/id/1133058798/photo/tesla-model-x-on-the-street.jpg?s=612x612&w=0&k=20&c=aAt8q6wAaq6uf1rasWOkEswrTS4humeV7aGYb105-h4=",
        "admin_id": 1,  
        "brand_id": 8,  
    },
    {
        "make": "Mazda",
        "model": "Demio",
        "year": 2022,
        "price": 14000.0,
        "description": "A tiny yet popular sedan.",
        "image_url": "https://media.istockphoto.com/id/1631980116/photo/mazda-2.jpg?s=612x612&w=0&k=20&c=lT6uNzq99vQ6lmMUb7M-_-atnXIEHXyh6BKkrhWZwLA=",
        "admin_id": 1,  
        "brand_id": 3,  
    },
    {
        "make": "Ford",
        "model": "Raptor",
        "year": 2022,
        "price": 55000.0,
        "description": "A classic pickup that can do it all.",
        "image_url": "https://media.istockphoto.com/id/1632329020/photo/ford-ranger-raptor-on-a-muddy-road.jpg?s=612x612&w=0&k=20&c=iKuRFOVuSrmopXHJ5zxG0H_NGpsgtuDDzHN4TzwrzhU=",
        "admin_id": 1,  
        "brand_id": 4,  
    },
    {
        "make": "Nissan",
        "model": "GTR",
        "year": 2022,
        "price": 32000.0,
        "description": "A popular Japanese sports car.",
        "image_url": "https://media.istockphoto.com/id/1641965988/photo/nissan-gtr-car.jpg?s=612x612&w=0&k=20&c=Vch5_N0cdWjD9auEkobiBgKoqP3b4r2bBEYBTx-B96A=",
        "admin_id": 1,  
        "brand_id": 5,  
    },
    {
        "make": "Audi",
        "model": "Q5",
        "year": 2022,
        "price": 48000.0,
        "description": "An exclusive SUV.",
        "image_url": "https://media.istockphoto.com/id/1068065998/photo/audi-q8-on-the-road.jpg?s=612x612&w=0&k=20&c=t6qAd0_t1USv0_DVrJ5PW0ZHROdu9y_fY7gOnFv2Gc0=",
        "admin_id": 1,  
        "brand_id": 6,  
    },
    {
        "make": "Ferrari",
        "model": "Monza SP-1",
        "year": 2022,
        "price": 330000.0,
        "description": "A rare sports car.",
        "image_url": "https://media.istockphoto.com/id/1476464432/photo/1959-ferrari-250-tr59-60-fantuzzi-spyder.jpg?s=612x612&w=0&k=20&c=fTbsxChQui4oGLq3DaWcvIWG2rVvR_p5bt1FWdAz5ms=",
        "admin_id": 1,  
        "brand_id": 7,  
    },
    {
        "make": "Tesla",
        "model": "Model 2",
        "year": 2022,
        "price": 45000.0,
        "description": "A decent electric vehicle.",
        "image_url": "https://media.istockphoto.com/id/1347338631/photo/luxury-electric-car-parked-on-street.jpg?s=612x612&w=0&k=20&c=a4ailr7eq9z_GUb4etE6SQpI2TE2m_VczTqIKCcc7xA=",
        "admin_id": 1,  
        "brand_id": 8,  
    },
    {
        "make": "Mazda",
        "model": "Axela",
        "year": 2022,
        "price": 18000.0,
        "description": "A popular midsize sedan.",
        "image_url": "https://media.istockphoto.com/id/1295859071/photo/2021-mazda3-sedan.jpg?s=612x612&w=0&k=20&c=ldpsWuc6pxI8HbMY_JR74xQJaea-e9NA7Ynw2gurGGs=",
        "admin_id": 1,  
        "brand_id": 3,  
    },
    {
        "make": "Ford",
        "model": "Everest",
        "year": 2022,
        "price": 24000.0,
        "description": "A classic American muscle car.",
        "image_url": "https://media.istockphoto.com/id/598701668/photo/private-suv-car-ford-everest.jpg?s=612x612&w=0&k=20&c=36ZFJOZ0x6f4XOgxn2CkaUY8u-hFR8s7bKyOFmnEIPE=",
        "admin_id": 1,  
        "brand_id": 4,  
    },
    {
        "make": "Nissan",
        "model": "X Trail",
        "year": 2022,
        "price": 27000.0,
        "description": "A popular compact SUV.",
        "image_url": "https://media.istockphoto.com/id/894453720/photo/australia-traffic-outback.jpg?s=612x612&w=0&k=20&c=PcBPmpFAVR6Aq7qh_mF5U-GXPBL7A2DgfepPp2EgEsU=",
        "admin_id": 1,  
        "brand_id": 5,  
    },
    {
        "make": "Audi",
        "model": "Q3",
        "year": 2022,
        "price": 34000.0,
        "description": "A good sedan for daily activities.",
        "image_url": "https://media.istockphoto.com/id/1318176772/photo/gray-audi-q3-car-moving-on-the-street.jpg?s=612x612&w=0&k=20&c=6pPJZstE_VnfrQrv50fQi5hUEwX5dn44FaUgjc9UyCQ=",
        "admin_id": 1,  
        "brand_id": 6,  
    },
    {
        "make": "Ferrari",
        "model": "Daytona",
        "year": 2022,
        "price": 36000.0,
        "description": "A rare sports car.",
        "image_url": "https://media.istockphoto.com/id/518024054/photo/ferrari-458-spider-sports-car.jpg?s=612x612&w=0&k=20&c=YJH2qopqwWztao5N6SGsXIDzv0FNbwwpQd8KCWucOUE=",
        "admin_id": 1,  
        "brand_id": 7,  
    },
    {
        "make": "Tesla",
        "model": "Model 1",
        "year": 2022,
        "price": 55000.0,
        "description": "An electric luxury sedan.",
        "image_url": "https://media.istockphoto.com/id/1325449542/photo/white-tesla-model-x-white-electric-car-parked-in-the-city.jpg?s=612x612&w=0&k=20&c=Ng6qX8wNrdzfKHVdGQTIjFYrLRLM_9apQ6t6KSf1fJQ=",
        "admin_id": 1,  
        "brand_id": 8,  
    },
    {
        "make": "Mazda",
        "model": "CX-30",
        "year": 2022,
        "price": 24000.0,
        "description": "A populaR family sedan.",
        "image_url": "https://media.istockphoto.com/id/501484428/photo/mazda-cx-3-on-the-street.jpg?s=612x612&w=0&k=20&c=zP-Gf6C6Lht6rbADsWKCQYdJ9I-f3lIqqIKy-LfugCo=",
        "admin_id": 1,  
        "brand_id": 3,  
    },
    {
        "make": "Ford",
        "model": "Shelby GT500",
        "year": 2022,
        "price": 45000.0,
        "description": "A racecar that give a vinatge theme.",
        "image_url": "https://media.istockphoto.com/id/171317661/photo/ford-shelby-gt500.jpg?s=612x612&w=0&k=20&c=mllK7u6WYGN7AwLZRhPsCqqZzrr3BLK9sRl62fSnZnQ=",
        "admin_id": 1,  
        "brand_id": 4,  
    },
    {
        "make": "Nissan",
        "model": "Patrol",
        "year": 2022,
        "price": 62000.0,
        "description": "An SUV worth your time.",
        "image_url": "https://media.istockphoto.com/id/1077942898/photo/nissan-patrol.jpg?s=612x612&w=0&k=20&c=jFgopV3JCtFGq0oKZH5fB7ZfFw9zgysZHfZJTlJoyAU=",
        "admin_id": 1,  
        "brand_id": 5,  
    },
    {
        "make": "Audi",
        "model": "Q8",
        "year": 2022,
        "price": 38000.0,
        "description": "A modern SUV that can do it all.",
        "image_url": "https://media.istockphoto.com/id/1472893748/photo/side-turkey-january-23-2023.jpg?s=612x612&w=0&k=20&c=iasQY4p10PffR51e9pj1VaLVwExjVrHK3Bbnu2uOtj8=",
        "admin_id": 1,  
        "brand_id": 6,  
    },
    {
        "make": "Ferrari",
        "model": "ROMA",
        "year": 2022,
        "price": 500000.0,
        "description": "An rare car.",
        "image_url": "https://media.istockphoto.com/id/1713183475/photo/ferrari-488-pista-sports-car.jpg?s=612x612&w=0&k=20&c=4PDn7xL0bx9yoRgSVMqll_P_5UsWu2qvgPpLBBc4Mjw=",
        "admin_id": 1,  
        "brand_id": 7,  
    },
    {
        "make": "Tesla",
        "model": "Cybertruck",
        "year": 2022,
        "price": 85000.0,
        "description": "An electric truck.",
        "image_url": "https://media.istockphoto.com/id/1640313003/photo/tesla-cybertruck-on-the-road-between-san-jose-and-san-francisco.jpg?s=612x612&w=0&k=20&c=n9u0tADoGPdA6odiiPZ5rr-R-2M2a6cx7EjGLb1gAow=",
        "admin_id": 1,  
        "brand_id": 8,  
    },
    {
        "make": "Mazda",
        "model": "BT 50",
        "year": 2022,
        "price": 22000.0,
        "description": "A nice pickup for daily use.",
        "image_url": "https://media.istockphoto.com/id/515263916/photo/bt-50-pick-up-truck.jpg?s=612x612&w=0&k=20&c=QLZ0_U_GRY7qe1Hph6Ud-VrgEn9LhnAkOq9MY6m53s0=",
        "admin_id": 1,  
        "brand_id": 3,  
    },
    {
        "make": "Ford",
        "model": "Bronco",
        "year": 2022,
        "price": 45000.0,
        "description": "A strong SUV.",
        "image_url": "https://media.istockphoto.com/id/1477259612/photo/a-ford-bronco-for-sale-at-a-dealership-in-monroeville-pennsylvania-usa.jpg?s=612x612&w=0&k=20&c=d9HMTcJV-_73wiyGbyXpo70DA3nXKQLvJRx7PI0Ikoo=",
        "admin_id": 1,  
        "brand_id": 4,  
    },
    {
        "make": "Nissan",
        "model": "Juke",
        "year": 2022,
        "price": 19000.0,
        "description": "An affordable family car",
        "image_url": "https://media.istockphoto.com/id/1312332913/photo/nissan-juke-in-motion.jpg?s=612x612&w=0&k=20&c=Sq9Nr5kdFuncUniUTbQohAoHqMaGUz0mJE-ueHQZcd4=",
        "admin_id": 1,  
        "brand_id": 5,  
    },
    {
        "make": "Audi",
        "model": "SQ8",
        "year": 2022,
        "price": 38000.0,
        "description": "A car that offeres everything you'd want.",
        "image_url": "https://media.istockphoto.com/id/1182389949/photo/gray-audi-rs6-car-in-the-city.jpg?s=612x612&w=0&k=20&c=IBOawdfeS9W63ckdLmOJ7xrhTER9fSkhpaND63jVDPI=",
        "admin_id": 1,  
        "brand_id": 6,  
    },
    {
        "make": "Ferrari",
        "model": "Purosangue",
        "year": 2022,
        "price": 200000.0,
        "description": "A ferrari that looks good and feels good.",
        "image_url": "https://media.istockphoto.com/id/1372000758/photo/ferrari-f12-tdf.jpg?s=612x612&w=0&k=20&c=HnLL5KoPiuYrqDzpJYTUARWcjVlutfo0ASal-7lsxx8=",
        "admin_id": 1,  
        "brand_id": 7,  
    },
    {
        "make": "Tesla",
        "model": "Model Y",
        "year": 2022,
        "price": 45000.0,
        "description": "An tiny electric vehicle.",
        "image_url": "https://media.istockphoto.com/id/1389153156/photo/tesla-model-y-performance-edition.jpg?s=612x612&w=0&k=20&c=td2QpHsf47mChK65wPpWFs4mAKPU70lkiX_ScGgaD0M=",
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
