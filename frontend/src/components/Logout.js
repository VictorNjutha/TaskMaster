import React from 'react';
import { Link } from 'react-router-dom';

function Logout() {
  const handleLogout = () => {
    const accessToken = localStorage.getItem('access_token');
    if (!accessToken) {
      // Handle case where access token is not available
      console.error('Access token not found');
      return;
    }

    fetch('https://task-master-backend-ng4l.onrender.com/logout', {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Failed to log out');
        }
        console.log('Logged out successfully');
        // Clear access token from local storage
        localStorage.removeItem('access_token');
        // Redirect user to login page or perform other actions
      })
      .catch(error => console.error('Error logging out:', error));
  };

  const handleDeleteAccount = () => {
    const accessToken = localStorage.getItem('access_token');
    if (!accessToken) {
      // Handle case where access token is not available
      console.error('Access token not found');
      return;
    }

    fetch('https://task-master-backend-ng4l.onrender.com/delete_account', {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Failed to delete account');
        }
        console.log('Account deleted successfully');
        // Clear access token from local storage
        localStorage.removeItem('access_token');
        // Redirect user to login page or perform other actions
      })
      .catch(error => console.error('Error deleting account:', error));
  };

  return (
    <div className="container d-flex justify-content-center align-items-center vh-100">
      <div className="card p-4">
        <h3 className="mb-4">Logout or Delete Account</h3>
        <div className="d-flex justify-content-center">
  <button className="btn btn-danger btn-lg mx-2 px-4 py-2" onClick={handleDeleteAccount}>
    Delete Account
  </button>
  <Link to="/" className="btn btn-primary btn-lg mx-2 px-4 py-2">
    Log Out
  </Link>
</div>
      </div>
    </div>
  );
}

export default Logout;
