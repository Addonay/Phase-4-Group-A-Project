import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
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
    <div className="bg-gray-100 min-h-screen flex items-center justify-center">
      <div className="bg-white rounded-lg shadow-md p-8 w-full max-w-md">
        <h1 className="text-center text-3xl font-semibold text-primary mb-6">
          Register
        </h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="username" className="block text-gray-700">
              Username
            </label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="form-input mt-1 block w-full rounded-md border-gray-300"
            />
          </div>

          <div className="mb-4">
            <label htmlFor="email" className="block text-gray-700">
              Email
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="form-input mt-1 block w-full rounded-md border-gray-300"
            />
          </div>

          <div className="mb-4">
            <label htmlFor="password" className="block text-gray-700">
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="form-input mt-1 block w-full rounded-md border-gray-300"
            />
          </div>

          <div className="mb-4">
            <label htmlFor="profile_image" className="block text-gray-700">
              Profile Image
            </label>
            <input
              type="text"
              id="profile_image"
              value={profile_image}
              onChange={(e) => setProfileImage(e.target.value)}
              className="form-input mt-1 block w-full rounded-md border-gray-300"
            />
          </div>

          <div className="mb-4">
            <label className="inline-flex items-center">
              <input type="checkbox" className="form-checkbox" />
              <span className="ml-2">Remember me</span>
            </label>
          </div>

          <div className="text-center">
            <button
              type="submit"
              className="bg-primary text-white rounded-md px-4 py-2 hover:bg-primary-dark transition duration-300"
            >
              Register
            </button>
          </div>
        </form>

        <div className="mt-4 text-center">
          Already have an account?{' '}
          <Link to="/Login" className="text-primary hover:underline">
            Login
          </Link>
        </div>
      </div>
    </div>
  );
}
