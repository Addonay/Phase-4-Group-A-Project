import React from 'react';
import { Routes, Route } from "react-router-dom";
import Home from './components/Home';
import Login from './components/Login';
import Register from './components/Register';
import UserProfile from './components/UserDashboard';
import BrandShowcase from './components/Brands';
import CartPage from './components/Cart';


function App() {
  
  return (
    <Routes>
      <Route exact path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/userprofile" element={<UserProfile />} />
      <Route path="/:brandName/cars" element={<BrandShowcase />} />
      <Route path='/:username/cart' element={<CartPage />}/>
    </Routes>
  );
}

export default App;
