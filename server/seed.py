from app import app
from models import Vehicle, db

# Your initial vehicles data
initial_vehicles = [
    # ... (as shown in the previous example)
]

def seed_database():
    # Create an application context
    with app.app_context():
        # Create the database tables if they don't exist
        db.create_all()

        # Seed the database with initial vehicle data
        for vehicle_data in initial_vehicles:
            vehicle = Vehicle(
                make=vehicle_data["make"],
                model=vehicle_data["model"],
                price=vehicle_data["price"],
                image_url=vehicle_data["image_url"],
            )
            db.session.add(vehicle)

        # Commit the changes to the database
        db.session.commit()

if __name__ == '__main__':
    seed_database()
