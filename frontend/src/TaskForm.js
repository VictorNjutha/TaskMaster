import React, { useState } from 'react';

function TaskForm() {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    deadline: '',
    progress: 0,
    priority: 'normal'
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch('http://127.0.0.1:5552/tasks', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json', // Specify the content type as JSON
        'Authorization': `Bearer ${localStorage.getItem('access_token')}` // Add JWT token from local storage
      },
      body: JSON.stringify({
        title: formData.title,
        description: formData.description,
        deadline: formData.deadline,
        progress: formData.progress,
        priority: formData.priority
      })
    })
    .then(response => {
      if (!response.ok) {
        throw new Error('Failed to create task');
      }
      // Handle successful task creation
      console.log('Task created successfully');
    })
    .catch(error => {
      console.error('Error creating task:', error);
    });
  };

  return (
    <div>
      <h2>Create Task</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Title:</label>
          <input type="text" name="title" value={formData.title} onChange={handleChange} />
        </div>
        <div>
          <label>Description:</label>
          <textarea name="description" value={formData.description} onChange={handleChange} />
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
          <select name="priority" value={formData.priority} onChange={handleChange}>
            <option value="low">Low</option>
            <option value="normal">Normal</option>
            <option value="high">High</option>
          </select>
        </div>
        <button type="submit">Create Task</button>
      </form>
    </div>
  );
}

export default TaskForm;