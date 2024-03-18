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
    <div className="d-flex align-items-center justify-content-center bg-light" style={{ minHeight: '100vh' }}>
      <div className="container border p-4 bg-white">
        <h3 className="text-center">Edit Task</h3>
        <form onSubmit={handleUpdate}>
          <div className="mb-3">
            <label htmlFor="title" className="form-label">Title:</label>
            <input
              type="text"
              id="title"
              value={updatedTask?.title || ''}
              onChange={e => setUpdatedTask({ ...updatedTask, title: e.target.value })}
              className="form-control"
            />
          </div>

          <div className="mb-3">
            <label htmlFor="description" className="form-label">Description:</label>
            <textarea
              id="description"
              value={updatedTask?.description || ''}
              onChange={e => setUpdatedTask({ ...updatedTask, description: e.target.value })}
              className="form-control"
            ></textarea>
          </div>

          <div className="mb-3">
            <label htmlFor="deadline" className="form-label">Deadline:</label>
            <input
              type="text"
              id="deadline"
              value={updatedTask?.deadline || ''}
              onChange={e => setUpdatedTask({ ...updatedTask, deadline: e.target.value })}
              className="form-control"
            />
          </div>

          <div className="mb-3">
            <label htmlFor="progress" className="form-label">Progress:</label>
            <input
              type="number"
              id="progress"
              value={updatedTask?.progress || 0}
              onChange={e => setUpdatedTask({ ...updatedTask, progress: parseInt(e.target.value) || 0 })}
              className="form-control"
            />
          </div>

          <div className="mb-3">
            <label htmlFor="priority" className="form-label">Priority:</label>
            <select
              id="priority"
              value={updatedTask?.priority || ""}
              onChange={e => setUpdatedTask({ ...updatedTask, priority: e.target.value })}
              className="form-select"
            >
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
            </select>
          </div>

          <div className="mb-3 form-check">
            <input
              type="checkbox"
              id="completed"
              checked={updatedTask?.completed || false}
              onChange={e => setUpdatedTask({ ...updatedTask, completed: e.target.checked })}
              className="form-check-input"
            />
            <label htmlFor="completed" className="form-check-label">Completed</label>
          </div>

          <button type="submit" className="btn btn-primary">Update</button>
          <button onClick={handleDelete} className="btn btn-danger">Delete</button>
        </form>
      </div>
    </div>
);

}

export default GroupUpdate;
