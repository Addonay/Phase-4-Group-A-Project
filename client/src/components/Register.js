import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import axios from 'axios';

function Register() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    profile_image: null,
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;

    if (name === 'profile_image') {
      setFormData({
        ...formData,
        [name]: files[0],
      });
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formDataToSend = new FormData();
    formDataToSend.append('username', formData.username);
    formDataToSend.append('email', formData.email);
    formDataToSend.append('password', formData.password);
    formDataToSend.append('profile_image', formData.profile_image);

    try {
      const response = await axios.post('http://127.0.0.1:5000/register', formDataToSend);

      if (response.status === 200) {
        Swal.fire('Success', 'Registration successful', 'success');
        navigate('/login');
      } else {
        Swal.fire('Error', response.data.error || 'Registration failed', 'error');
      }
    } catch (error) {
      console.error('Error:', error.message);
      Swal.fire('Error', 'Something went wrong', 'error');
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <div>
        <form onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Username"
                name="username"
                variant="outlined"
                value={formData.username}
                onChange={handleChange}
                required
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Email"
                name="email"
                type="email"
                variant="outlined"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Password"
                name="password"
                type="password"
                variant="outlined"
                value={formData.password}
                onChange={handleChange}
                required
              />
            </Grid>
            <Grid item xs={12}>
              <input
                type="file"
                accept="image/*"
                name="profile_image"
                onChange={handleChange}
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            sx={{ mt: 3, mb: 2 }}
          >
            Register
          </Button>
        </form>
      </div>
    </Container>
  );
}

export default Register;
