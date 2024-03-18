import React, { useState, useEffect } from 'react';
import GroupUpdate from './GroupUpdate';
import Footer from './footer';
import backgroundImage from '../images/landingpage.jpeg';

function GroupList({ groupLeaderId }) {
  const [groupLeaders, setGroupLeaders] = useState([]);
  const [assignedUsers, setAssignedUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [userTasks, setUserTasks] = useState([]);
  const [selectedGroupLeader, setSelectedGroupLeader] = useState(null);
  const [selectedTask, setSelectedTask] = useState(null);

  useEffect(() => {
    const accessToken = localStorage.getItem('access_token');
    if (!accessToken) {
      // Handle case where access token is not available
      console.error('Access token not found');
      return;
    }

    // Fetch group leaders
    fetch('http://127.0.0.1:5552/group_leaders', {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    })
      .then(response => response.json())
      .then(data => {
        setGroupLeaders(data.group_leaders);
      })
      .catch(error => console.error('Error fetching group leaders:', error));

    setSelectedGroupLeader(groupLeaderId);
  }, [groupLeaderId]);

  useEffect(() => {
    if (selectedGroupLeader) {
      // Fetch assigned users for the selected group leader
      fetch(`http://127.0.0.1:5552/group_leaders/${selectedGroupLeader}/users`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('access_token')}`,
        },
      })
        .then(response => response.json())
        .then(data => {
          console.log("Fetched users data:", data.users); // Log fetched user data
          setAssignedUsers(data.users);
        })
        .catch(error => console.error('Error fetching assigned users:', error));
    }
  }, [selectedGroupLeader]);
  
  // Add logging to check the value of assignedUsers
  console.log("Assigned users:", assignedUsers);
  

  const handleUserClick = userId => {
    const accessToken = localStorage.getItem('access_token');
    if (!accessToken) {
      // Handle case where access token is not available
      console.error('Access token not found');
      return;
    }

    fetch(`http://127.0.0.1:5552/group_leaders/${selectedGroupLeader}/users/${userId}/tasks`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    })
      .then(response => response.json())
      .then(data => {
        setUserTasks(data.tasks);
        setSelectedUser(userId);
      })
      .catch(error => console.error('Error fetching user tasks:', error));
  };

  return (
    <div><h2>.</h2>
    <div className="container-fluid" style={{backgroundImage: `url(${backgroundImage})`,backgroundSize: 'cover',backgroundPosition: 'center',minHeight: '100vh',position: 'relative',}}>
  <div className="row justify-content-center">
    <div className="col-md-6">
      <div className="border p-4" style={{ backgroundColor: '#f2f2f2', marginTop: '50px' }}>
        <h2 className="mb-4">Group Leader Dashboard</h2>
        <div className="form-group mb-4">
          <label htmlFor="groupLeaderSelect">Select Group Leader:</label>
          <select id="groupLeaderSelect" className="form-select" onChange={e => setSelectedGroupLeader(e.target.value)}>
            <option value="">Select Group Leader</option>
            {groupLeaders.map(leader => (
              <option key={leader.id} value={leader.id}>{leader.id}</option>
            ))}
          </select>
        </div>
        <h3 className="mb-3">Assigned Users:</h3>
        <ul className="list-group mb-4">
          {assignedUsers && assignedUsers.map(user => (
            <li key={user.id} onClick={() => handleUserClick(user.id)} className="list-group-item list-group-item-action">
              {user.username}
            </li>
          ))}
        </ul>
        {selectedUser && (
          <div>
            <h3 className="mb-3">Tasks for User {selectedUser}:</h3>
            <ul className="list-group mb-4">
              {userTasks && userTasks.map(task => (
                <li key={task.id} onClick={() => setSelectedTask(task)} className="list-group-item list-group-item-action">
                  <strong>{task.title}</strong> - {task.description}
                </li>
              ))}
            </ul>
            {selectedTask && (
              <GroupUpdate
                groupLeaderId={selectedGroupLeader}
                userId={selectedUser}
                task={selectedTask}
              />
            )}
          </div>
        )}
      </div>
    </div>
  </div>
</div>
    <Footer />
    </div>
);


}

export default GroupList;
