import React, { Component } from 'react';
import axios from 'axios';
import { Link } from "react-router-dom"

class Login extends Component {
  constructor() {
    super();
    this.state = {
      username: '',
      password: '',
      errors: {},
      successMessage: '',
    };
  }

  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  }

  handleSubmit = async (e) => {
    e.preventDefault();
    const { username, password } = this.state;

    try {
      const response = await axios.post('http://127.0.0.1:5000/login', {
        username,
        password,
      });

      // Login successful
      if (response.status === 200) {
        this.setState({
          username: '',
          password: '',
          errors: {},
        });
        window.location.href = '/';
      }
    } catch (error) {
      if (error.response) {
        // Login failed with validation errors or unauthorized access
        this.setState({ errors: error.response.data });

      // Clear input fields immediately
      this.setState({
        username: '',
        password: '',
      });

        // Clear errors after a brief delay 
        setTimeout(() => {
          this.setState({ errors: {} });
        }, 1500)
      } else {
        // Login failed due to a network error
        console.error('Error:', error.message);
      }
    }
  }

  render() {
    const { username, password, errors, successMessage } = this.state;

    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="max-w-md w-full p-4 border rounded-lg shadow-lg">
          <h2 className="text-2xl mb-4">Login</h2>
          <form onSubmit={this.handleSubmit}>
            <div className="mb-4">
              <label htmlFor="username" className="block mb-2">Username:</label>
              <input
                type="text"
                id="username"
                name="username"
                value={username}
                onChange={this.handleChange}
                className="w-full p-2 border rounded-lg"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="password" className="block mb-2">Password:</label>
              <input
                type="password"
                id="password"
                name="password"
                value={password}
                onChange={this.handleChange}
                className="w-full p-2 border rounded-lg"
              />
            </div>
            <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600">
              Login
            </button>
          </form>
          <p className="mt-4 text-center">
            Don't have an account?{' '}
            <Link to="/register" className="text-blue-500 hover:underline">
              Register here
            </Link>
          </p>
          {Object.keys(errors).length > 0 && (
            <div className="mt-4 text-red-500">
              {Object.values(errors).map((error, index) => (
                <p key={index}>{error}</p>
              ))}
            </div>
          )}
          {successMessage && (
            <p className="mt-4 text-green-500">{successMessage}</p>
          )}
        </div>
      </div>
    );
  }
}

export default Login;
