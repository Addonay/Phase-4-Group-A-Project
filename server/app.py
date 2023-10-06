from flask import Flask, jsonify, request, session
from config import Config
from models import db, User,Brand, Admin, Cart, Car, Purchase,Inquiry
from flask_bcrypt import Bcrypt
from flask_cors import CORS
from flask_migrate import Migrate
from forms import LoginForm, RegistrationForm
from flask_login import LoginManager, logout_user,login_user, current_user, login_required
from flask_session import Session  
from flask_wtf.csrf import CSRFProtect

app = Flask(__name__)
app.config.from_object(Config)
db.init_app(app)

bcrypt = Bcrypt(app)

CORS(app, supports_credentials=True)
CSRFProtect(app)
migrate = Migrate(app, db)
Session(app)

# Flask-Login setup
login_manager = LoginManager()
login_manager.init_app(app)

@login_manager.user_loader
def load_user(user_id):
    return User.get_by_id(user_id)

@app.route("/", methods=["GET"])
def list_brands():
    # Retrieve a list of brands from the database
    brands = Brand.query.all()

    # Convert the list of brands to a JSON response
    brand_list = [{"id": brand.id, "name": brand.name, "image_url": brand.image_url} for brand in brands]

    return jsonify(brands=brand_list)


@app.route("/register", methods=["POST"])
def register():
    # Parse JSON data from the request
    data = request.get_json()

    # Create an instance of the RegistrationForm and populate it with the JSON data
    form = RegistrationForm(**data)

    if form.validate():
        username = form.username.data
        email = form.email.data
        password = form.password.data

        # Check if the user already exists
        existing_user = User.query.filter_by(username=username).first()

        if existing_user:
            return jsonify({"error": "Username is already in use. Please choose a different one."}), 409

        # Check if the email address is already registered
        existing_email = User.query.filter_by(email=email).first()

        if existing_email:
            return jsonify({"error": "Email address is already registered. Please use a different one."}), 409

        # Hash the password
        hashed_password = bcrypt.generate_password_hash(password).decode('utf-8')

        # Create a new user
        new_user = User(username=username, email=email, password=hashed_password)
        db.session.add(new_user)
        db.session.commit()

        # Log in the user by setting their user ID in the session
        session["user_id"] = new_user.id

        return jsonify({
            "id": new_user.id,
            "email": new_user.email
        })
    else:
        # Return validation errors
        return jsonify({"errors": form.errors}), 400



from flask import request, jsonify, session
from forms import LoginForm  # Import the LoginForm

@app.route("/login", methods=["POST"])
def login_user():
    # Check if the request content type is JSON
    if request.is_json:
        # Login via JSON
        data = request.get_json()
        form = LoginForm(**data)
    else:
        # Login via form
        form = LoginForm(request.form)

    if form.validate():
        username = form.username.data
        password = form.password.data

        user = User.query.filter_by(username=username).first()

        if user is None:
            return jsonify({"error": "Unauthorized Access"}), 401

        if not bcrypt.check_password_hash(user.password, password):
            return jsonify({"error": "Unauthorized"}), 401

        session["user_id"] = user.id

        return jsonify({
            "id": user.id,
            "email": user.email,
            "user_role": user.user_role
        })
    else:
        # Return validation errors
        return jsonify({"errors": form.errors}), 400


@app.route('/user', methods=['GET'])
def get_user():
    if current_user.is_authenticated:
        # User is authenticated, return user data
        user_data = {
            'id': current_user.id,
            'email': current_user.email,
            'user_role': current_user.user_role  # Include the user role
        }
        return jsonify(user_data), 200
    else:
        # User is not authenticated, return an empty response
        return jsonify({}), 401



@app.route('/logout', methods=['POST'])
@login_required
def logout():
    logout_user()

    # Clear Flask-Session data
    session.pop('user_id', None)

    return jsonify(message='Logged out successfully'), 200

@app.route('/delete_account', methods=['DELETE'])
@login_required
def delete_account():
    db.session.delete(current_user)
    db.session.commit()
    logout_user()

    # Clear Flask-Session data
    session.pop('user_id', None)

    return jsonify(message='Your account has been deleted'), 200

#cars
@app.route('/<brand_name>/cars', methods=['GET'])
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
    
#cart
@app.route('/<username>/cart', methods=['GET'])
def user_cart(username):
    # Find the user by username
    user = User.query.filter_by(username=username).first()

    if user:
        # Find all items in the user's cart
        cart_items = Cart.query.filter_by(user_id=user.id).all()

        if cart_items:
            # Create a list of cart item data
            cart_data = [
                {
                    'id': item.id,
                    'car_id': item.car_id,
                    'quantity': item.quantity,
                    # Add any other relevant cart item data
                }
                for item in cart_items
            ]

            # Return the cart item data as JSON
            return jsonify({'cart_items': cart_data, 'username': username})
        else:
            # Handle the case when the user's cart is empty
            return jsonify({'message': 'Cart is empty', 'username': username}), 200
    else:
        # Handle the case when the user is not found
        return jsonify({'message': 'User not found', 'username': username}), 404
    
#admin
@app.route("/admin/dash", methods=["GET"])
@login_required
def admin_dash():
    if current_user.user_role == 'admin':
        @app.route("/admin/dash/cars", methods=["POST"])
        @login_required
        def create_car():
            if current_user.user_role == 'admin':
                data = request.get_json()

                if not data:
                    return jsonify(message="Invalid data format"), 400

                make = data.get("make")
                model = data.get("model")
                year = data.get("year")
                price = data.get("price")
                description = data.get("description")
                image_url = data.get("image_url")

                if not make or not model or not year or not price:
                    return jsonify(message="Missing required fields"), 400

                car = Car(make=make, model=model, year=year, price=price, description=description, image_url=image_url, admin_id=current_user.id)
                db.session.add(car)
                db.session.commit()

                return jsonify(message="Car created successfully"), 201
            else:
                return jsonify(message="Unauthorized Access: Only admins can create cars"), 403

        @app.route("/admin/dash/cars/<int:car_id>", methods=["PUT"])
        @login_required
        def update_car(car_id):
            if current_user.user_role == 'admin':
                data = request.get_json()

                if not data:
                    return jsonify(message="Invalid data format"), 400

                car = Car.query.get(car_id)

                if not car:
                    return jsonify(message="Car not found"), 404

                car.make = data.get("make", car.make)
                car.model = data.get("model", car.model)
                car.year = data.get("year", car.year)
                car.price = data.get("price", car.price)
                car.description = data.get("description", car.description)
                car.image_url = data.get("image_url", car.image_url)

                db.session.commit()

                return jsonify(message="Car updated successfully"), 200
            else:
                return jsonify(message="Unauthorized Access: Only admins can update cars"), 403

        @app.route("/admin/dash/cars/<int:car_id>", methods=["DELETE"])
        @login_required
        def delete_car(car_id):
            if current_user.user_role == 'admin':
                car = Car.query.get(car_id)

                if not car:
                    return jsonify(message="Car not found"), 404

                db.session.delete(car)
                db.session.commit()

                return jsonify(message="Car deleted successfully"), 200
            else:
                return jsonify(message="Unauthorized Access: Only admins can delete cars"), 403

        return jsonify(message="Welcome to the admin dashboard!")
    else:
        # Return an error response for non-admin users
        return jsonify(message="Unauthorized Access: Only admins can access this page."), 403

#purchase
@app.route("/<string:username>/<int:car_id>/purchase", methods=["POST"])
@login_required
def make_purchase(username, car_id):
    # Verify that the provided username matches the current user's username
    if username != current_user.username:
        return jsonify(message="Unauthorized Access: Invalid username"), 403

    # Verify if the car exists and is available for purchase
    car = Car.query.get(car_id)
    if not car:
        return jsonify(message="Car not found"), 404

    # Add further checks and payment processing logic if needed

    # Create a new purchase record
    purchase = Purchase(user_id=current_user.id, car_id=car_id)
    db.session.add(purchase)
    db.session.commit()

    return jsonify(message="Purchase successful"), 201

#Inquiry route
@app.route('/inquiries', methods=['POST'])
@login_required
def create_inquiry():
    data = request.get_json()

    if not data:
        return jsonify(message='Invalid data format'), 400

    car_id = data.get('car_id')
    message = data.get('message')

    if not car_id or not message:
        return jsonify(message='Missing required fields'), 400

    # Check if the car exists
    car = Car.query.get(car_id)
    if not car:
        return jsonify(message='Car not found'), 404

    # Create a new inquiry
    inquiry = Inquiry(user_id=current_user.id, car_id=car.id, message=message, status='Pending')
    db.session.add(inquiry)
    db.session.commit()

    return jsonify(message='Inquiry sent successfully'), 201

# Get user's inquiries
@app.route('/inquiries/user', methods=['GET'])
@login_required
def get_user_inquiries():
    user_id = current_user.id
    inquiries = Inquiry.query.filter_by(user_id=user_id).all()

    # Serialize inquiries if needed
    serialized_inquiries = []

    for inquiry in inquiries:
        serialized_inquiry = {
            'id': inquiry.id,
            'car_id': inquiry.car_id,
            'message': inquiry.message,
            'status': inquiry.status,
            'created_at': inquiry.created_at,
        }
        serialized_inquiries.append(serialized_inquiry)

    return jsonify(inquiries=serialized_inquiries)

# Admin route to view all inquiries
@app.route('/inquiries/admin', methods=['GET'])
@login_required
def get_all_inquiries():
    if current_user.user_role == 'admin':
        inquiries = Inquiry.query.all()

        # Serialize inquiries if needed
        serialized_inquiries = []

        for inquiry in inquiries:
            serialized_inquiry = {
                'id': inquiry.id,
                'user_id': inquiry.user_id,
                'car_id': inquiry.car_id,
                'message': inquiry.message,
                'status': inquiry.status,
                'created_at': inquiry.created_at,
            }
            serialized_inquiries.append(serialized_inquiry)

        return jsonify(inquiries=serialized_inquiries)
    else:
        return jsonify(message='Unauthorized Access: Only admins can access this page.'), 403
if __name__ == "__main__":
    app.run(debug=True)
