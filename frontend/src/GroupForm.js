import React, { useState } from 'react';

const GroupForm = () => {
  const [groupLeaderId, setGroupLeaderId] = useState('');
  const [userIds, setUserIds] = useState('');
  const [taskIds, setTaskIds] = useState('');

  const handleAssignUsers = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`http://127.0.0.1:5552/group_leaders/${groupLeaderId}/assign_users`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ user_ids: userIds.split(',') })
      });
      if (!response.ok) {
        throw new Error('Failed to assign users to group leader');
      }
      // Handle success
    } catch (error) {
      console.error('Error assigning users to group leader:', error.message);
    }
  };

  const handleAssignTasks = async (userId) => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`http://127.0.0.1:5552/group_leaders/${groupLeaderId}/users/${userId}/assign_tasks`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ task_ids: taskIds.split(',') })
      });
      if (!response.ok) {
        throw new Error('Failed to assign tasks to user');
      }
      // Handle success
    } catch (error) {
      console.error('Error assigning tasks to user:', error.message);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await handleAssignUsers();
    const users = userIds.split(',');
    users.forEach(async (userId) => {
      await handleAssignTasks(userId);
    });
  };

  return (
    <div>
      <h2>Assign Users and Tasks</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Group Leader ID:
          <input type="number" value={groupLeaderId} onChange={(e) => setGroupLeaderId(e.target.value)} />
        </label>
        <br />
        <label>
          User IDs (comma-separated):
          <input type="text" value={userIds} onChange={(e) => setUserIds(e.target.value)} />
        </label>
        <br />
        <label>
          Task IDs (comma-separated):
          <input type="text" value={taskIds} onChange={(e) => setTaskIds(e.target.value)} />
        </label>
        <br />
        <button type="submit">Assign Users and Tasks</button>
      </form>
    </div>
  );
};

export default GroupForm;