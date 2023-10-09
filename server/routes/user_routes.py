from flask import Blueprint, jsonify, request
from flask_jwt_extended import jwt_required, get_jwt_identity
from models import db, Car, Cart, User, Purchase,Brand


user_bp = Blueprint("user", __name__)

# Cars by brand
@user_bp.route('/<brand_name>/cars', methods=['GET'])
def cars_by_brand(brand_name):
    # Find the brand by name
    brand = Brand.query.filter_by(name=brand_name).first()

    if brand:
        # Find all cars belonging to the specified brand
        cars = Car.query.filter_by(brand_id=brand.id).all()

        if cars:
            # Create a list of car data
            car_data = [
                {
                    'id': car.id,
                    'make': car.make,
                    'model': car.model,
                    'price': car.price,
                    'description': car.description,
                    'image_url': car.image_url,
                }
                for car in cars
            ]

            # Return the car data as JSON
            return jsonify({'cars': car_data, 'brand': brand_name})
        else:
            # Handle the case when no cars are found for the brand
            return jsonify({'message': 'No cars found for this brand', 'brand': brand_name}), 404
    else:
        # Handle the case when the brand is not found
        return jsonify({'message': 'Brand not found', 'brand': brand_name}), 404

# User cart
@user_bp.route('/cart', methods=['GET', 'POST'])
@jwt_required
def user_cart():
    user_id = get_jwt_identity()

    if request.method == 'GET':
        # Handle GET request to fetch the user's cart
        cart_items = Cart.query.filter_by(user_id=user_id).all()

        if cart_items:
            cart_data = [
                {
                    'id': item.id,
                    'car_id': item.car_id,
                    'quantity': item.quantity,
                    "price": item.price,
                }
                for item in cart_items
            ]

            return jsonify({'cart_items': cart_data}), 200
        else:
            return jsonify({'message': 'Cart is empty'}), 200

    elif request.method == 'POST':
        # Handle POST request to add an item to the user's cart
        data = request.json
        car_id = data.get('car_id')
        quantity = data.get('quantity')

        # Check if the user already has an existing cart item for the same car_id
        existing_cart_item = Cart.query.filter_by(user_id=user_id, car_id=car_id).first()

        if existing_cart_item:
            # If the item already exists, update the quantity
            existing_cart_item.quantity += quantity
            db.session.commit()
        else:
            # If it doesn't exist, create a new cart item
            new_cart_item = Cart(user_id=user_id, car_id=car_id, quantity=quantity)
            db.session.add(new_cart_item)
            db.session.commit()

        return jsonify({'message': 'Item added to cart successfully'}), 201


# Make purchase
@user_bp.route('/purchase/<int:car_id>', methods=['POST'])
@jwt_required()  # Make sure to include parentheses to call the decorator
def purchase(car_id):
    try:
        current_user_id = get_jwt_identity()
        user = User.query.get(current_user_id)

        if user:
            # Check if the car with the given ID exists
            car = Car.query.get(car_id)
            if car is None:
                return jsonify({'error': 'Car not found'}), 404

            # Calculate the total price (you can add any logic here)
            total_price = car.price

            # Create a new purchase record
            purchase = Purchase(user_id=current_user_id, car_id=car_id, price=total_price)

            # Add the purchase to the database
            db.session.add(purchase)
            db.session.commit()

            return jsonify({'message': 'Car purchased successfully'}), 200

        else:
            return jsonify({'error': 'User not found'}), 404

    except Exception as e:
        return jsonify({'error': str(e)}), 500
    

@user_bp.route('/profile', methods=['GET'])
@jwt_required()
def profile():
    try:
        current_user_id = get_jwt_identity()

        # Find the user by their ID in the database
        user = User.query.get(current_user_id)

        if user:
            # Return a comprehensive user profile
            profile_data = {
                'username': user.username,
                'email': user.email,
                'profile_image': user.profile_image,
                'user_role': user.user_role,
                'created_at': user.created_at.strftime('%Y-%m-%d %H:%M:%S')
            }

            return jsonify(profile_data), 200
        else:
            return jsonify({'error': 'User not found'}), 404

    except Exception as e:
        return jsonify({'error': str(e)}), 500

