import React, { useEffect, useState } from 'react';
import Navbar from '../assets/Navbar';
import Slideshow from '../assets/Slideshow';
import { Link } from 'react-router-dom';

function Home() {
  const [brands, setBrands] = useState([]);

  useEffect(() => {
    // Fetch the list of brands from your Flask API
    fetch('http://127.0.0.1:5000/')
      .then((response) => response.json())
      .then((data) => setBrands(data.brands))
      .catch((error) => console.error('Error fetching brands:', error));
  }, []);

  return (
    <>
    <Navbar />
      <div className="container mt-4">
        <div className="container mx-auto px-4">
          <div className="mt-12">
            <h2 className="text-3xl font-bold text-center">
              Welcome to the Car Dealership App
            </h2>
            <p className="text-lg text-center mt-4">
              Explore our wide range of cars for sale.
            </p>
          </div>
        </div>
      </div>
      <Slideshow />
      <div className="container mt-4">
        <h1>Brands</h1>
        <div className="row row-cols-2 row-cols-md-8"> 
          {brands.map((brand) => (
            <div key={brand.id} className="col mb-4">
              <div className="card" style={{ width: '100%', height: '100%' }}>
                <Link to={`/${brand.name}/cars`} className="card">
                  <img
                    className="card-img-top"
                    src={brand.image_url}
                    alt={brand.name}
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
                  />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default Home;
