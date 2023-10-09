import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import { Link, useHistory } from 'react-router-dom';
import Swal from 'sweetalert2';
import axios from 'axios';

const Register = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
  });

  const [showPassword, setShowPassword] = useState(false);

  const { username, email, password } = formData;
  const history = useHistory();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleTogglePassword = () => {
    setShowPassword(!showPassword);
  };

  const handleRegistration = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://127.0.0.1:5000/auth/register', {
        username,
        email,
        password,
      });

      // Handle success, you can customize this based on your needs
      Swal.fire({
        icon: 'success',
        title: 'Registration Successful',
        text: 'Welcome Aboard!!',
      });

      // Redirect to the login page or any other desired page
      history.push('/');
    } catch (error) {
      console.error('Registration failed:', error);
      Swal.fire({
        icon: 'error',
        title: 'Registration Failed',
        text: 'An error occurred during registration. Please try again.',
      });
    }
  };

  return (
    <Container>
      <Grid container justifyContent="center" alignItems="center" style={{ height: '100vh' }}>
        <Grid item xs={12} sm={8} md={6} lg={4}>
          <form onSubmit={handleRegistration}>
            <TextField
              label="Username"
              name="username"
              value={username}
              onChange={handleChange}
              fullWidth
              margin="normal"
              required
            />
            <TextField
              label="Email"
              name="email"
              value={email}
              onChange={handleChange}
              fullWidth
              margin="normal"
              required
              type="email"
            />
            <TextField
              label="Password"
              name="password"
              value={password}
              onChange={handleChange}
              fullWidth
              margin="normal"
              required
              type={showPassword ? 'text' : 'password'}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton onClick={handleTogglePassword} edge="end">
                      {showPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
            <Button type="submit" variant="contained" color="primary" fullWidth>
              Register
            </Button>
          </form>
          <p>
            Already have an account? <Link to="/login">Login</Link>
          </p>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Register;
