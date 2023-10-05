import React from 'react';
import { Routes, Route } from 'react-router-dom'; 
import Home from './components/Home';
import Enquiries from './components/EnquiryForm';
import Reviews from './components/Reviews';
import ContactInfo from './components/ContactInfo';
import Cart from './components/Cart';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/enquiries" element={<Enquiries />} />
      <Route path="/reviews" element={<Reviews />} />
      <Route path="/contact" element={<ContactInfo />} />
      <Route path="/cart" element={<Cart />} />
    </Routes>
  );
}

export default App;
