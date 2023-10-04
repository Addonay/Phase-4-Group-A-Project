// import React, { Component } from 'react';
// import axios from 'axios';
// import { Link } from 'react-router-dom';

// class Login extends Component {
//   constructor() {
//     super();
//     this.state = {
//       username: '',
//       password: '',
//       errors: {},
//       successMessage: '',
//     };
//   }

//   handleChange = (e) => {
//     this.setState({ [e.target.name]: e.target.value });
//   }

//   handleSubmit = async (e) => {
//     e.preventDefault();
//     const { username, password } = this.state;

//     try {
//       const response = await axios.post('http://127.0.0.1:5000/login', {
//         username,
//         password,
//       });

//       // Login successful
//       if (response.status === 200) {
//         this.setState({
//           username: '',
//           password: '',
//           errors: {},
//           successMessage: 'Login successful', // Set success message
//         });

//         // Redirect or update UI as needed
//       }
//     } catch (error) {
//       if (error.response) {
//         // Login failed with validation errors or unauthorized access
//         this.setState({ errors: error.response.data });

//         // Clear input fields immediately
//         this.setState({
//           username: '',
//           password: '',
//         });

//         // Clear errors after a brief delay
//         setTimeout(() => {
//           this.setState({ errors: {} });
//         }, 1500);
//       } else {
//         // Login failed due to a network error
//         console.error('Error:', error.message);
//       }
//     }
//   }

//   render() {
//     const { username, password, errors, successMessage } = this.state;

//     return (
//       <div className="min-h-screen flex items-center justify-center">
//         <div className="max-w-md w-full p-4 border rounded-lg shadow-lg">
//           <h2 className="text-2xl mb-4">Login</h2>
//           <form onSubmit={this.handleSubmit}>
//             <div className="mb-4">
//               <label htmlFor="username" className="block mb-2">Username:</label>
//               <input
//                 type="text"
//                 id="username"
//                 name="username"
//                 value={username}
//                 onChange={this.handleChange}
//                 className="w-full p-2 border rounded-lg"
//               />
//             </div>
//             <div className="mb-4">
//               <label htmlFor="password" className="block mb-2">Password:</label>
//               <input
//                 type="password"
//                 id="password"
//                 name="password"
//                 value={password}
//                 onChange={this.handleChange}
//                 className="w-full p-2 border rounded-lg"
//               />
//             </div>
//             <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600">
//               Login
//             </button>
//           </form>
//           <p className="mt-4 text-center">
//             Don't have an account?{' '}
//             <Link to="/register" className="text-blue-500 hover:underline">
//               Register here
//             </Link>
//           </p>
//           {Object.keys(errors).length > 0 && (
//             <div className="mt-4 text-red-500">
//               {Object.values(errors).map((error, index) => (
//                 <p key={index}>{error}</p>
//               ))}
//             </div>
//           )}
//           {successMessage && (
//             <p className="mt-4 text-green-500">{successMessage}</p>
//           )}
//         </div>
//       </div>
//     );
//   }
// }

// export default Login;

import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthContext';

export default function Login() {
  const { login } = useContext(AuthContext);

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(username + '  ' + password);

    login(username, password);
  };

  return (
    <div>
      <div className="container mt-5">
        <div className="row">
          <div className="col-md-6 bg-light rounded shadow d-flex justify-content-center mb-5">
            <form onSubmit={handleSubmit} className="w-100 mt-2">
              <div className="mb-3">
                <label htmlFor="exampleInputEmail1" className="form-label">
                  Username
                </label>
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="form-control"
                  id="exampleInputName"
                  aria-describedby="emailHelp"
                />
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

              <div className="d-flex justify-content-center">
                <button
                  type="submit"
                  className="btn btn-primary rounded-pill w-50"
                >
                  Submit
                </button>
              </div>
              <div className="form-text p-3 d-flex justify-content-center">
                Don't have an account? <Link to="/Register">Register</Link>
              </div>

              <div className="d-flex justify-content-center mb-2 mt-2">
                <img
                  height="120"
                  width="120"
                  className="rounded-circle shadow"
                  src="https://media.istockphoto.com/id/1409980655/vector/access-denied-notification.jpg?s=612x612&w=0&k=20&c=5v2fB88uIATI_rW7z96hbe9QrqYcQYSkwb4gc4X0zSA="
                  alt="..."
                ></img>
              </div>
            </form>
          </div>

          <div className="col-md-5 mb-3 mx-4 mt-3">
            <div className="">
              <h1 className="text-center text-danger">
                𝐋𝐎𝐆<span className="text-primary">𝐈𝐍</span>
              </h1>
              <hr />
              <p className="fs-6 text">
                𝖶𝖾 𝖺𝗋𝖾 𝖽𝖾𝗅𝗂𝗀𝗁𝗍𝖾𝖽 𝗍𝗈 𝗁𝖺𝗏𝖾 𝗒𝗈𝗎 𝖻𝖺𝖼𝗄! 𝖯𝗅𝖾𝖺𝗌𝖾 𝗅𝗈𝗀 𝗂𝗇
                𝗍𝗈 𝗒𝗈𝗎𝗋 𝖺𝖼𝖼𝗈𝗎𝗇𝗍 𝗍𝗈 𝖼𝗈𝗇𝗍𝗂𝗇𝗎𝖾 𝗒𝗈𝗎𝗋 𝗃𝗈𝗎𝗋𝗇𝖾𝗒 𝗐𝗂𝗍𝗁
                𝗎𝗌. 𝖤𝗇𝗍𝖾𝗋 𝗒𝗈𝗎𝗋 𝖼𝗋𝖾𝖽𝖾𝗇𝗍𝗂𝖺𝗅𝗌 𝗂𝗇 𝗍𝗁𝖾 𝗅𝗈𝗀𝗂𝗇 𝖿𝗈𝗋𝗆 𝖺𝗇𝖽
                𝗀𝖾𝗍 𝗋𝖾𝖺𝖉𝗒 𝗍𝗈 𝖽𝗂𝗏𝖾 𝖻𝖺𝖼𝗄 𝗂𝗇𝗍𝗈 𝗈𝗎𝗋 𝖺𝗆𝖺𝗓𝗂𝗇𝗀 𝗐𝖾𝖻𝗌𝗂𝗍𝖾.
              </p>
            </div>

            <img
              src="https://media.istockphoto.com/id/1414313740/vector/hacker-fishing-concept.jpg?s=612x612&w=0&k=20&c=1JOnGi1PFbsn6tuh3gdus0USAPNLlHgIv2TwfKofjEQ="
              className="w-75 mx-5 md-2 m"
              alt="..."
            ></img>
          </div>
        </div>
      </div>
    </div>
  );
}





