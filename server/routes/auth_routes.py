from flask import Blueprint, request, jsonify
from flask_bcrypt import Bcrypt
from flask_jwt_extended import JWTManager, create_access_token, create_refresh_token, jwt_required, get_jwt_identity, unset_jwt_cookies
from models import User,db
from forms import RegistrationForm, LoginForm

# Create a Blueprint for authentication routes
auth_bp = Blueprint("auth", __name__)

bcrypt = Bcrypt()
jwt = JWTManager()

@auth_bp.route('/register', methods=['POST'])
def register():
    # Parse JSON data using the RegistrationForm
    data = request.get_json()
    form = RegistrationForm(**data)

    if form.validate():
        # Check if the username or email already exists in the database
        existing_user = User.query.filter_by(username=form.username.data).first()
        if existing_user:
            return jsonify(message="Username is already in use"), 400

        existing_email = User.query.filter_by(email=form.email.data).first()
        if existing_email:
            return jsonify(message="Email address is already registered"), 400

        # Create a new user and add it to the database
        new_user = User(
            username=form.username.data,
            email=form.email.data,
            password=bcrypt.generate_password_hash(form.password.data).decode('utf-8')
        )

        db.session.add(new_user)
        db.session.commit()

        # Create and return the JWT token
        access_token = create_access_token(identity=new_user.id)
        return jsonify(access_token=access_token), 201
    else:
        return jsonify(errors=form.errors), 400

@auth_bp.route('/login', methods=['POST'])
def login():

    # Parse JSON data using the LoginForm
    data = request.get_json()
    form = LoginForm(**data)

    if form.validate():
        # Find the user by username in the database
        user = User.query.filter_by(username=form.username.data).first()

        if user and bcrypt.check_password_hash(user.password, form.password.data):
            # Create and return both access and refresh tokens
            access_token = create_access_token(identity=user.id)
            refresh_token = create_refresh_token(identity=user.id)
            return jsonify(access_token=access_token, refresh_token=refresh_token), 200

    return jsonify(message="Invalid username or password"), 401

@auth_bp.route('/logout', methods=['POST'])
@jwt_required
def logout():
    unset_jwt_cookies()
    return jsonify(message="Logged out successfully"), 200

# 


    
@auth_bp.route('/refresh', methods=['POST'])
@jwt_required(refresh=True)
def refresh():
    current_user_id = get_jwt_identity()
    access_token = create_access_token(identity=current_user_id)
    return jsonify(access_token=access_token), 200

