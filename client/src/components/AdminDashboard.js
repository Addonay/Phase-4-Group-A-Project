import React, { Component } from 'react';
import { Container, Typography, Paper, Grid } from '@mui/material';
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
      <Container maxWidth="lg" style={{ backgroundColor: '#f0f0f0', height: '100vh' }}>
        <Typography variant="h4" gutterBottom style={{ padding: '16px' }}>
          Admin Dashboard
        </Typography>
        <Paper elevation={3} style={{ padding: '16px', marginBottom: '16px' }}>
          <Typography variant="h6">Welcome, Admin!</Typography>
          <Typography variant="body1">You have access to admin features.</Typography>
        </Paper>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6} md={4}>
            <Paper elevation={3} style={{ padding: '16px' }}>
              <Typography variant="h6">Total Users</Typography>
              <Typography variant="body1">{this.state.totalUsers}</Typography>
            </Paper>
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <Paper elevation={3} style={{ padding: '16px' }}>
              <Typography variant="h6">Total Cars</Typography>
              <Typography variant="body1">{this.state.totalCars}</Typography>
            </Paper>
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <Paper elevation={3} style={{ padding: '16px' }}>
              <Typography variant="h6">Total Purchases</Typography>
              <Typography variant="body1">{this.state.totalPurchases}</Typography>
            </Paper>
          </Grid>
          {/* Add more statistics here */}
        </Grid>
        {/* Add other dashboard components or widgets here */}
      </Container>
    );
  }
}

export default AdminDashboard;
