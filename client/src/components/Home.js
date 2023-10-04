// import React, { useState, useEffect } from "react";
// import Navbar from "../assets/Navbar";
// import Footer from "../assets/Footer";
// import VehicleList from "./VehicleList";

// function Home() {
//   const [vehicles, setVehicles] = useState([]);

//   useEffect(() => {
//     // Fetch vehicle data from your Flask API
//     fetch("http://127.0.0.1:5500/vehicles")
//       .then((response) => response.json())
//       .then((data) => {
//         setVehicles(data);
//       })
//       .catch((error) => {
//         console.error("Error fetching data:", error);
//       });
//   }, []);

//   return (
//     <div>
//       <Navbar />
//       <div className="container mx-auto px-4">
//         <div className="mt-12">
//           <h2 className="text-3xl font-bold text-center">
//             Welcome to the Car Dealership App
//           </h2>
//           <p className="text-lg text-center mt-4">
//             Explore our wide range of cars for sale.
//           </p>
//           <VehicleList vehicles={vehicles} />
//         </div>
//       </div>
//       <Footer />
//     </div>
//   );
// }

// export default Home;

import React from "react";
import Navbar from "../assets/Navbar";
import Footer from "../assets/Footer";
import { Link } from "react-router-dom";

function Home() {
  return (
    <div>
      <Navbar />
      <div className="container mx-auto px-4">
        <div className="mt-12">
          <h2 className="text-3xl font-bold text-center">
            Welcome to the Car Dealership App
          </h2>
          <p className="text-lg text-center mt-4">
            Explore our wide range of cars for sale.
          </p>
          <Link to="/vehicles" className="btn btn-primary mt-4">
            View Vehicle Listings
          </Link>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Home;

