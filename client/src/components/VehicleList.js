// import React from 'react';

// export default function VehicleList({ vehicles }) {
//   const header = <h1 className="header">Vehicle Listings</h1>
  
//   const displayedVehicles = vehicles.map((vehicle) => (
//     <div key={vehicle.id} className="card col-4 m-4 bg-transparent border border-dark">
//       <img src={vehicle.image_url} className="card-img-top img-fluid rounded-5 m-1" alt={`${vehicle.make} ${vehicle.model}`} />
//       <div className="card-body m-1">
//         <h5 className="card-title text-light">{`${vehicle.make} ${vehicle.model}`}</h5>
//         <p className="card-text text-light">Price: ${vehicle.price}</p>
        
//       </div>
//       <button className="btn btn-danger m-2" id={vehicle.id}>View Details</button>
//     </div>
//   ));

//   return (
//     <div className="row">
//       {header}
//       {displayedVehicles}
//     </div>
//   );
// }

import React, { useState, useEffect } from "react";

export default function VehicleList() {
  const [vehicles, setVehicles] = useState([]);
  const [filteredVehicles, setFilteredVehicles] = useState([]);
  const [searchText, setSearchText] = useState("");

  useEffect(() => {
    // Fetch vehicle data from your Flask API
    fetch("http://127.0.0.1:5500/vehicles")
      .then((response) => response.json())
      .then((data) => {
        setVehicles(data);
        setFilteredVehicles(data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  const handleSearchInputChange = (event) => {
    const query = event.target.value.toLowerCase();
    setSearchText(query);
    const filtered = vehicles.filter((vehicle) => (
      vehicle.make.toLowerCase().includes(query) ||
      vehicle.model.toLowerCase().includes(query)
    ));
    setFilteredVehicles(filtered);
  };

  return (
    <div>
      <h1 className="header">Vehicle Listings</h1>
      <div className="search-bar">
        <input
          type="text"
          placeholder="Search by Make or Model"
          value={searchText}
          onChange={handleSearchInputChange}
        />
      </div>
      <div className="row">
        {filteredVehicles.map((vehicle) => (
          <div key={vehicle.id} className="card col-2 m-4  border border-dark">
            <img src={vehicle.image_url} className="card-img-top img-fluid col-3 m-2" alt={`${vehicle.make} ${vehicle.model}`} />
            <div className="card-body m-1">
              <h5 className="card-title text-dark">{`${vehicle.make} ${vehicle.model}`}</h5>
              <p className="card-text text-dark">Price: ${vehicle.price}</p>
              
            </div>
            <button className="btn btn-success m-2" id={vehicle.id}>Add to Cart</button>
          </div>
        ))}
      </div>
    </div>
  );
}

