import React, { useState, useEffect } from 'react';

function GroupForm({ groupLeaderId }) {
  const [groupLeaders, setGroupLeaders] = useState([]);
  const [selectedGroupLeader, setSelectedGroupLeader] = useState(null);
  const [selectedUser, setSelectedUser] = useState('');
  const [selectedTask, setSelectedTask] = useState('');
  const [users, setUsers] = useState([]);
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    fetchGroupLeaders();
    fetchUsers();
    fetchTasks();
  }, []);

  const fetchGroupLeaders = () => {
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
      })
      .catch(error => console.error('Error fetching group leaders:', error));
  };

  const fetchUsers = () => {
    // Fetch all users available to assign
    fetch('http://127.0.0.1:5552/users', {
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
      })
      .catch(error => {
        console.error('Error fetching users:', error);
      });
  };
  
  const fetchTasks = () => {
    // Fetch all tasks available to assign
    fetch('http://127.0.0.1:5552/all-tasks', {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('access_token')}`
      }
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Failed to fetch tasks');
        }
        return response.json();
      })
      .then(data => {
        setTasks(data.tasks);
      })
      .catch(error => {
        console.error('Error fetching tasks:', error);
      });
  };
  

  const handleSelectGroupLeader = (event) => {
    const selectedId = parseInt(event.target.value);
    const leader = groupLeaders.find(leader => leader.id === selectedId);
    setSelectedGroupLeader(leader);
    if (leader) {
      setUsers(leader.users);
      setTasks(leader.tasks);
    } else {
      setUsers([]);
      setTasks([]);
    }
  };

  const handleAssignUsers = () => {
    if (!selectedGroupLeader || !selectedUser) {
      console.error('No group leader or user selected for assignment');
      return;
    }

    fetch(`http://127.0.0.1:5552/group_leaders/${selectedGroupLeader.id}/assign_users`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('access_token')}`
      },
      body: JSON.stringify({ user_ids: [selectedUser] })
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Failed to assign users');
        }
        console.log('Users assigned successfully');
        // Optionally, you can fetch group leaders again to update the list
        // fetchGroupLeaders();
      })
      .catch(error => console.error('Error assigning users:', error));
  };

  const handleAssignTasks = () => {
    if (!selectedGroupLeader || !selectedUser || !selectedTask) {
      console.error('No group leader, user, or task selected for assignment');
      return;
    }

    fetch(`http://127.0.0.1:5552/group_leaders/${selectedGroupLeader.id}/users/${selectedUser}/assign_tasks`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('access_token')}`
      },
      body: JSON.stringify({ task_ids: [selectedTask] })
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Failed to assign tasks');
        }
        console.log('Tasks assigned successfully');
        // Optionally, you can fetch group leaders again to update the list
        // fetchGroupLeaders();
      })
      .catch(error => console.error('Error assigning tasks:', error));
  };

  return (
    <div>
      <h3>Assign Users and Tasks</h3>
      <div>
        <label>Select Group Leader:</label>
        <select onChange={handleSelectGroupLeader}>
          <option value="">Select Group Leader</option>
          {groupLeaders.map(leader => (
            <option key={leader.id} value={leader.id}>{leader.id}</option>
          ))}
        </select>
      </div>
      <div>
        <label>Select User:</label>
        <select value={selectedUser} onChange={e => setSelectedUser(e.target.value)}>
          <option value="">Select User</option>
          {users.map(user => (
            <option key={user.id} value={user.id}>{user.username}</option>
          ))}
        </select>
        <button onClick={handleAssignUsers}>Assign User</button>
      </div>
      <div>
        <label>Select Task:</label>
        <select value={selectedTask} onChange={e => setSelectedTask(e.target.value)}>
          <option value="">Select Task</option>
          {tasks.map(task => (
            <option key={task.id} value={task.id}>{task.title}</option>
          ))}
        </select>
        <button onClick={handleAssignTasks}>Assign Task</button>
      </div>
    </div>
  );
}

export default GroupForm;