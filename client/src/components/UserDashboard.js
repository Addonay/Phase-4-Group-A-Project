import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
  Container,
  Typography,
  CircularProgress,
  Paper,
  Grid,
  Card,
  CardContent,
  Button,
} from '@mui/material';
import { Link } from 'react-router-dom'; // Import Link for navigation

const UserProfile = () => {
  const [profileData, setProfileData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:5000/profile'); // Replace with your API endpoint
        const data = response.data;

        setProfileData(data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching user profile:', error);
        setLoading(false);
      }
    };

    fetchUserProfile();
  }, []);

  return (
    <Container
      maxWidth="xl" // Set the container to extra-large width
      style={{ margin: '0 2cm', height: '100vh' }} // Apply margin on both sides and full height
    >
      <Grid container justifyContent="center" alignItems="center" style={{ height: '100%' }}>
        <Grid item xs={12} sm={8} md={6} lg={4}>
          <Card elevation={3}>
            <CardContent>
              {loading ? (
                <CircularProgress />
              ) : profileData ? (
                <div>
                  <Typography variant="h5">User Profile</Typography>
                  <Typography><strong>Username:</strong> {profileData.username}</Typography>
                  <Typography><strong>Email:</strong> {profileData.email}</Typography>
                  <Typography><strong>Profile Image:</strong> <img src={profileData.profile_image} alt="Profile" width="100" /></Typography>
                  <Typography><strong>User Role:</strong> {profileData.user_role}</Typography>
                  <Typography><strong>Created At:</strong> {profileData.created_at}</Typography>

                  {/* Add links to View Cart and Purchase History */}
                  <Button component={Link} to="/cart" variant="outlined" color="primary" style={{ marginTop: '16px' }}>
                    View Cart
                  </Button>
                  <Button component={Link} to="/purchase-history" variant="outlined" color="primary" style={{ marginTop: '16px' }}>
                    Purchase History
                  </Button>
                </div>
              ) : (
                <Typography variant="body1">User not found</Typography>
              )}
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
};

export default UserProfile;
