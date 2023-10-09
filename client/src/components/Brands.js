import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useCart } from '../CartContext'; // Import useCart hook

const BrandShowcase = () => {
  const { brandName } = useParams();
  const [brandData, setBrandData] = useState({ cars: [], brand: '' });
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Use the useCart hook to access addToCart function and cart items
  const { addToCart, cartItems } = useCart();

  useEffect(() => {
    // Simulate user authentication (replace with your actual logic)
    const fakeUserAuthentication = setTimeout(() => {
      setIsAuthenticated(true); // Set isAuthenticated to true after 2 seconds
    }, 2000);

    // Clear the timeout to prevent memory leaks
    return () => clearTimeout(fakeUserAuthentication);
  }, []);

  useEffect(() => {
    // Fetch car data for the specified brand from the backend when the component mounts
    fetch(`http://127.0.0.1:5000/${brandName}/cars`)
      .then((response) => response.json())
      .then((data) => setBrandData(data))
      .catch((error) => console.error('Error fetching brand data:', error));
  }, [brandName]);

  const { cars, brand } = brandData;

  // Function to add a car to the cart
  const handleAddToCart = (car) => {
    addToCart(car); // Use the addToCart function from the context
    alert(`${car.make} ${car.model} has been added to your cart.`);
  };
  
  return (
    <>
      <div className="container mx-auto p-4">
        <h1 className="text-4xl font-bold mb-4">{`Cars by ${brand}`}</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {cars && cars.length > 0 ? (
            cars.map((car) => (
              <div key={car.id} className="bg-white rounded-lg shadow-md overflow-hidden">
                <img src={car.image_url} alt={`${car.make} ${car.model}`} className="w-full h-48 object-cover" />
                <div className="p-4">
                  <h2 className="text-xl font-semibold mb-2">{`${car.make} ${car.model}`}</h2>
                  <p className="text-gray-600">Price: ${car.price}</p>
                  <p className="text-gray-600">Description: {car.description}</p>
                  {isAuthenticated ? (
                    <button
                      className="bg-blue-500 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded mt-2"
                      onClick={() => handleAddToCart(car)} // Call handleAddToCart function on button click
                    >
                      Add to Cart
                    </button>
                  ) : (
                    <p className="text-red-600 mt-2">
                      You need to <Link to="/login" className="text-blue-600">log in</Link> to add to cart.
                    </p>
                  )}
                </div>
              </div>
            ))
          ) : (
            <p>No cars found for this brand</p>
          )}
        </div>
      </div>
    </>
  );
};

export default BrandShowcase;
