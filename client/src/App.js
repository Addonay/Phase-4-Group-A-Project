import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import Login from './components/Login';
import Register from './components/Register';
import UserProfile from './components/UserDashboard';
import BrandShowcase from './components/Brands';
import CartPage from './components/Cart';
import AdminDashboard from './components/AdminDashboard';
import Navbar from './assets/Navbar'; // Import the Navbar component
import { CartProvider } from './CartContext';
import AdminUserManagement from './components/AdminUserManagement.js';
import AdminCarManagement from './components/AdminCarManagement';

function App() {
  return (
    <CartProvider>
    <>
      <Navbar /> {/* Include the Navbar component */}
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route path="/auth/login" element={<Login />} />
        <Route path="/auth/register" element={<Register />} />
        <Route path="/userprofile" element={<UserProfile />} />
        <Route path="/:brandName/cars" element={<BrandShowcase />} />
        <Route path="/:username/cart" element={<CartPage />} />
        <Route path="/admin/dashboard" element={<AdminDashboard />}>
          <Route path="users" element={<AdminUserManagement />} />
          <Route path="cars" element={<AdminCarManagement />} />
        </Route>
      </Routes>
    </>
    </CartProvider>
  );
}

export default App;
