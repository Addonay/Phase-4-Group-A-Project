from flask import Flask, jsonify
from config import Config
from models import db, Vehicle
from flask_cors import CORS
from flask_migrate import Migrate


app = Flask(__name__)
app.config.from_object(Config)
db.init_app(app)

CORS(app, support_credentials=True)

migrate = Migrate(app, db)

#define your routes here
@app.route('/vehicles', methods=['GET'])
def get_vehicles():
    vehicles = Vehicle.query.all()
    serialized_vehicles = [vehicle.serialize() for vehicle in vehicles]
    return jsonify(serialized_vehicles)

@app.route('/vehicles/<int:vehicle_id>', methods=['GET'])
def get_vehicle(vehicle_id):
    vehicle = Vehicle.query.get_or_404(vehicle_id)
    return jsonify(vehicle.serialize())

if __name__ == "__main__":
    app.run(port=5500)
