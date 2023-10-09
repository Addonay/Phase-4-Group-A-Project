from flask import Blueprint, jsonify, request
from flask_jwt_extended import jwt_required, get_jwt_identity
from models import db, Admin, User, Purchase, Car  

admin_bp = Blueprint("admin", __name__)

@admin_bp.route('/dashboard')
@jwt_required()
def admin_dashboard():
    try:
        current_admin_id = get_jwt_identity()

        # Find the admin by their ID in the database
        admin = Admin.query.get(current_admin_id)

        if admin:
            # You can customize the data to display on the admin dashboard here
            dashboard_data = {
                'admin_name': admin.full_name,
                'total_users': len(User.query.all()),  # Example: Total number of users
                'total_cars': len(Car.query.all()),    # Example: Total number of cars in inventory
                'total_purchases': len(Purchase.query.all()),  # Example: Total number of purchases
                # Add more statistics or data as needed
            }

        else:
            return jsonify({'error': 'Admin not found'}), 404

    except Exception as e:
        return jsonify({'error': str(e)}), 500
    
# Admin profile route
@admin_bp.route('/profile', methods=['GET'])
@jwt_required
def admin_profile():
    current_admin_id = get_jwt_identity()
    admin = Admin.query.get(current_admin_id)

    if admin:
        admin_profile_data = {
            'username': admin.username,
            'email': admin.email,
            'full_name': admin.full_name,
            'address': admin.address,
            'mobile_number': admin.mobile_number,
            'profile_image': admin.profile_image,
        }

        return jsonify(admin_profile=admin_profile_data), 200
    else:
        return jsonify(message="Admin not found"), 404

# Admin users route
@admin_bp.route('/users', methods=['GET'])
def admin_manage_users():
    try:
        # Retrieve a list of all users from the database
        users = User.query.all()

        # Create a list of user data
        user_data = []
        for user in users:
            user_info = {
                'user_id': user.id,
                'username': user.username,
                'email': user.email,
                'created_at': user.created_at
            }
            user_data.append(user_info)

        return jsonify({'users': user_data}), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 400

# Route to delete a user by user_id
@admin_bp.route('/users/delete/<int:user_id>', methods=['DELETE'])
def admin_delete_user(user_id):
    try:
        # Find the user by user_id
        user = User.query.get(user_id)

        if user:
            # Delete the user from the database
            db.session.delete(user)
            db.session.commit()
            return jsonify({'message': 'User deleted successfully'}), 200
        else:
            return jsonify({'message': 'User not found'}), 404
    except Exception as e:
        return jsonify({'error': str(e)}), 400

# Admin purchases route
@admin_bp.route('/purchases', methods=['GET'])
def admin_manage_purchases():
    try:
        # Retrieve a list of all purchases from the database
        purchases = Purchase.query.all()

        # Create a list of purchase data
        purchase_data = []
        for purchase in purchases:
            purchase_info = {
                'user_id': purchase.user_id,
                'car_make': purchase.car_make,
                'price': purchase.price,
                'purchase_date': purchase.purchase_date,
                'status': purchase.status
            }
            purchase_data.append(purchase_info)

        return jsonify({'purchases': purchase_data}), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 400

# Admin cars management route
@admin_bp.route('/cars', methods=['GET'])
def admin_get_cars():
    # Query the database for car information and return it as JSON
    cars = Car.query.all()
    car_data = [
        {
            'id': car.id,
            'make': car.make,
            'model': car.model,
            'price': car.price,
            'year': car.year,
            'description': car.description,
            'image_url': car.image_url,
            'brand_id': car.brand_id
        }
        for car in cars
    ]
    return jsonify({'cars': car_data})

# Route to add a new car
@admin_bp.route('/cars/add', methods=['POST'])
def admin_add_car():
    data = request.json

    # Extract relevant information from the JSON data
    make = data.get('make')
    model = data.get('model')
    year = data.get('year')
    price = data.get('price')
    description = data.get('description')
    image_url = data.get('image_url')
    brand_id = data.get('brand_id')

    try:
        # Create a new car object and add it to the database
        new_car = Car(
            make=make,
            model=model,
            year=year,
            price=price,
            description=description,
            image_url=image_url,
            brand_id=brand_id
        )

        db.session.add(new_car)
        db.session.commit()

        return jsonify({'message': 'Car added successfully'}), 201
    except Exception as e:
        return jsonify({'error': str(e)}), 400

# Route to edit an existing car
@admin_bp.route('/cars/edit/<int:car_id>', methods=['PUT'])
def admin_edit_car(car_id):
    data = request.json

    # Extract relevant information from the JSON data
    make = data.get('make')
    model = data.get('model')
    year = data.get('year')
    price = data.get('price')
    description = data.get('description')
    image_url = data.get('image_url')
    brand_id = data.get('brand_id')

    try:
        # Find the existing car by car_id
        existing_car = Car.query.get(car_id)

        if existing_car:
            # Update the car information with the new data
            existing_car.make = make
            existing_car.model = model
            existing_car.year = year
            existing_car.price = price
            existing_car.description = description
            existing_car.image_url = image_url
            existing_car.brand_id = brand_id

            db.session.commit()
            return jsonify({'message': 'Car updated successfully'}), 200
        else:
            return jsonify({'message': 'Car not found'}), 404
    except Exception as e:
        return jsonify({'error': str(e)}), 400


# Route to delete an existing car
@admin_bp.route('/cars/delete/<int:car_id>', methods=['DELETE'])
def admin_delete_car(car_id):
    try:
        # Find the car to be deleted by car_id
        car_to_delete = Car.query.get(car_id)

        if car_to_delete:
            # Delete the car from the database
            db.session.delete(car_to_delete)
            db.session.commit()
            return jsonify({'message': 'Car deleted successfully'}), 200
        else:
            return jsonify({'message': 'Car not found'}), 404
    except Exception as e:
        return jsonify({'error': str(e)}), 400