import React from 'react';

const Promote = ({ userId, handlePromote }) => {
  const handlePromoteUser = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`http://127.0.0.1:5552/users/${userId}/promote`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      });
      if (!response.ok) {
        throw new Error('Failed to promote user');
      }
      handlePromote();
    } catch (error) {
      console.error('Error promoting user:', error.message);
    }
  };

  return (
    <div>
      <h2>Promote</h2>
      <button onClick={handlePromoteUser}>Promote User</button>
    </div>
  );
};

export default Promote;