from app import app
from models import Vehicle, db

# Your initial vehicles data
initial_vehicles = [
     {
        "make": "Toyota",
        "model": "Camry",
        "price": 2500000,
        "image_url": "https://images.unsplash.com/photo-1624578571415-09e9b1991929?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Y2Ftcnl8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=500&q=60",  
    },
    {
        "make": "Honda",
        "model": "Civic",
        "price": 2000000,
        "image_url": "https://images.unsplash.com/photo-1636915873177-a0c1a48d84eb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTR8fGhvbmRhJTIwY2l2aWN8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=500&q=60",  
    },
     {
        "make": "Toyota",
        "model": "Prado V8",
        "price": 8000000,
        "image_url": "https://images.unsplash.com/photo-1621993202323-f438eec934ff?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1364&q=80",
    },
     {
        "make": "Subaru",
        "model": "Impreza",
        "price": 1800000,
        "image_url": "https://images.unsplash.com/photo-1645112696911-9e1c2bddf835?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTN8fHN1YmFydSUyMGltcHJlenphfGVufDB8fDB8fHww&auto=format&fit=crop&w=500&q=60",
    },
     {
        "make": "Mazda",
        "model": "Demio",
        "price": 1300000,
        "image_url": "https://images.unsplash.com/photo-1683006447057-ca420bdcc8a9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fG1hemRhJTIwZGVtaW98ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=500&q=60",
    },
     {
        "make": "Mercedes",
        "model": "G wagon",
        "price": 15000000,
        "image_url": "https://images.unsplash.com/photo-1634636208509-63bcd2a1b13f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8ZyUyMHdhZ29ufGVufDB8fDB8fHww&auto=format&fit=crop&w=500&q=60",
    },
     {
        "make": "Range Rover",
        "model": "Sport",
        "price": 7000000,
        "image_url": "https://images.unsplash.com/photo-1638686302275-0e87df720aca?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fHJhbmdlJTIwcm92ZXIlMjBzcG9ydHxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=500&q=60",
    },
     {
        "make": "Land Rover",
        "model": "Discovery",
        "price": 6000000,
        "image_url": "https://example.com/hyundai_elantra.jpg",
    },
     {
        "make": "Isuzu",
        "model": "Dmax",
        "price": 25000,
        "image_url": "https://images.unsplash.com/photo-1576230039354-d99bcd02bfd1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8aXN1enUlMjBkbWF4fGVufDB8fDB8fHww&auto=format&fit=crop&w=500&q=60",
    },
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
