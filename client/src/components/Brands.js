import React, { useEffect, useState, useContext } from 'react';
import { useParams, Link } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthContext'; 
import Rate from "../assets/Rate";

function BrandShowcase() {
  const { brandName } = useParams();
  const [cars, setCars] = useState([]);
  const { current_user } = useContext(AuthContext);

  useEffect(() => {
    // Fetch cars by brandName from your API
    fetch(`http://127.0.0.1:5000/${brandName}/cars`)
      .then((response) => response.json())
      .then((data) => setCars(data.cars))
      .catch((error) => console.error('Error fetching cars:', error));
  }, [brandName]);

  return (
    <div>
      <h1>Cars by {brandName}</h1>
      <div className="row">
        {cars.map((car) => (
          <div key={car.id} className="col-md-4 mb-4">
            <div className="card">
              <img
                className="card-img-top"
                src={car.image_url}
                alt={`${car.make} ${car.model}`}
              />
              <div className="card-body">
                <h5 className="card-title">{car.make} {car.model}</h5>
                <p className="card-text">Year: {car.year}</p>
                <p className="card-text">Price: ${car.price}</p>
                {car.description && <p className="card-text">{car.description}</p>}
                <Rate/>
                {/* Conditional rendering based on user authentication */}
                {current_user ? (
                <Link to={`/${current_user.username}/cart`}>
                  <button className="btn btn-primary">Add to Cart</button>
                </Link>
              ) : (
                <Link to="/login">
                  <button className="btn btn-secondary">Login to Add to Cart</button>
                </Link>
              )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default BrandShowcase;
