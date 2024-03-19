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
  const [updateSuccess, setUpdateSuccess] = useState(false);
  const [deleteSuccess, setDeleteSuccess] = useState(false);

  const handleChange = (e) => {
    const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
    setFormData({ ...formData, [e.target.name]: value });
  };

  const handleUpdate = (e) => {
    e.preventDefault();
    console.log('Updating task with ID:', taskId);
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
      console.log('Task updated successfully');
      onUpdate(taskId, formData);
      setUpdateSuccess(true); // Set update success message
    })
    .catch(error => {
      console.error('Error updating task:', error);
    });
  };

  const handleDelete = () => {
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
      console.log('Task deleted successfully');
      onDelete(taskId);
      setDeleteSuccess(true); // Set delete success message
    })
    .catch(error => {
      console.error('Error deleting task:', error);
    });
  };

  return (
    <div className="d-flex align-items-center justify-content-center" style={{ minHeight: '100vh' }}>
      <div className="container border p-4">
        <h3>Update Task</h3>
        {updateSuccess && <div className="alert alert-success" role="alert">Task updated successfully</div>}
        {deleteSuccess && <div className="alert alert-success" role="alert">Task deleted successfully</div>}
        <form onSubmit={handleUpdate}>
          <div className="mb-3">
            <label htmlFor="title" className="form-label">Title:</label>
            <input
              type="text"
              id="title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              className="form-control"
            />
          </div>
          <div className="mb-3">
            <label htmlFor="description" className="form-label">Description:</label>
            <input
              type="text"
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              className="form-control"
            />
          </div>
          <div className="mb-3">
            <label htmlFor="deadline" className="form-label">Deadline:</label>
            <input
              type="text"
              id="deadline"
              name="deadline"
              value={formData.deadline}
              onChange={handleChange}
              className="form-control"
            />
          </div>
          <div className="mb-3">
            <label htmlFor="progress" className="form-label">Progress:</label>
            <input
              type="number"
              id="progress"
              name="progress"
              value={formData.progress}
              onChange={handleChange}
              className="form-control"
            />
          </div>
<div className="mb-3">
<label htmlFor="priority" className="form-label">Priority:</label>
<select name="priority" value={formData.priority} onChange={handleChange} className="form-select">
              <option value="low">Low</option>
              <option value="normal">Normal</option>
              <option value="high">High</option>
            </select>
            </div>
          <div className="mb-3 form-check">
            <input
              type="checkbox"
              id="completed"
              name="completed"
              checked={formData.completed}
              onChange={handleChange}
              className="form-check-input"
            />
            <label htmlFor="completed" className="form-check-label">Completed</label>
          </div>
          <button type="submit" className="btn btn-primary">Update</button>
        </form>
        <button onClick={handleDelete} className="btn btn-danger mt-3">Delete</button>
      </div>
    </div>
  );
}

export default UpdateForm;