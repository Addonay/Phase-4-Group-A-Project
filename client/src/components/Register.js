import React, { Component } from 'react';
import {Link} from "react-router-dom"
import axios from 'axios';

class Register extends Component {
  constructor() {
    super();
    this.state = {
      username: '',
      email: '',
      password: '',
      confirmPassword: '',
      errors: {},
      successMessage: '',
    };
  }

  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  }

  handleSubmit = async (e) => {
    e.preventDefault();
    const { username, email, password, confirmPassword } = this.state;

    try {
      const response = await axios.post('http://127.0.0.1:5000/register', {
        username,
        email,
        password,
        confirmPassword,
      });

      // Registration successful
      if (response.status === 200) {
        this.setState({
          successMessage: 'Registration successful!',
          username: '',
          email: '',
          password: '',
          confirmPassword: '',
          errors: {},
        });
        window.location.href = '/';
      }
    } catch (error) {
      if (error.response) {
        // Registration failed with validation errors
        this.setState({ errors: error.response.data.errors });
        this.setState({
          successMessage: 'Registration successful!',
          username: '',
          email: '',
          password: '',
          confirmPassword: '',
        });
        // Clear errors after a brief delay
        setTimeout(() => {
          this.setState({ errors: {} });
        }, 1500); 
      } else {
        // Registration failed due to a network error
        console.error('Error:', error.message);
      }
    }
  }

  render() {
    const { username, email, password, confirmPassword, errors, successMessage } = this.state;

    return (
      <div className="max-w-md mx-auto mt-8 p-4 border rounded-lg shadow-lg">
        <h2 className="text-2xl mb-4">Registration</h2>
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
            <label htmlFor="email" className="block mb-2">Email:</label>
            <input
              type="email"
              id="email"
              name="email"
              value={email}
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
          <div className="mb-4">
            <label htmlFor="confirmPassword" className="block mb-2">Confirm Password:</label>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              value={confirmPassword}
              onChange={this.handleChange}
              className="w-full p-2 border rounded-lg"
            />
          </div>
          <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600">
            Register
          </button>
        </form>
        <p className="mt-4 text-center">
           Already have an account?{' '}
           <Link to="/login" className="text-blue-500 hover:underline">
             Login here
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
    );
  }
}

export default Register;