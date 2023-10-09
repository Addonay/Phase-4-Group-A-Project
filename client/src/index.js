import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import "./styles/index.css";
import { HashRouter } from 'react-router-dom';
import { CartProvider } from './CartContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
     <HashRouter>
     <CartProvider>
      <App />
    </CartProvider>
      </HashRouter>
  </React.StrictMode>
);
