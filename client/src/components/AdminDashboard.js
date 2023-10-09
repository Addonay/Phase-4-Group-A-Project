import React, { Component } from 'react';
import axios from 'axios';

class AdminDashboard extends Component {
  constructor() {
    super();
    this.state = {
      totalUsers: 0,
      totalCars: 0,
      totalPurchases: 0,
      // Add more state properties as needed for dashboard data
    };
  }

  componentDidMount() {
    // Fetch dashboard data from your API
    axios.get('http://127.0.0.1:5000/admin/dashboard')
      .then((response) => {
        const data = response.data;
        this.setState({
          totalUsers: data.totalUsers,
          totalCars: data.totalCars,
          totalPurchases: data.totalPurchases,
          // Update state properties based on the actual data returned
        });
      })
      .catch((error) => {
        console.error(error);
      });
  }

  render() {
    return (
      <div className="admin-dashboard">
        <h1>Admin Dashboard</h1>
        <div className="dashboard-stats">
          <div className="stat">
            <h3>Total Users</h3>
            <p>{this.state.totalUsers}</p>
          </div>
          <div className="stat">
            <h3>Total Cars</h3>
            <p>{this.state.totalCars}</p>
          </div>
          <div className="stat">
            <h3>Total Purchases</h3>
            <p>{this.state.totalPurchases}</p>
          </div>
          {/* Add more statistics here */}
        </div>
        {/* Add other dashboard components or widgets here */}
      </div>
    );
  }
}

export default AdminDashboard;
