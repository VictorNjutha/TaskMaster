import React from 'react';

function Logout() {
  const handleLogout = () => {
    const accessToken = localStorage.getItem('access_token');
    if (!accessToken) {
      // Handle case where access token is not available
      console.error('Access token not found');
      return;
    }

    fetch('http://127.0.0.1:5552/logout', {
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

    fetch('http://127.0.0.1:5552/delete_account', {
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
    <div>
      <h3>Logout or Delete Account</h3>
      <button onClick={handleLogout}>Logout</button>
      <button onClick={handleDeleteAccount}>Delete Account</button>
    </div>
  );
}

export default Logout;