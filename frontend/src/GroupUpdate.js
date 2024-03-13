import React, { useState } from 'react';

function GroupUpdate({ groupLeaderId, userId, task }) {
  const [updatedTask, setUpdatedTask] = useState(task);

  const handleUpdate = () => {
    const accessToken = localStorage.getItem('access_token');
    if (!accessToken) {
      // Handle case where access token is not available
      console.error('Access token not found');
      return;
    }
  
    // Ensure completed field is a boolean value
    const updatedTaskWithBooleanCompleted = {
      ...updatedTask,
      completed: updatedTask.completed === 'true' // Convert 'on' string to boolean
    };
  
    fetch(`http://127.0.0.1:5552/group_leaders/${groupLeaderId}/users/${userId}/tasks/${task.id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify(updatedTaskWithBooleanCompleted), // Send updatedTaskWithBooleanCompleted instead of updatedTask
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Failed to update task');
        }
        console.log('Task updated successfully');
      })
      .catch(error => console.error('Error updating task:', error));
  };
  

  const handleDelete = () => {
    const accessToken = localStorage.getItem('access_token');
    if (!accessToken) {
      // Handle case where access token is not available
      console.error('Access token not found');
      return;
    }

    fetch(`http://127.0.0.1:5552/group_leaders/${groupLeaderId}/users/${userId}/tasks/${task.id}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Failed to delete task');
        }
        console.log('Task deleted successfully');
      })
      .catch(error => console.error('Error deleting task:', error));
  };

  return (
    <div>
      <h3>Edit Task</h3>
      <label>Title:</label>
      <input
        type="text"
        value={updatedTask?.title || ''}
        onChange={e => setUpdatedTask({ ...updatedTask, title: e.target.value })}
      />

      <label>Description:</label>
      <textarea
        value={updatedTask?.description || ''}
        onChange={e => setUpdatedTask({ ...updatedTask, description: e.target.value })}
      ></textarea>

      <label>Deadline:</label>
      <input
        type="text"
        value={updatedTask?.deadline || ''}
        onChange={e => setUpdatedTask({ ...updatedTask, deadline: e.target.value })}
      />

      <label>Progress:</label>
      <input
        type="number"
        value={updatedTask?.progress || 0}
        onChange={e => setUpdatedTask({ ...updatedTask, progress: parseInt(e.target.value) || 0 })}
      />

      <label>Priority:</label>
      <select
        value={updatedTask?.priority || ""}
        onChange={e => setUpdatedTask({ ...updatedTask, priority: e.target.value })}
      >
        <option value="low">Low</option>
        <option value="medium">Medium</option>
        <option value="high">High</option>
      </select>

      <label>Completed:</label>
      <input
        type="checkbox"
        checked={updatedTask?.completed || false}
        onChange={e => setUpdatedTask({ ...updatedTask, completed: e.target.checked })}
      />

      <button onClick={handleUpdate}>Update</button>
      <button onClick={handleDelete}>Delete</button>
    </div>
  );
}

export default GroupUpdate;