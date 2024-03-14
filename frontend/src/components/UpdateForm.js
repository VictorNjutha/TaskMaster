import React, { useState } from 'react';

function UpdateForm({ taskId, accessToken, onUpdate, onDelete }) {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    deadline: '',
    progress: 0,
    priority: '',
    completed: false
  });

  const handleChange = (e) => {
    const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
    setFormData({ ...formData, [e.target.name]: value });
  };
  

  const handleUpdate = (e) => {
    e.preventDefault();
    
    // Log the taskId for debugging
    console.log('Updating task with ID:', taskId);
  
    // Send update request with formData
    fetch(`http://127.0.0.1:5552/tasks/${taskId}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('access_token')}`
      },
      body: JSON.stringify(formData)
    })
    .then(response => {
      if (!response.ok) {
        throw new Error('Failed to update task');
      }
      // Handle successful update
      console.log('Task updated successfully');
      onUpdate(taskId, formData); // Pass taskId and updated formData to parent component
    })
    .catch(error => {
      console.error('Error updating task:', error);
    });
  };
    

  const handleDelete = () => {
    // Send delete request for the taskId
    fetch(`http://127.0.0.1:5552/tasks/${taskId}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('access_token')}`
      }
    })
    .then(response => {
      if (!response.ok) {
        throw new Error('Failed to delete task');
      }
      // Handle successful deletion
      console.log('Task deleted successfully');
      onDelete(taskId); // Pass taskId to parent component
    })
    .catch(error => {
      console.error('Error deleting task:', error);
    });
  };

  return (
    <div>
      <h3>Update Task</h3>
      <form onSubmit={handleUpdate}>
        <div>
          <label>Title:</label>
          <input type="text" name="title" value={formData.title} onChange={handleChange} />
        </div>
        <div>
          <label>Description:</label>
          <input type="text" name="description" value={formData.description} onChange={handleChange} />
        </div>
        <div>
          <label>Deadline:</label>
          <input type="text" name="deadline" value={formData.deadline} onChange={handleChange} />
        </div>
        <div>
          <label>Progress:</label>
          <input type="number" name="progress" value={formData.progress} onChange={handleChange} />
        </div>
        <div>
          <label>Priority:</label>
          <input type="text" name="priority" value={formData.priority} onChange={handleChange} />
        </div>
        <div>
          <label>Completed:</label>
          <input type="checkbox" name="completed" checked={formData.completed} onChange={handleChange} />
        </div>
        <button type="submit">Update</button>
      </form>
      <button onClick={handleDelete}>Delete</button>
    </div>
  );
}

export default UpdateForm;