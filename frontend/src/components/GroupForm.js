import React, { useState, useEffect } from 'react';
import Footer from './footer';
import backgroundImage from '../images/landingpage.jpeg';

function GroupForm({ groupLeaderId }) {
  const [groupLeaders, setGroupLeaders] = useState([]);
  const [selectedGroupLeader, setSelectedGroupLeader] = useState(null);
  const [selectedUser, setSelectedUser] = useState('');
  const [selectedTask, setSelectedTask] = useState('');
  const [users, setUsers] = useState([]);
  const [tasks, setTasks] = useState([]);
  const [assignUserSuccess, setAssignUserSuccess] = useState(false);
  const [assignTaskSuccess, setAssignTaskSuccess] = useState(false);

  useEffect(() => {
    fetchGroupLeaders();
    fetchUsers();
    fetchTasks();
  }, []);

  const fetchGroupLeaders = () => {
    fetch('https://task-master-backend-ng4l.onrender.com/group_leaders', {
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
    fetch('https://task-master-backend-ng4l.onrender.com/users', {
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
    fetch('https://task-master-backend-ng4l.onrender.com/all-tasks', {
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

    fetch(`https://task-master-backend-ng4l.onrender.com/group_leaders/${selectedGroupLeader.id}/assign_users`, {
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
        setAssignUserSuccess(true);
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

    fetch(`https://task-master-backend-ng4l.onrender.com/group_leaders/${selectedGroupLeader.id}/users/${selectedUser}/assign_tasks`, {
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
        setAssignTaskSuccess(true);
        // Optionally, you can fetch group leaders again to update the list
        // fetchGroupLeaders();
      })
      .catch(error => console.error('Error assigning tasks:', error));
  };

  return (
    <div>
      <div className="container-fluid" style={{backgroundImage: `url(${backgroundImage})`, backgroundSize: 'cover',backgroundPosition:'center',minHeight: '100vh',position: 'relative'}}>
        <div className="row justify-content-center">
          <div className="col-md-6">
            <div className="border p-4" style={{ backgroundColor: '#f2f2f2' }}>
              <h3 className="mb-4">Assign Users and Tasks</h3>
              <div className="form-group">
                <label htmlFor="groupLeaderSelect">Select Group Leader:</label>
                <select id="groupLeaderSelect" className="form-control" onChange={handleSelectGroupLeader}>
                  <option value="">Select Group Leader</option>
                  {groupLeaders.map(leader => (
                    <option key={leader.id} value={leader.id}>{leader.id}</option>
                  ))}
                </select>
              </div>
              <br></br>
              
              <div className="form-group">
                <label htmlFor="userSelect">Select User:</label>
                <select id="userSelect" className="form-control" value={selectedUser} onChange={e => setSelectedUser(e.target.value)}>
                  <option value="">Select User</option>
                  {users.map(user => (
                    <option key={user.id} value={user.id} style={{ opacity: 0.8 }}>{user.username}</option>
                  ))}
                </select>
                <button className="btn btn-primary mt-2" onClick={handleAssignUsers}>Assign User</button>
                {assignUserSuccess && <span className="text-success ml-2">User assigned successfully</span>}
              </div>
              <br></br>

              <div className="form-group">
                <label htmlFor="taskSelect">Select Task:</label>
                <select id="taskSelect" className="form-control" value={selectedTask} onChange={e => setSelectedTask(e.target.value)}>
                  <option value="">Select Task</option>
                  {tasks.map(task => (
                    <option key={task.id} value={task.id} style={{ opacity: 0.8 }}>{task.title}</option>
                  ))}
                </select>
                <button className="btn btn-primary mt-2" onClick={handleAssignTasks}>Assign Task</button>
                {assignTaskSuccess && <span className="text-success ml-2">Task assigned successfully</span>}
              </div>
              <br></br>
              
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default GroupForm;