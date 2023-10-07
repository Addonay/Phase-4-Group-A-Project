import React, { useContext, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthContext';
import { useDropzone } from 'react-dropzone';

export default function UserProfile() {
  const { current_user } = useContext(AuthContext);

  const handleFileUpload = useCallback((acceptedFiles) => {
    // Handle the uploaded file here
    console.log('Uploaded file:', acceptedFiles[0]);

    // You can send the file to your backend for storage and update the user's profile image
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop: handleFileUpload, // Call the function to handle file uploads
    accept: 'image/*', // Specify that only image files are allowed
  });

  return (
    <div className="max-w-md mx-auto p-4 bg-white shadow-md rounded-lg">
      <h1 className="text-3xl font-semibold mb-4">User Profile</h1>

      <div className="mb-4">
        <div
          {...getRootProps()}
          className={`w-32 h-32 mx-auto bg-gray-200 rounded-full border-2 ${
            isDragActive ? 'border-blue-500' : 'border-gray-300'
          } flex items-center justify-center cursor-pointer`}
        >
          <input {...getInputProps()} />
          {isDragActive ? (
            <p className="text-blue-500">Drop your profile picture here</p>
          ) : (
            <p className="text-gray-500">Drag 'n' drop your profile picture here, or click to select one</p>
          )}
        </div>
      </div>

      <div className="mb-4">
        <p className="text-lg">
          <span className="font-semibold">Username:</span> {current_user.username}
        </p>
        <p className="text-lg">
          <span className="font-semibold">Email:</span> {current_user.email}
        </p>
        <p className="text-lg">
          <span className="font-semibold">Address:</span> {current_user.address}
        </p>
        {/* Add more user information here */}
      </div>

      {/* Cart and Purchase History Cards */}
      <div className="flex justify-center space-x-4">
        <Link to="/cart" className="flex items-center justify-center w-1/2 bg-blue-500 hover:bg-blue-600 text-white p-4 rounded-lg">
          <div className="flex-shrink-0">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16l-4-4m0 0l4-4m-4 4h18"></path>
            </svg>
          </div>
          <span className="ml-2">View Cart</span>
        </Link>

        <Link to="/purchase-history" className="flex items-center justify-center w-1/2 bg-green-500 hover:bg-green-600 text-white p-4 rounded-lg">
          <div className="flex-shrink-0">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
            </svg>
          </div>
          <span className="ml-2">Purchase History</span>
        </Link>
      </div>
    </div>
  );
}
