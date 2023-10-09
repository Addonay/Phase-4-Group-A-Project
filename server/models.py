from datetime import datetime
from flask_sqlalchemy import SQLAlchemy
from flask_bcrypt import Bcrypt
from flask_login import UserMixin

db = SQLAlchemy()
bcrypt = Bcrypt()

class User(db.Model, UserMixin):
    __tablename__ = "users"
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    username = db.Column(db.String(150), unique=True)
    email = db.Column(db.String(150), unique=True)
    password = db.Column(db.Text, nullable=False)
    profile_image = db.Column(db.String(255), default="https://static.vecteezy.com/system/resources/previews/020/765/399/non_2x/default-profile-account-unknown-icon-black-silhouette-free-vector.jpg")
    user_role = db.Column(db.String(50), default='client')
    created_at = db.Column(db.DateTime, default=datetime.utcnow())

    def hash_password(self, password):
        return bcrypt.generate_password_hash(password).decode('utf-8')
    

    def __init__(self, username, email, password, profile_image=None, user_role='client'):
        self.username = username
        self.email = email
        self.password = self.hash_password(password)
        self.profile_image = profile_image
        self.user_role = user_role
        self.created_at = datetime.utcnow() 


    reviews = db.relationship("Review", backref="user", lazy=True)  # Relationship with reviews
    carts = db.relationship("Cart", backref="user", lazy=True)  # Relationship with user's cart
    purchases = db.relationship("Purchase", backref="user", lazy=True)  # Relationship with user's purchases

class Car(db.Model):
    __tablename__ = "cars"
    id = db.Column(db.Integer, primary_key=True)
    make = db.Column(db.String(100), nullable=False)
    model = db.Column(db.String(100), nullable=False)
    year = db.Column(db.Integer, nullable=False)  # Added year field
    price = db.Column(db.Float, nullable=False)
    description = db.Column(db.Text)
    image_url = db.Column(db.String(255))
    brand_id = db.Column(db.Integer, db.ForeignKey('brands.id'), nullable=False)

    def __init__(self, make, model, year, price, description=None, image_url=None, brand_id=None):
        self.make = make
        self.model = model
        self.year = year
        self.price = price
        self.description = description
        self.image_url = image_url
        self.brand_id = brand_id


        # Relationships
    reviews = db.relationship("Review", backref="car", lazy=True)  # Relationship with reviews
    carts = db.relationship("Cart", backref="car", lazy=True)  # Relationship with carts
    purchases = db.relationship("Purchase", backref="car", lazy=True)  # Relationship with purchases

# Review Model
class Review(db.Model):
    __tablename__ = "reviews"
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.Integer, db.ForeignKey("users.username"), nullable=False)  # Reference to User
    car_make = db.Column(db.String(100), db.ForeignKey("cars.make"), nullable=False)  # Reference to Car
    comment = db.Column(db.Text)
    created_at = db.Column(db.DateTime, default=datetime.utcnow())

    def __init__(self, username, car_make, comment):
        self.username = username
        self.car_make = car_make
        self.comment = comment


# Cart Model
class Cart(db.Model):
    __tablename__ = "carts"
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey("users.id"), nullable=False)  # Reference to User
    car_id = db.Column(db.Integer, db.ForeignKey("cars.id"), nullable=False)  # Reference to Car
    quantity = db.Column(db.Integer, default=1)
    created_at = db.Column(db.DateTime, default=datetime.utcnow())


class Purchase(db.Model):
    __tablename__ = "purchases"
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey("users.id"), nullable=False)  # Reference to User
    car_id = db.Column(db.Integer, db.ForeignKey("cars.id"), nullable=False)  # Reference to Car
    price = db.Column(db.Float, nullable=False)
    purchase_date = db.Column(db.DateTime, default=datetime.utcnow())
    status = db.Column(db.String(50), default='pending')


    def __init__(self, car_make, price, status=None ):
        self.car_make = car_make
        self.price = price
        self.status = status

# Admin Model
class Admin(db.Model):
    __tablename__ = "admins"
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(150), unique=True, nullable=False)
    email = db.Column(db.String(150), unique=True, nullable=False)
    password = db.Column(db.Text, nullable=False)
    full_name = db.Column(db.String(150), nullable=True)
    address = db.Column(db.String(255), nullable=True)
    mobile_number = db.Column(db.String(20), nullable=True)
    profile_image = db.Column(db.String(255), default="https://static.vecteezy.com/system/resources/previews/020/765/399/non_2x/default-profile-account-unknown-icon-black-silhouette-free-vector.jpg")
    created_at = db.Column(db.DateTime, default=datetime.utcnow())

    def __init__(self, username, email, password, full_name=None, address=None, mobile_number=None, profile_image=None):
        self.username = username
        self.email = email
        self.password = self.hash_password(password)
        self.full_name = full_name
        self.address = address
        self.mobile_number = mobile_number
        self.profile_image = profile_image

    def hash_password(self, password):
        return bcrypt.generate_password_hash(password).decode('utf-8')


    
class Brand(db.Model):
    __tablename__ = "brands"
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False, unique=True)
    image_url = db.Column(db.String(255))
    
    # Define the one-to-many relationship with Car
    cars = db.relationship('Car', backref='brand', lazy=True)

    def __init__(self, name, image_url=None):
        self.name = name
        self.image_url = image_url

