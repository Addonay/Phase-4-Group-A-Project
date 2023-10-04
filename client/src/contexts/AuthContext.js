import React, { createContext, useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';

export const AuthContext = createContext();

export default function AuthProvider({ children }) {
  const nav = useNavigate();
  const [current_user, setCurrentUser] = useState(null);
  const [onChange, setOnChange] = useState(true);

  // Login
  const login = async (username, password) => {
    try {
      const response = await fetch('http://127.0.0.1:5000/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();

      if (response.ok) {
        setCurrentUser({ id: data.id, email: data.email });
        nav('/');
        Swal.fire('Success', 'Login successful', 'success');
        setOnChange(!onChange);
      } else {
        Swal.fire('Error', data.error || 'Login failed', 'error');
      }
    } catch (error) {
      console.error('Error:', error.message);
      Swal.fire('Error', 'Something went wrong', 'error');
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
        nav('/login');
        Swal.fire('Success', 'Logged out successfully', 'success');
        setOnChange(!onChange);
      } else {
        Swal.fire('Error', 'Logout failed', 'error');
      }
    } catch (error) {
      console.error('Error:', error.message);
      Swal.fire('Error', 'Something went wrong', 'error');
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
        nav('/login');
        Swal.fire('Success', 'Registration successful', 'success');
        setOnChange(!onChange);
      } else {
        Swal.fire('Error', data.error || 'Registration failed', 'error');
      }
    } catch (error) {
      console.error('Error:', error.message);
      Swal.fire('Error', 'Something went wrong', 'error');
    }
  };

  useEffect(() => {
    fetch('/login')  
      .then((res) => res.json())
      .then((data) => {
        if (data.id) {
          setCurrentUser({ id: data.id, email: data.email });
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
