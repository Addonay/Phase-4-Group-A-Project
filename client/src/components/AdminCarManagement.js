import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // Import useHistory from React Router

const AdminCarManagement = () => {
  const [cars, setCars] = useState([]);
  const navigate = useNavigate(); // Initialize the history object

  useEffect(() => {
    // Fetch car data from the server when the component mounts
    axios.get('http://127.0.0.1:5000/admin/cars')
      .then(response => {
        setCars(response.data.cars);
      })
      .catch(error => {
        console.error('Error fetching car data:', error);
      });
  }, []);

  const handleEditCar = (carId) => {
    // Navigate to the edit page for the car with the given carId
    navigate(`http://127.0.0.1:5000/admin/cars/edit/${carId}`);
  };

  const handleDeleteCar = (carId) => {
    // Implement the logic to delete the car with the given carId
    axios.delete(`http://127.0.0.1:5000/admin/cars/delete/${carId}`)
      .then(response => {
        // Handle successful deletion by removing the car from the state
        setCars(cars.filter(car => car.id !== carId));
        console.log(`Car with ID ${carId} deleted successfully.`);
      })
      .catch(error => {
        // Handle error if the deletion fails
        console.error(`Error deleting car with ID ${carId}:`, error);
      });
  };


  return (
    <div>
      <h1>Car Management</h1>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Make</th>
            <th>Model</th>
            <th>Year</th>
            <th>Price</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {cars.map(car => (
            <tr key={car.id}>
              <td>{car.id}</td>
              <td>{car.make}</td>
              <td>{car.model}</td>
              <td>{car.year}</td>
              <td>${car.price}</td>
              <td>
              <td>
                <button onClick={() => handleEditCar(car.id)}>Edit</button>
                <button onClick={() => handleDeleteCar(car.id)}>Delete</button>
              </td>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default AdminCarManagement;
