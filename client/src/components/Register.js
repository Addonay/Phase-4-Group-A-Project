// import React, { Component } from 'react';
// import {Link} from "react-router-dom"
// import axios from 'axios';

// class Register extends Component {
//   constructor() {
//     super();
//     this.state = {
//       username: '',
//       email: '',
//       password: '',
//       confirmPassword: '',
//       errors: {},
//       successMessage: '',
//     };
//   }

//   handleChange = (e) => {
//     this.setState({ [e.target.name]: e.target.value });
//   }

//   handleSubmit = async (e) => {
//     e.preventDefault();
//     const { username, email, password, confirmPassword } = this.state;

//     try {
//       const response = await axios.post('http://127.0.0.1:5000/register', {
//         username,
//         email,
//         password,
//         confirmPassword,
//       });

//       // Registration successful
//       if (response.status === 200) {
//         this.setState({
//           successMessage: 'Registration successful!',
//           username: '',
//           email: '',
//           password: '',
//           confirmPassword: '',
//           errors: {},
//         });
//         window.location.href = '/';
//       }
//     } catch (error) {
//       if (error.response) {
//         // Registration failed with validation errors
//         this.setState({ errors: error.response.data.errors });
//         this.setState({
//           successMessage: 'Registration successful!',
//           username: '',
//           email: '',
//           password: '',
//           confirmPassword: '',
//         });
//         // Clear errors after a brief delay
//         setTimeout(() => {
//           this.setState({ errors: {} });
//         }, 1500); 
//       } else {
//         // Registration failed due to a network error
//         console.error('Error:', error.message);
//       }
//     }
//   }

//   render() {
//     const { username, email, password, confirmPassword, errors, successMessage } = this.state;

//     return (
//       <div className="max-w-md mx-auto mt-8 p-4 border rounded-lg shadow-lg">
//         <h2 className="text-2xl mb-4">Registration</h2>
//         <form onSubmit={this.handleSubmit}>
//           <div className="mb-4">
//             <label htmlFor="username" className="block mb-2">Username:</label>
//             <input
//               type="text"
//               id="username"
//               name="username"
//               value={username}
//               onChange={this.handleChange}
//               className="w-full p-2 border rounded-lg"
//             />
//           </div>
//           <div className="mb-4">
//             <label htmlFor="email" className="block mb-2">Email:</label>
//             <input
//               type="email"
//               id="email"
//               name="email"
//               value={email}
//               onChange={this.handleChange}
//               className="w-full p-2 border rounded-lg"
//             />
//           </div>
//           <div className="mb-4">
//             <label htmlFor="password" className="block mb-2">Password:</label>
//             <input
//               type="password"
//               id="password"
//               name="password"
//               value={password}
//               onChange={this.handleChange}
//               className="w-full p-2 border rounded-lg"
//             />
//           </div>
//           <div className="mb-4">
//             <label htmlFor="confirmPassword" className="block mb-2">Confirm Password:</label>
//             <input
//               type="password"
//               id="confirmPassword"
//               name="confirmPassword"
//               value={confirmPassword}
//               onChange={this.handleChange}
//               className="w-full p-2 border rounded-lg"
//             />
//           </div>
//           <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600">
//             Register
//           </button>
//         </form>
//         <p className="mt-4 text-center">
//            Already have an account?{' '}
//            <Link to="/login" className="text-blue-500 hover:underline">
//              Login here
//            </Link>
//         </p>
//         {Object.keys(errors).length > 0 && (
//           <div className="mt-4 text-red-500">
//             {Object.values(errors).map((error, index) => (
//               <p key={index}>{error}</p>
//             ))}
//           </div>
//         )}
//         {successMessage && (
//           <p className="mt-4 text-green-500">{successMessage}</p>
//         )}
//       </div>
//     );
//   }
// }

// export default Register;

import React, { useContext, useState } from 'react';
import { AuthContext } from '../contexts/AuthContext';

export default function Register() {
  const { register } = useContext(AuthContext);

  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [profile_image, setProfileImage] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(username + '  ' + password);
    register(username, email, password, profile_image);
  };

  return (
    <div className="p-4 container mt-3">
      <div className="row">
        <div className="col-md-6 rounded shadow bg-light">
          <form onSubmit={handleSubmit} className="mt-2">
            <div className="mb-3">
              <label htmlFor="exampleInputEmail1" className="form-label">
                Username
              </label>
              <input
                type="name"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="form-control"
                id="exampleInputName"
                aria-describedby="emailHelp"
              />
            </div>

            <div className="mb-3">
              <label htmlFor="exampleInputEmail1" className="form-label">
                Email address
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="form-control"
                id="exampleInputEmail1"
                aria-describedby="emailHelp"
              />
              <div id="emailHelp" className="form-text">
                We'll never share your email with anyone else.
              </div>
            </div>

            <div className="mb-3">
              <label htmlFor="exampleInputPassword1" className="form-label">
                Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="form-control"
                id="exampleInputPassword1"
              />
            </div>

            <div className="mb-3">
              <label htmlFor="exampleInputEmail1" className="form-label">
                Add image
              </label>
              <input
                type="name"
                value={profile_image}
                onChange={(e) => setProfileImage(e.target.value)}
                className="form-control"
                id="exampleInputName"
                aria-describedby="emailHelp"
              />
            </div>

            <div className="mb-3 form-check">
              <input
                type="checkbox"
                className="form-check-input"
                id="exampleCheck1"
              />
              <label className="form-check-label" htmlFor="exampleCheck1">
                Check me out
              </label>
            </div>

            <button
              type="submit"
              className="btn btn-primary w-50 rounded-pill"
            >
              Submit
            </button>

            <div className="form-text p-2">
              Have an account? <a href="/Login">Login</a>
            </div>
          </form>
        </div>

        <div className="col-md-5 mx-3 mt-3">
          <div className="mx-2">
            <h1 className="text-center text-danger">
              𝐅𝐞𝐞𝐥 𝐟𝐫𝐞𝐞 𝐭𝐨 <span className="text-primary">𝐫𝐞𝐠𝐢𝐬𝐭𝐞𝐫</span>
            </h1>
            <hr />
            <p>
              𝖶𝖾 𝗐𝖺𝗋𝗆𝗅𝗒 𝗐𝖾𝗅𝖼𝗈𝗆𝖾 𝗒𝗈𝗎 𝗍𝗈 𝗃𝗈𝗂𝗇 𝗎𝗌! 𝖯𝗅𝖾𝖺𝗌𝖾 𝗍𝖺𝗄𝖾 𝖺
              𝗆𝗈𝗆𝖾𝗇𝗍 𝗍𝗈 𝖿𝗂𝗅𝗅 𝗈𝗎𝗍 𝗍𝗁𝖾 𝗋𝖾𝗀𝗂𝗌𝗍𝗋𝖺𝗍𝗂𝗈𝗇 𝖿𝗈𝗋𝗆 𝖺𝗇𝖽
              𝖻𝖾𝖼𝗈𝗆𝖾 𝖺 𝗉𝖺𝗋𝖱𝗍 𝗈𝖿 𝗈𝗎𝗋 𝖼𝗈𝗆𝗆𝗎𝗇𝗂𝗍𝗒. 𝖶𝖾 𝖼𝖺𝗇'𝗍 𝗐𝖺𝗂𝗍 𝗍𝗈
              𝗁𝖺𝗏𝖾 𝗒𝗈𝗎𝗋 𝗈𝗇 𝖻𝗈𝖺𝗋𝖽 𝖺𝗇𝖽 𝗌𝗁𝖺𝗋𝖾 𝖾𝗑𝖼𝗂𝗍𝗂𝗇𝖼𝖾𝗌 𝗍𝗈𝗀𝖾𝗍𝗁𝖾𝗋!
            </p>
          </div>

          <img
            src="https://media.istockphoto.com/id/1464992670/vector/password-security-vector-designg.jpg?s=612x612&w=0&k=20&c=tcYgjQVJXdwElGhL4TLZpCS90X9pfOgXAeVK9eIVp5Q="
            alt=".."
            className="w-100"
          ></img>
        </div>
      </div>
    </div>
  );
}
