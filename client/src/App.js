import React from 'react';
import { Routes, Route } from "react-router-dom";
import Home from './components/Home';
import VehicleList from './components/VehicleList';
import './App.css'

function App() {
  
  return (
    <Routes>
      <Route exact path="/" element={<Home />} />
      <Route path="/vehicles" element={<VehicleList />} />
    </Routes>
  );
}

export default App;
