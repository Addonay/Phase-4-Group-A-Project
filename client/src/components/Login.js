import React, { useState } from 'react';
import axios from 'axios';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import Swal from 'sweetalert2';

function Login() {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });

  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleTogglePasswordVisibility = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://127.0.0.1:5000/login', formData);

      if (response.status === 401) {
        const data = response.data;
        Swal.fire({
          icon: 'error',
          title: 'Unauthorized',
          text: data.error,
        });
      } else if (response.status === 200) {
        const data = response.data;
        Swal.fire({
          icon: 'success',
          title: 'Login Successful',
          text: `Welcome, ${data.username}!`,
        });
        // Redirect to the appropriate dashboard based on user_role or perform other actions
      }
    } catch (error) {
      console.error('Error:', error);
      Swal.fire({
        icon: 'error',
        title: 'Login Error',
        text: 'An error occurred while logging in. Please try again later.',
      });
    }
  };
  // Add Axios request interceptor to log requests
  axios.interceptors.request.use((config) => {
    console.log('Request:', config);
    return config;
  });

  // Add Axios response interceptor to log responses
  axios.interceptors.response.use((response) => {
    console.log('Response:', response);
    return response;
  }, (error) => {
    console.error('Error:', error);
    return Promise.reject(error);
  });
  return (
    <Container>
      <Grid container justifyContent="center" alignItems="center" style={{ height: '100vh' }}>
        <Grid item xs={12} sm={6}>
          <form onSubmit={handleSubmit}>
            <TextField
              label="Username"
              name="username"
              value={formData.username}
              onChange={handleChange}
              required
              fullWidth
              margin="normal"
            />
            <TextField
              label="Password"
              name="password"
              type={showPassword ? 'text' : 'password'}
              value={formData.password}
              onChange={handleChange}
              required
              fullWidth
              margin="normal"
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton edge="end" onClick={handleTogglePasswordVisibility}>
                      {showPassword ? <VisibilityIcon /> : <VisibilityOffIcon />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
            <Button type="submit" variant="contained" color="primary" fullWidth>
              Log In
            </Button>
          </form>
        </Grid>
      </Grid>
    </Container>
  );
}

export default Login;
