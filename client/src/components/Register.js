import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import { useNavigate, Link } from 'react-router-dom';
import Swal from 'sweetalert2';
import axios from 'axios';

function Register() {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
  });

  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();

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
      const response = await axios.post('http://127.0.0.1:5000/register', formData);

      if (response.status === 409) {
        const data = response.data;
        setError(data.error);
      } else if (response.status === 400) {
        const data = response.data;
        setError(data.errors);
      } else if (response.status === 200) {
        const data = response.data;
        setSuccess(`User with ID ${data.id} and email ${data.email} registered successfully!`);
        Swal.fire({
          icon: 'success',
          title: 'Registration Successful',
          text: `User with ID ${data.id} and email ${data.email} registered successfully!`,
        });
        navigate('/login');
      }
    } catch (error) {
      console.error('Error:', error);
      Swal.fire({
        icon: 'error',
        title: 'Registration Error',
        text: 'An error occurred while registering. Please try again later.',
      });
    }
  };

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
              label="Email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              required
              fullWidth
              margin="normal"
            />
            <TextField
              label="Password"
              name="password"
              type={showPassword ? 'text' : 'password'} // Toggle password visibility
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
}

export default Register;
