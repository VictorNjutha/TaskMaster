import React from 'react';

const Demote = ({ userId, handleDemote }) => {
  const handleDemoteUser = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`http://127.0.0.1:5552/group_leaders/${userId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      });
      if (!response.ok) {
        throw new Error('Failed to demote user');
      }
      handleDemote();
    } catch (error) {
      console.error('Error demoting user:', error.message);
    }
  };

  return (
    <div>
      <h2>Demote</h2>
      <button onClick={handleDemoteUser}>Demote User</button>
    </div>
  );
};

export default Demote;