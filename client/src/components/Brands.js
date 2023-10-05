import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';

function BrandShowcase() {
  const { brandName } = useParams();
  const [cars, setCars] = useState([]);
  const userIsLoggedIn = true; // Set this to true if the user is logged in, or false if not

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
                
                {/* Conditional rendering based on user authentication */}
                {userIsLoggedIn ? (
                  <Link to="/cart">
                    <button className="btn btn-primary">Add to Cart</button>
                  </Link>
                ) : (
                  <Link to="/login">
                    <button className="btn btn-secondary">Login to Add</button>
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
