from flask import Flask, request, jsonify
from CarManagement import CarManagement
from CommunicationSystem import CommunicationSystem
from Contacts import contact_info

app = Flask(__name__)
car_manager = CarManagement()
communication_system = CommunicationSystem()

car_manager.add_car("Toyota", "Camry", 2022, "Blue")
car_manager.add_car("Honda", "Civic", 2021, "Red")

sample_reviews = [
    {
        "author_name": "John Doe",
        "product_name": "Toyota Camry",
        "rating": 5,
        "comment": "Great car!"
    },
    {
        "author_name": "Jane Smith",
        "product_name": "Honda Civic",
        "rating": 4,
        "comment": "Good fuel efficiency."
    }
]

sample_enquiries = [
    {
        "sender_name": "Alice",
        "receiver_name": "Bob",
        "message": "Interested in the Toyota Camry."
    },
    {
        "sender_name": "Charlie",
        "receiver_name": "David",
        "message": "Do you have financing options?"
    }
]

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
def send_enquiry():
    data = request.get_json()
    sender_name = data.get("sender_name")
    receiver_name = data.get("receiver_name")
    message = data.get("message")
    
    sample_enquiries.append({
        "sender_name": sender_name,
        "receiver_name": receiver_name,
        "message": message
    })
    
    return jsonify({"message": "Enquiry sent successfully"}), 201

@app.route('/reviews', methods=['POST'])
def send_review():
    data = request.get_json()
    author_name = data.get("author_name")
    product_name = data.get("product_name")
    rating = data.get("rating")
    comment = data.get("comment")
    
    communication_system.send_review(author_name, product_name, rating, comment)
    return jsonify({"message": "Review submitted successfully"}), 201

@app.route('/enquiries', methods=['GET'])
def display_enquiries():
    all_enquiries = sample_enquiries + communication_system.get_enquiries()
    return jsonify(all_enquiries)

@app.route('/reviews', methods=['GET'])
def display_reviews():
    all_reviews = sample_reviews + communication_system.get_reviews()
    return jsonify(all_reviews)


@app.route('/api/contact', methods=['GET'])
def get_contact_info():
    return jsonify(contact_info)

if __name__ == '__main__':
    app.run(port=5555)
