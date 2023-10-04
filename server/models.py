from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

class Vehicle(db.Model):
    __tablename__ = 'vehicles'

    id = db.Column(db.Integer, primary_key=True)
    make = db.Column(db.String(100), nullable=False)
    model = db.Column(db.String(100), nullable=False)
    price = db.Column(db.Float, nullable=False)
    image_url = db.Column(db.String(255))

    def __init__(self, make, model, price, image_url):
        self.make = make
        self.model = model
        self.price = price
        self.image_url = image_url
        
        

    def serialize(self):
        return {
            'id': self.id,
            'make': self.make,
            'model': self.model,
            'price': self.price,
            'image_url': self.image_url,
            
        }
