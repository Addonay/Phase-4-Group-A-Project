// import React from 'react';
// import { useFormik } from 'formik';
// import * as Yup from 'yup';
// import TextField from '@mui/material/TextField';
// import Button from '@mui/material/Button';
// import Container from '@mui/material/Container';
// import Grid from '@mui/material/Grid';
// import IconButton from '@mui/material/IconButton';
// import InputAdornment from '@mui/material/InputAdornment';
// import VisibilityIcon from '@mui/icons-material/Visibility';
// import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
// import Swal from 'sweetalert2';
// import { useNavigate } from 'react-router-dom';

// function Login() {
//   const navigate = useNavigate();

//   // Define validation schema using Yup
//   const validationSchema = Yup.object({
//     username: Yup.string().required('Username is required'),
//     password: Yup.string().required('Password is required'),
//   });

//   // Initialize Formik
//   const formik = useFormik({
//     initialValues: {
//       username: '',
//       password: '',
//       showPassword: false,
//     },
//     validationSchema,
//     onSubmit: async (values) => {
//       try {
//         // Send a POST request to your authentication API
//         const response = await fetch('http://127.0.0.1:5000/login', {
//           method: 'POST',
//           headers: {
//             'Content-Type': 'application/json',
//           },
//           body: JSON.stringify({
//             username: values.username,
//             password: values.password,
//           }),
//         });
    
//         if (response.ok) {
//           // If the login is successful (status code 200), you can navigate to the dashboard
//           Swal.fire('Success', 'Login successful', 'success');
//           navigate('/dashboard'); // Replace with your desired route
//         } else {
//           // Handle authentication errors here
//           const data = await response.json();
//           Swal.fire('Error', data.error || 'Login failed', 'error');
//         }
//       } catch (error) {
//         console.error('Error:', error.message);
//         Swal.fire('Error', 'Something went wrong', 'error');
//       }
//     },
    
//   });

//   return (
//     <Container component="main" maxWidth="xs">
//       <div>
//         <form onSubmit={formik.handleSubmit}>
//           <Grid container spacing={2}>
//             <Grid item xs={12}>
//               <TextField
//                 fullWidth
//                 label="Username"
//                 name="username"
//                 variant="outlined"
//                 value={formik.values.username}
//                 onChange={formik.handleChange}
//                 onBlur={formik.handleBlur}
//                 error={formik.touched.username && Boolean(formik.errors.username)}
//                 helperText={formik.touched.username && formik.errors.username}
//                 required
//               />
//             </Grid>
//             <Grid item xs={12}>
//               <TextField
//                 fullWidth
//                 label="Password"
//                 name="password"
//                 type={formik.values.showPassword ? 'text' : 'password'}
//                 variant="outlined"
//                 value={formik.values.password}
//                 onChange={formik.handleChange}
//                 onBlur={formik.handleBlur}
//                 error={formik.touched.password && Boolean(formik.errors.password)}
//                 helperText={formik.touched.password && formik.errors.password}
//                 required
//                 InputProps={{
//                   endAdornment: (
//                     <InputAdornment position="end">
//                       <IconButton
//                         onClick={() => formik.setFieldValue('showPassword', !formik.values.showPassword)}
//                         edge="end"
//                       >
//                         {formik.values.showPassword ? <VisibilityIcon /> : <VisibilityOffIcon />}
//                       </IconButton>
//                     </InputAdornment>
//                   ),
//                 }}
//               />
//             </Grid>
//           </Grid>
//           <Button
//             type="submit"
//             fullWidth
//             variant="contained"
//             color="primary"
//             sx={{ mt: 3, mb: 2 }}
//           >
//             Log In
//           </Button>
//         </form>
//       </div>
//     </Container>
//   );
// }

// export default Login;

import React, { useState } from 'react';
import axios from 'axios';

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [remember, setRemember] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://127.0.0.1:5000/login', {
        username,
        password,
        remember,
      });

      // Handle the response, e.g., redirect or show a success message
      console.log('Login successful', response.data);
    } catch (error) {
      // Handle login error, e.g., display an error message
      console.error('Login failed', error);
    }
  };

  return (
    <div className="container">
      <form className="form-signin" onSubmit={handleLogin}>
        <h2 className="form-signin-heading">Please sign in</h2>
        <input
          type="text"
          className="form-control"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <input
          type="password"
          className="form-control"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <div className="checkbox">
          <label>
            <input
              type="checkbox"
              value={remember}
              onChange={() => setRemember(!remember)}
            />
            Remember me
          </label>
        </div>
        <button
          className="btn btn-lg btn-primary btn-block"
          type="submit"
        >
          Sign in
        </button>
      </form>
    </div>
  );
}

export default Login;
