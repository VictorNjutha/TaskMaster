import React, { useState, useEffect } from 'react';

function Promote({ onPromote }) {
  const [users, setUsers] = useState([]);
  const [selectedUserId, setSelectedUserId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [promotionMessage, setPromotionMessage] = useState(null);

  useEffect(() => {
    // Fetch all users
    fetch('http://127.0.0.1:5552/users', {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('access_token')}`
      }
    })
    .then(response => {
      if (!response.ok) {
        throw new Error('Failed to fetch users');
      }
      return response.json();
    })
    .then(data => {
      setUsers(data.users);
      setLoading(false);
    })
    .catch(error => {
      console.error('Error fetching users:', error);
      setError('Failed to fetch users');
      setLoading(false);
    });
  }, []);

  const handlePromote = () => {
    if (!selectedUserId) {
      console.error('No user selected for promotion');
      return;
    }

    // Send promote request for the selected user
    fetch(`http://127.0.0.1:5552/users/${selectedUserId}/promote`, {
      method: 'PATCH',
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('access_token')}`
      }
    })
    .then(response => {
      if (!response.ok) {
        throw new Error('Failed to promote user');
      }
      // Handle successful promotion
      console.log('User promoted to group leader');
      setPromotionMessage(`User promoted to group leader with ID ${selectedUserId}`);
      onPromote(); // Notify parent component
    })
    .catch(error => {
      console.error('Error promoting user:', error);
    });
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <h3>Promote to Group Leader</h3>
      <select value={selectedUserId} onChange={e => setSelectedUserId(e.target.value)}>
        <option value="">Select User</option>
        {users.map(user => (
          <option key={user.id} value={user.id}>{user.username}</option>
        ))}
      </select>
      <button onClick={handlePromote}>Promote</button>
      {promotionMessage && <p>{promotionMessage}</p>}
    </div>
  );
}

export default Promote;
