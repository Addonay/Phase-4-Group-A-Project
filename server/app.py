from flask import Flask, request, jsonify
from config import Config
from models import db, Inquiry, User, NotificationPreference, Notification  # Import necessary models

from flask_cors import CORS
from flask_migrate import Migrate
from sqlalchemy import func  # Import func from SQLAlchemy

app = Flask(__name__)
app.config.from_object(Config)
db.init_app(app)

CORS(app, support_credentials=True)

migrate = Migrate(app, db)

#define your routes here
@app.route('/get-inquiries', methods=['GET'])
def get_inquiries():
    # Retrieve all inquiries from the database
    inquiries = Inquiry.query.all()
    # Serialize the inquiries to JSON
    inquiries_json = [{'id': inquiry.id, 'name': inquiry.name, 'email': inquiry.email, 'message': inquiry.message} for inquiry in inquiries]
    return jsonify({'inquiries': inquiries_json})

@app.route('/subscribe', methods=['POST'])
def subscribe():
    data = request.get_json()
    username = data.get('username')
    notification_type = data.get('notificationType')

    # Create or retrieve the user from the database
    user = User.query.filter_by(username=username).first()
    if user is None:
        user = User(username=username)
        db.session.add(user)

    # Create a notification preference for the user
    preference = NotificationPreference(user_id=user.id, notification_type=notification_type)
    db.session.add(preference)

    db.session.commit()

    return jsonify({'message': 'Subscription updated successfully'})

@app.route('/check-notifications/<username>')
def check_notifications(username):
    user = User.query.filter_by(username=username).first()
    if user is None:
        return jsonify({'message': 'User not found'}), 404
    notifications = Notification.query.filter_by(user_id=user.id).all()
    return jsonify({'notifications': [{'message': notification.message, 'timestamp': notification.timestamp} for notification in notifications]})

@app.route('/submit-review', methods=['POST'])
def submit_review():
    data = request.json
    rating = data.get('rating')
    comment = data.get('comment')

    if not (1 <= rating <= 5) or not comment.strip():
        return jsonify({'error': 'Invalid rating or comment'}), 400

    # Store the review in the database
    new_review = Review(rating=rating, comment=comment)
    db.session.add(new_review)
    db.session.commit()

    # Calculate and update average ratings 
    avg_rating = db.session.query(func.avg(Review.rating)).scalar()

    return jsonify({'message': 'Review submitted successfully', 'averageRating': avg_rating})

@app.route('/get-average-rating', methods=['GET'])
def get_average_rating():
    # Calculate and return the average rating for all reviews
    avg_rating = db.session.query(func.avg(Review.rating)).scalar()
    return jsonify({'averageRating': avg_rating})

if __name__ == "__main__":
    app.run(debug=True)
