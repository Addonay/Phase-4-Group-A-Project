import React, { useEffect, useState } from 'react';
import axios from 'axios';

const UserCart = () => {
  const [cartItems, setCartItems] = useState([]);
  const [orderSummary, setOrderSummary] = useState({ totalPrice: 0 });

  useEffect(() => {
    // Fetch cart data from the backend when the component mounts
    axios
      .get('http://127.0.0.1:5000/cart') // Update the API endpoint to match your backend
      .then((response) => {
        setCartItems(response.data.cart_items);
        // Calculate the order summary
        const totalPrice = response.data.cart_items.reduce(
          (total, item) => total + item.price * item.quantity, // Calculate the total price considering quantity
          0
        );
        setOrderSummary({ totalPrice });
      })
      .catch((error) => {
        console.error('Error fetching cart data:', error);
      });
  }, []);

  // Function to handle adding items to the cart
  const handleAddToCart = (carId, quantity) => {
    axios
      .post('http://127.0.0.1:5000/cart', {
        car_id: carId,
        quantity: quantity,
      })
      .then((response) => {
        // Refresh cart data after adding an item
        axios
          .get('http://127.0.0.1:5000/cart')
          .then((response) => {
            setCartItems(response.data.cart_items);
            // Calculate the updated order summary
            const totalPrice = response.data.cart_items.reduce(
              (total, item) => total + item.price * item.quantity,
              0
            );
            setOrderSummary({ totalPrice });
          })
          .catch((error) => {
            console.error('Error refreshing cart data:', error);
          });
      })
      .catch((error) => {
        console.error('Error adding item to cart:', error);
      });
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col justify-center">
      <div className="py-6">
        <h1 className="text-3xl font-bold text-center">Your Cart</h1>
      </div>
      <div className="flex-grow container mx-auto bg-white shadow-md rounded-md p-6">
        {cartItems.length === 0 ? (
          <p className="text-center text-gray-500">Your cart is empty.</p>
        ) : (
          <>
            <ul>
              {cartItems.map((item) => (
                <li
                  key={item.id}
                  className="bg-gray-50 p-4 my-2 rounded-md flex items-center justify-between"
                >
                  <div>
                    <p className="text-lg font-semibold">Car ID: {item.car_id}</p>
                    <p className="text-gray-600">
                      Quantity: {item.quantity}, Price: ${item.price * item.quantity}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
            <div className="text-right mt-4">
              <p className="text-lg font-semibold">Order Summary</p>
              <p>Total Price: ${orderSummary.totalPrice}</p>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default UserCart;
