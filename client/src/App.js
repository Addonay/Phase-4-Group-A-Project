import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import ReviewsAndRatings from './components/ReviewsAndRatings';
import Inquiries from './components/Inquiries';
import Notifications from './components/Notifications';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/reviews" element={<ReviewsAndRatings />} />
      <Route path="/inquiries" element={<Inquiries />} />
      <Route path="/notifications" element={<Notifications />} />
    </Routes>
  );
}

export default App;
