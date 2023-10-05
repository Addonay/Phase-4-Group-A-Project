class Car:
    def __init__(self, make, model, year, color):
        self.make = make
        self.model = model
        self.year = year
        self.color = color

    def __str__(self):
        return f"{self.year} {self.make} {self.model} ({self.color})"


class CarManagement:
    def __init__(self):
        self.cars = []

    def add_car(self, make, model, year, color):
        car = Car(make, model, year, color)
        self.cars.append(car)

    def get_car_by_index(self, index):
        if 0 <= index < len(self.cars):
            return self.cars[index]
        return None

    def get_all_cars(self):
        return self.cars

    def update_car(self, index, make, model, year, color):
        if 0 <= index < len(self.cars):
            self.cars[index].make = make
            self.cars[index].model = model
            self.cars[index].year = year
            self.cars[index].color = color
            return True
        return False

    def delete_car(self, index):
        if 0 <= index < len(self.cars):
            del self.cars[index]
            return True
        return False


if __name__ == "__main__":
    car_manager = CarManagement()

    car_manager.add_car("Toyota", "Camry", 2022, "Blue")
    car_manager.add_car("Honda", "Civic", 2021, "Red")

    print("List of Cars:")
    for index, car in enumerate(car_manager.get_all_cars()):
        print(f"{index + 1}. {car}")

    if car_manager.update_car(0, "Toyota", "Corolla", 2022, "Silver"):
        print("Car updated successfully")

    if car_manager.delete_car(1):
        print("Car deleted successfully")

    print("\nUpdated List of Cars:")
    for index, car in enumerate(car_manager.get_all_cars()):
        print(f"{index + 1}. {car}")
