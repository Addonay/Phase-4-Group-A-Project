import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // Import useNavigate from React Router

const AdminUserManagement = () => {
  const [users, setUsers] = useState([]);
  const navigate = useNavigate(); // Initialize the history object

  useEffect(() => {
    // Fetch user data from the server when the component mounts
    axios.get('http://127.0.0.1:5000/admin/users')
      .then(response => {
        setUsers(response.data.users);
      })
      .catch(error => {
        console.error('Error fetching user data:', error);
      });
  }, []);

  const handleEditUser = (userId) => {
    // Navigate to the edit page for the user with the given userId
    navigate(`http://127.0.0.1:5000/admin/users/edit/${userId}`);
  };

  const handleDeleteUser = (userId) => {
    // Implement the logic to delete the user with the given userId
    axios.delete(`http://127.0.0.1:5000/admin/users/delete/${userId}`)
      .then(response => {
        // Handle successful deletion by removing the user from the state
        setUsers(users.filter(user => user.user_id !== userId));
        console.log(`User with ID ${userId} deleted successfully.`);
      })
      .catch(error => {
        // Handle error if the deletion fails
        console.error(`Error deleting user with ID ${userId}:`, error);
      });
  };

  return (
    <div>
      <h1>User Management</h1>
      <table>
        <thead>
          <tr>
            <th>User ID</th>
            <th>Username</th>
            <th>Email</th>
            <th>Created At</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map(user => (
            <tr key={user.user_id}>
              <td>{user.user_id}</td>
              <td>{user.username}</td>
              <td>{user.email}</td>
              <td>{user.created_at}</td>
              <td>
              
              <td>
                <button onClick={() => handleEditUser(user.user_id)}>Edit</button>
                <button onClick={() => handleDeleteUser(user.user_id)}>Delete</button>
              </td>

              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default AdminUserManagement;
