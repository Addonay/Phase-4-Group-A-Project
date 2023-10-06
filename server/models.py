from flask_sqlalchemy import SQLAlchemy
from datetime import datetime
from werkzeug.security import generate_password_hash, check_password_hash
from flask_bcrypt import Bcrypt

db = SQLAlchemy()
bcrypt = Bcrypt()
class User(db.Model):
    __tablename__ = "users"
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    username = db.Column(db.String(150), unique=True)
    email = db.Column(db.String(150), unique=True)
    password = db.Column(db.Text, nullable=False)
    profile_image = db.Column(db.String(255)) 
    user_role = db.Column(db.String(50), default='client')

    def __init__(self, username, email, password, profile_image=None):
        self.username = username
        self.email = email
        self.password = self.hash_password(password) 
        self.profile_image = profile_image

    def hash_password(self, password):
        return bcrypt.generate_password_hash(password).decode('utf-8')
class Car(db.Model):
    __tablename__ = "cars"
    id = db.Column(db.Integer, primary_key=True)
    make = db.Column(db.String(100), nullable=False)
    model = db.Column(db.String(100), nullable=False)
    year = db.Column(db.Integer, nullable=False)  # Added year field
    price = db.Column(db.Float, nullable=False)
    description = db.Column(db.Text)
    image_url = db.Column(db.String(255))
    admin_id = db.Column(db.Integer, db.ForeignKey('admins.id'), nullable=False)
    brand_id = db.Column(db.Integer, db.ForeignKey('brands.id'), nullable=False)

    def __init__(self, make, model, year, price, description=None, image_url=None, admin_id=None, brand_id=None):
        self.make = make
        self.model = model
        self.year = year
        self.price = price
        self.description = description
        self.image_url = image_url
        self.admin_id = admin_id
        self.brand_id = brand_id

        # Relationships
    reviews = db.relationship("Review", backref="car", lazy=True)
    inquiries = db.relationship("Inquiry", backref="car", lazy=True)
    carts = db.relationship("Cart", backref="car", lazy=True)

# Review Model
class Review(db.Model):
    __tablename__ = "reviews"
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey("users.id"), nullable=False)
    car_id = db.Column(db.Integer, db.ForeignKey("cars.id"), nullable=False)
    rating = db.Column(db.Float)
    comment = db.Column(db.Text)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)

# Inquiry Model
class Inquiry(db.Model):
    __tablename__ = "inquiries"
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey("users.id"), nullable=False)
    car_id = db.Column(db.Integer, db.ForeignKey("cars.id"), nullable=False)
    message = db.Column(db.Text)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    status = db.Column(db.String(50))

# Cart Model
class Cart(db.Model):
    __tablename__ = "carts"
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey("users.id"), nullable=False)
    car_id = db.Column(db.Integer, db.ForeignKey("cars.id"), nullable=False)
    quantity = db.Column(db.Integer, default=1)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)

class Purchase(db.Model):
    __tablename__ = "purchases"
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, nullable=False) 
    car_id = db.Column(db.Integer, nullable=False)  
    admin_id = db.Column(db.Integer, db.ForeignKey('admins.id'), nullable=False)
    purchase_date = db.Column(db.DateTime, default=datetime.utcnow)

# Admin Model
class Admin(db.Model):
    __tablename__ = "admins"
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(150), unique=True, nullable=False)
    email = db.Column(db.String(150), unique=True, nullable=False)
    password_hash = db.Column(db.String(255), nullable=False)
    full_name = db.Column(db.String(255))
    # Add more admin information fields as needed
    created_at = db.Column(db.DateTime, default=datetime.utcnow)

    # Establish a one-to-many relationship with Purchase
    purchases = db.relationship('Purchase', backref='admin', lazy=True)

    def __init__(self, username, email, password, full_name=None):
        self.username = username
        self.email = email
        self.password_hash = generate_password_hash(password)
        self.full_name = full_name

    def check_password(self, password):
        return check_password_hash(self.password_hash, password)

    def add_car(self, make, model, price, description, image_url):
        car = Car(make=make, model=model, price=price, description=description, image_url=image_url, admin_id=self.id)
        db.session.add(car)
        db.session.commit()

    def update_car(self, car_id, make, model, price, description, image_url):
        car = Car.query.get(car_id)
        if car:
            car.make = make
            car.model = model
            car.price = price
            car.description = description
            car.image_url = image_url
            db.session.commit()

    def delete_car(self, car_id):
        car = Car.query.get(car_id)
        if car:
            db.session.delete(car)
            db.session.commit()

    def view_purchases(self):
        return Purchase.query.all()

    
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

