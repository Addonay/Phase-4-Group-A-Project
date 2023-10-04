import React from 'react';
import { BrowserRouter as Router, Route, Link, Routes } from 'react-router-dom';

import Enquiries from './components/Enquiries';
import Reviews from './components/Reviews';
import ContactInfo from './components/ContactInfo';
import Cart from './components/Cart'; 

function App() {
  return (
    <Router>
      <div>
        <nav>
          <ul>
            <li>
              <Link to="/enquiries">Enquiries</Link>
            </li>
            <li>
              <Link to="/reviews">Reviews</Link>
            </li>
            <li>
              <Link to="/contact">Contact</Link>
            </li>
            <li>
              <Link to="/cart">Cart</Link> 
            </li>
          </ul>
        </nav>

        <Routes>
          <Route path="/enquiries" element={<Enquiries />} />
          <Route path="/reviews" element={<Reviews />} />
          <Route path="/contact" element={<ContactInfo />} />
          <Route path="/cart" element={<Cart />} /> 
        </Routes>
      </div>
    </Router>
  );
}

export default App;
