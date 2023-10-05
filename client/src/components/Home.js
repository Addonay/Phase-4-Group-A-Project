import React from 'react';
import Navbar from '../assets/Navbar'; // Corrected import path
import Footer from '../assets/Footer'; // Corrected import path

function Home() {
  return (
    <div>
      <Navbar />
      <div className="container mx-auto px-4">
        <div className="mt-12">
          <h2 className="text-3xl font-bold text-center">
            Welcome to the Car Dealership App
          </h2>
          <p className="text-lg text-center mt-4">
            Explore our wide range of cars for sale.
          </p>
          {/* Add your car listings or other content here */}
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Home;

