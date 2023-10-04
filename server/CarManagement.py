from flask import Flask, request, jsonify
from models import db
from flask_migrate import Migrate
from flask_cors import CORS
from models import Car

app = Flask(__name__)
CORS(app)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///car_showroom.db'

db.init_app(app)

migrate = Migrate(app, db)

with app.app_context():
    db.create_all()

@app.route('/api/cars', methods=['GET'])
def list_cars():
    cars = Car.query.all()
    car_list = []
    for car in cars:
        car_list.append({
            'id': car.id,
            'make': car.make,
            'model': car.model,
            'year': car.year,
            'price': car.price
        })
    return jsonify(car_list)

@app.route('/api/cars', methods=['POST'])
def add_car():
    data = request.get_json()
    make = data['make']
    model = data['model']
    year = data['year']
    price = data['price']

    new_car = Car(make=make, model=model, year=year, price=price)
    db.session.add(new_car)
    db.session.commit()

    return jsonify({'message': 'Car added successfully'})

@app.route('/api/cars/update/<int:id>', methods=['PUT'])
def update_car(id):
    data = request.get_json()
    car = Car.query.get(id)

    if not car:
        return jsonify({'error': 'Car not found'}), 404

    car.make = data['make']
    car.model = data['model']
    car.year = data['year']
    car.price = data['price']

    db.session.commit()

    return jsonify({'message': 'Car updated successfully'})

@app.route('/api/cars/delete/<int:id>', methods=['DELETE'])
def delete_car(id):
    car = Car.query.get(id)

    if not car:
        return jsonify({'error': 'Car not found'}), 404

    db.session.delete(car)
    db.session.commit()

    return jsonify({'message': 'Car deleted successfully'})

if __name__ == '__main__':
    app.run(port=5000)
