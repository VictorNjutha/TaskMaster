import React, { useState, useEffect } from 'react';
import Footer from './footer';
import backgroundImage from '../images/landingpage.jpeg';

function Admin({ onPromote, onDemote }) {
  const [users, setUsers] = useState([]);
  const [selectedUserId, setSelectedUserId] = useState(null);
  const [loadingUsers, setLoadingUsers] = useState(true);
  const [errorUsers, setErrorUsers] = useState(null);
  const [promotionMessage, setPromotionMessage] = useState(null);

  const [groupLeaders, setGroupLeaders] = useState([]);
  const [selectedGroupLeaderId, setSelectedGroupLeaderId] = useState(null);
  const [loadingGroupLeaders, setLoadingGroupLeaders] = useState(true);
  const [errorGroupLeaders, setErrorGroupLeaders] = useState(null);
  const [demotionMessage, setDemotionMessage] = useState(null); // Add state for demotion message

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
      setLoadingUsers(false);
    })
    .catch(error => {
      console.error('Error fetching users:', error);
      setErrorUsers('Failed to fetch users');
      setLoadingUsers(false);
    });

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
      setLoadingGroupLeaders(false);
    })
    .catch(error => {
      console.error('Error fetching group leaders:', error);
      setErrorGroupLeaders('Failed to fetch group leaders');
      setLoadingGroupLeaders(false);
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
      setDemotionMessage(`Group leader demoted to normal user with ID ${selectedGroupLeaderId}`);
      onDemote(); // Notify parent component
    })
    .catch(error => {
      console.error('Error demoting group leader:', error);
    });
  };

  if (loadingUsers || loadingGroupLeaders) {
    return <div>Loading...</div>;
  }

  if (errorUsers || errorGroupLeaders) {
    return <div>Error: {errorUsers || errorGroupLeaders}</div>;
  }

  return (
    <div>
      <div><h2>.</h2></div>
      <div className="container-fluid" style={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        minHeight: '100vh',
        position: 'relative',
        display: 'flex', // Add this line
        justifyContent: 'center', // Center horizontally
        alignItems: 'center' // Center vertically
      }}>
        <div className="row" style={{ width: '100%', maxWidth: '960px' }}> {/* Adjust the maxWidth according to your preference */}
          <div className="col-md-6">
            <div className="card">
              <div className="card-body">
                <h3 className="card-title">Promote to Group Leader</h3>
                <form>
                  <div className="mb-3">
                    <label htmlFor="userSelect" className="form-label">Select User</label>
                    <select id="userSelect" className="form-select" value={selectedUserId} onChange={e => setSelectedUserId(e.target.value)}>
                      <option value="">Select User</option>
                      {users.map(user => (
                        <option key={user.id} value={user.id}>{user.username}</option>
                      ))}
                    </select>
                  </div>
                  <button type="button" className="btn btn-primary" onClick={handlePromote}>Promote</button>
                  {promotionMessage && <p>{promotionMessage}</p>}
                </form>
              </div>
            </div>
          </div>
          <div className="col-md-6">
            <div className="card">
              <div className="card-body">
                <h3 className="card-title">Demote Group Leader</h3>
                <form>
                  <div className="mb-3">
                    <label htmlFor="groupLeaderSelect" className="form-label">Select Group Leader</label>
                    <select id="groupLeaderSelect" className="form-select" value={selectedGroupLeaderId} onChange={e => setSelectedGroupLeaderId(e.target.value)}>
                      <option value="">Select Group Leader</option>
                      {groupLeaders.map(groupLeader => (
                        <option key={groupLeader.id} value={groupLeader.id}>Group Leader {groupLeader.id}</option>
                      ))}
                    </select>
                  </div>
                  <button type="button" className="btn btn-primary" onClick={handleDemote}>Demote</button>
                  {demotionMessage && <p>{demotionMessage}</p>} {/* Display demotion message */}
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Admin;