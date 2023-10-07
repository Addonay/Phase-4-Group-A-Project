import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

function CartPage() {
  const { username } = useParams();
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    // Fetch the user's cart items by username from your API
    fetch(`http://127.0.0.1:5000/${username}/cart`)
      .then((response) => response.json())
      .then((data) => setCartItems(data.cart_items))
      .catch((error) => console.error('Error fetching cart items:', error));
  }, [username]);

  return (
    <div>
      <h1>Shopping Cart for {username}</h1>
      {cartItems.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <table className="table">
          <thead>
            <tr>
              <th>Car</th>
              <th>Quantity</th>
              {/* Add additional table headers as needed */}
            </tr>
          </thead>
          <tbody>
            {cartItems.map((item) => (
              <tr key={item.id}>
                <td>{item.car_id}</td> {/* Display car information here */}
                <td>{item.quantity}</td>
                {/* Add additional table data columns as needed */}
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default CartPage;
