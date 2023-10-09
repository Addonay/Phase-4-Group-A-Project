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
import Checkbox from '@mui/material/Checkbox'; // Import Checkbox
import { useHistory } from "react-router-dom";
import Swal from 'sweetalert2';

const Login = () => {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });

  const [rememberMe, setRememberMe] = useState(false); // State for "Remember me" checkbox

  const [showPassword, setShowPassword] = useState(false);

  const { username, password } = formData;
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

  const handleRememberMe = () => {
    setRememberMe(!rememberMe);
  };

  const handleLoginSuccess = (access_token) => {
    localStorage.setItem('access_token', access_token);
    // Redirect based on the username
    if (username === 'admin') {
      history.push('/admindashboard');
    } else {
      history.push('/userprofile');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://127.0.0.1:5000/auth/login', {
        username,
        password,
      });

      const { access_token } = response.data;
      handleLoginSuccess(access_token);
    } catch (error) {
      console.error('Login failed:', error);
      Swal.fire({
        icon: 'error',
        title: 'Login Failed',
        text: 'Invalid username or password',
      });
    }
  };

  return (
    <Container>
      <Grid container justifyContent="center" alignItems="center" style={{ height: '100vh' }}>
        <Grid item xs={12} sm={8} md={6} lg={4}>
          <form onSubmit={handleSubmit}>
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
            <Checkbox
              checked={rememberMe}
              onChange={handleRememberMe}
              color="primary"
            />
            <label>Remember me</label>
            <Button type="submit" variant="contained" color="primary" fullWidth>
              Login
            </Button>
          </form>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Login;
