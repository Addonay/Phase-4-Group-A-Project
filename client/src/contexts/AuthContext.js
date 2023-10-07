import React, { createContext, useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';
import axios from "axios";

export const AuthContext = createContext();

export default function AuthProvider({ children }) {
  const nav = useNavigate();
  const [current_user, setCurrentUser] = useState(null);
  const [onChange, setOnChange] = useState(true);

  // Constants for success and error messages
  const SUCCESS_MESSAGE = 'Success';
  const ERROR_MESSAGE = 'Error';

  // Login
  const login = async (username, password) => {
    try {
      const response = await axios.post('http://127.0.0.1:5000/login', {
        username,
        password,
      });
  
      const data = response.data;
  
      if (response.status === 200) {
        setCurrentUser({ id: data.id, email: data.email, user_role: data.user_role });
        nav(`/`);
        Swal.fire(SUCCESS_MESSAGE, 'Login successful', 'success');
        setOnChange(!onChange);
      } else {
        Swal.fire(ERROR_MESSAGE, data.error || 'Login failed', 'error');
      }
    } catch (error) {
      console.error('Error:', error.message);
      Swal.fire(ERROR_MESSAGE, 'Something went wrong', 'error');
    }
  };

  // Logout
  const logout = async () => {
    try {
      const response = await fetch('http://127.0.0.1:5000/logout', {
        method: 'POST',
      });

      if (response.ok) {
        setCurrentUser(null);
        // Clear any local storage or session storage related to authentication
        sessionStorage.removeItem('token'); // Example: Remove a token from session storage
        nav('/login');
        Swal.fire(SUCCESS_MESSAGE, 'Logged out successfully', 'success');
        setOnChange(!onChange);
      } else {
        Swal.fire(ERROR_MESSAGE, 'Logout failed', 'error');
      }
    } catch (error) {
      console.error('Error:', error.message);
      Swal.fire(ERROR_MESSAGE, 'Something went wrong', 'error');
    }
  };

  // Register
  const register = async (username, email, password, profile_image) => {
    try {
      const response = await fetch('http://127.0.0.1:5000/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, email, password, profile_image }),
      });

      const data = await response.json();

      if (response.ok) {
        setCurrentUser({ id: data.id, email: data.email, user_role: data.user_role });
        // Redirect to the user-specific page if needed, e.g., `/username/dashboard`
        nav(`/`);
        Swal.fire(SUCCESS_MESSAGE, 'Registration successful', 'success');
        setOnChange(!onChange);
      } else {
        Swal.fire(ERROR_MESSAGE, data.error || 'Registration failed', 'error');
      }
    } catch (error) {
      console.error('Error:', error.message);
      Swal.fire(ERROR_MESSAGE, 'Something went wrong', 'error');
    }
  };
 

  useEffect(() => {
    // Check if the user is already logged in
    fetch('http://127.0.0.1:5000/user', {
      method: 'GET',
      credentials: 'include', // Include credentials for session-based authentication
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.id) {
          setCurrentUser({ id: data.id, email: data.email, user_role: data.user_role }); // Include user role
        }
      });
  }, [onChange]);

  const contextData = {
    login,
    register,
    logout,
    current_user,
  };

  return <AuthContext.Provider value={contextData}>{children}</AuthContext.Provider>;
}
