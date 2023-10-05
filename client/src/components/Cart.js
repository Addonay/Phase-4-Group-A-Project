import React, { useState, useEffect } from 'react';
import './Cart.css';

function Cart() {
  const [cart, setCart] = useState([]);
  const cartStorageKey = 'cart';

  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem(cartStorageKey) || '[]');
    setCart(storedCart);
  }, []);

  useEffect(() => {
    localStorage.setItem(cartStorageKey, JSON.stringify(cart));
  }, [cart]);

  const addToCart = (item) => {
    setCart([...cart, item]);
  };

  const removeFromCart = (itemId) => {
    const updatedCart = cart.filter((item) => item.id !== itemId);
    setCart(updatedCart);
  };

  const clearCart = () => {
    setCart([]);
  };

  const checkout = () => {
    clearCart();
    alert('Thank you for your purchase! Your order has been placed.');
  };

  const cartTotal = cart.reduce((total, item) => total + item.price, 0);

  const availableItems = [
    { id: 1, name: 'Item 1', price: 10 },
    { id: 2, name: 'Item 2', price: 15 },
    { id: 3, name: 'Item 3', price: 20 },
  ];

  return (
    <div className="App">
      <h1>Shopping Cart</h1>
      <div className="items">
        <h2>Available Items</h2>
        <ul>
          {availableItems.map((item) => (
            <li key={item.id}>
              {item.name} - ${item.price}
              <button onClick={() => addToCart(item)}>Add to Cart</button>
            </li>
          ))}
        </ul>
      </div>
      <div className="cart">
        <h2>Cart</h2>
        {cart.length === 0 ? (
          <p>Your cart is empty.</p>
        ) : (
          <ul>
            {cart.map((item) => (
              <li key={item.id}>
                {item.name} - ${item.price}
                <button onClick={() => removeFromCart(item.id)}>Remove</button>
              </li>
            ))}
          </ul>
        )}
        {cart.length > 0 && (
          <div>
            <button onClick={clearCart}>Clear Cart</button>
            <button onClick={checkout}>Checkout</button>
            <p>Total: ${cartTotal}</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default Cart;
