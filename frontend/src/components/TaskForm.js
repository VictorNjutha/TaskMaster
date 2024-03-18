import React, { useState } from 'react';
import { Link } from 'react-router-dom';

function TaskForm() {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    deadline: '',
    progress: 0,
    priority: 'normal',
    successMessage: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch('http://127.0.0.1:5552/tasks', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('access_token')}`
      },
      body: JSON.stringify(formData)
    })
    .then(response => {
      if (!response.ok) {
        throw new Error('Failed to create task');
      }
      // Handle successful task creation
      setFormData({ ...formData, successMessage: 'Task created successfully' });
    })
    .catch(error => {
      console.error('Error creating task:', error);
    });
  };

  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="border p-4">
            <h2 className="text-center">Create Task</h2>
            {formData.successMessage && (
              <div className="alert alert-success">{formData.successMessage}</div>
            )}
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label className="form-label">Title:</label>
                <input type="text" name="title" value={formData.title} onChange={handleChange} className="form-control" />
              </div>
              <div className="mb-3">
                <label className="form-label">Description:</label>
                <textarea name="description" value={formData.description} onChange={handleChange} className="form-control" />
              </div>
              <div className="mb-3">
                <label className="form-label">Deadline:</label>
                <input type="text" name="deadline" value={formData.deadline} onChange={handleChange} className="form-control" />
              </div>
              <div className="mb-3">
                <label className="form-label">Progress:</label>
                <input type="number" name="progress" value={formData.progress} onChange={handleChange} className="form-control" />
              </div>
              <div className="mb-3">
                <label className="form-label">Priority:</label>
                <select name="priority" value={formData.priority} onChange={handleChange} className="form-select">
                  <option value="low">Low</option>
                  <option value="normal">Normal</option>
                  <option value="high">High</option>
                </select>
              </div>
              <button type="submit" className="btn btn-primary">Create Task</button>
            </form>
            {formData.successMessage && (
              <Link to="/tasklist" className="btn btn-primary mt-2">View Task List</Link>
            )}
          </div>
        </div>
      </div>
      <div className="row justify-content-center mt-4">
        <div className="col-md-6 text-center">
          <Link to="/emailnotificationform">Enable Email Notifications</Link>
        </div>
      </div>
    </div>
  );
}

export default TaskForm;
