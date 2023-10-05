from flask import Flask, request, jsonify
from CarManagement import CarManagement
from Enquiries import CommunicationSystem
from Contacts import contact_info

app = Flask(__name__)
car_manager = CarManagement()
communication_system = CommunicationSystem()

@app.route('/', methods=['GET'])
def home():
    return jsonify({"message": "Welcome to the Car Management System"})

@app.route('/cars', methods=['GET'])
def get_all_cars():
    cars = car_manager.get_all_cars()
    car_list = [str(car) for car in cars]
    return jsonify(car_list)

@app.route('/cars/<int:index>', methods=['GET'])
def get_car(index):
    car = car_manager.get_car_by_index(index)
    if car:
        return jsonify(str(car))
    return jsonify({"error": "Car not found"}), 404

@app.route('/cars', methods=['POST'])
def add_car():
    data = request.get_json()
    make = data.get("make")
    model = data.get("model")
    year = data.get("year")
    color = data.get("color")
    
    car_manager.add_car(make, model, year, color)
    return jsonify({"message": "Car added successfully"}), 201

@app.route('/cars/<int:index>', methods=['PUT'])
def update_car(index):
    data = request.get_json()
    make = data.get("make")
    model = data.get("model")
    year = data.get("year")
    color = data.get("color")
    
    if car_manager.update_car(index, make, model, year, color):
        return jsonify({"message": "Car updated successfully"})
    return jsonify({"error": "Car not found"}), 404

@app.route('/cars/<int:index>', methods=['DELETE'])
def delete_car(index):
    if car_manager.delete_car(index):
        return jsonify({"message": "Car deleted successfully"})
    return jsonify({"error": "Car not found"}), 404

@app.route('/enquiries', methods=['POST'])
def send_inquiry():
    data = request.get_json()
    sender_name = data.get("sender_name")
    receiver_name = data.get("receiver_name")
    message = data.get("message")
    
    communication_system.send_inquiry(sender_name, receiver_name, message)
    return jsonify({"message": "Inquiry sent successfully"}), 201

@app.route('/reviews', methods=['POST'])
def send_review():
    data = request.get_json()
    author_name = data.get("author_name")
    product_name = data.get("product_name")
    rating = data.get("rating")
    comment = data.get("comment")
    
    communication_system.send_review(author_name, product_name, rating, comment)
    return jsonify({"message": "Review submitted successfully"}), 201

@app.route('/api/contact', methods=['GET'])
def get_contact_info():
    return jsonify(contact_info)

if __name__ == '__main__':
    app.run(port=5555)
