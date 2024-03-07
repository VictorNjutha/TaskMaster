// GroupList.js
import React, { useEffect, useState } from 'react';

const GroupList = ({ groupLeaderId }) => {
  const [users, setUsers] = useState([]);
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await fetch(`http://127.0.0.1:5552/group_leaders/${groupLeaderId}/users`, {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        if (!response.ok) {
          throw new Error('Failed to fetch users');
        }
        const data = await response.json();
        setUsers(data.users);
      } catch (error) {
        console.error('Error fetching users:', error.message);
      }
    };
    fetchUsers();
  }, [groupLeaderId]);

  const fetchTasksForUser = async (userId) => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`http://127.0.0.1:5552/group_leaders/${groupLeaderId}/users/${userId}/tasks`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      if (!response.ok) {
        throw new Error('Failed to fetch tasks');
      }
      const data = await response.json();
      setTasks(data.tasks);
    } catch (error) {
      console.error('Error fetching tasks:', error.message);
    }
  };

  return (
    <div>
      <h2>Users Assigned by Group Leader</h2>
      <ul>
        {users.map(user => (
          <li key={user.id}>
            {user.username}
            <button onClick={() => fetchTasksForUser(user.id)}>View Tasks</button>
            <ul>
              {tasks.map(task => (
                <li key={task.id}>
                  {task.title}
                  {/* Display other task details here */}
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default GroupList;