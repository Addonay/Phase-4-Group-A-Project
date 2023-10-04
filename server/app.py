from flask import Flask, jsonify, request, session
from config import Config
from models import db, User
from flask_bcrypt import Bcrypt
from flask_cors import CORS
from flask_migrate import Migrate
from forms import LoginForm, RegistrationForm
from flask_login import LoginManager, logout_user, current_user, login_required
from flask_session import Session  

app = Flask(__name__)
app.config.from_object(Config)
db.init_app(app)

bcrypt = Bcrypt(app)

CORS(app, support_credentials=True)

migrate = Migrate(app, db)
Session(app)

# Flask-Login setup
login_manager = LoginManager()
login_manager.init_app(app)

@login_manager.user_loader
def load_user(user_id):
    return User.get_by_id(user_id)

@app.route("/register", methods=["POST"])
def register():
    form = RegistrationForm(request.form)

    if form.validate():
        username = form.username.data
        email = form.email.data
        password = form.password.data

        user_exists = User.query.filter_by(username=username).first() is not None

        if user_exists:
            return jsonify({"error": "User already exists"}), 409

        hashed_password = bcrypt.generate_password_hash(password).decode('utf-8')  # Hash the password

        new_user = User(username=username, email=email, password=hashed_password)  # Use the hashed password
        db.session.add(new_user)
        db.session.commit()

        session["user_id"] = new_user.id

        return jsonify({
            "id": new_user.id,
            "email": new_user.email
        })
    else:
        # Return validation errors
        return jsonify({"errors": form.errors}), 400

@app.route("/login", methods=["POST"])
def login_user():
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
            "email": user.email
        })
    else:
        # Return validation errors
        return jsonify({"errors": form.errors}), 400

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

if __name__ == "__main__":
    app.run(debug=True)
