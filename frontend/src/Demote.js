import React, { useState, useEffect } from 'react';

function Demote({ onDemote }) {
  const [groupLeaders, setGroupLeaders] = useState([]);
  const [selectedGroupLeaderId, setSelectedGroupLeaderId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetch group leaders data
    fetch('http://127.0.0.1:5552/group_leaders', {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('access_token')}`
      }
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Failed to fetch group leaders');
        }
        return response.json();
      })
      .then(data => {
        setGroupLeaders(data.group_leaders);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching group leaders:', error);
        setError('Failed to fetch group leaders');
        setLoading(false);
      });
  }, []);

  const handleDemote = () => {
    if (!selectedGroupLeaderId) {
      console.error('No group leader selected for demotion');
      return;
    }

    // Send demote request for the selected group leader
    fetch(`http://127.0.0.1:5552/group_leaders/${selectedGroupLeaderId}`, {
      method: 'PATCH',
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('access_token')}`
      }
    })
    .then(response => {
      if (!response.ok) {
        throw new Error('Failed to demote group leader');
      }
      // Handle successful demotion
      console.log('Group leader demoted to normal user');
      onDemote(); // Notify parent component
    })
    .catch(error => {
      console.error('Error demoting group leader:', error);
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
      <h3>Demote Group Leader</h3>
      <select value={selectedGroupLeaderId} onChange={e => setSelectedGroupLeaderId(e.target.value)}>
        <option value="">Select Group Leader</option>
        {groupLeaders.map(groupLeader => (
          <option key={groupLeader.id} value={groupLeader.id}>Group Leader {groupLeader.id}</option>
        ))}
      </select>
      <button onClick={handleDemote}>Demote</button>
    </div>
  );
}

export default Demote