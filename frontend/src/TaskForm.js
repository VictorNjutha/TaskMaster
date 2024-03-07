import React, { useState } from 'react';

const TaskForm = () => {
  const [taskData, setTaskData] = useState({
    title: '',
    description: '',
    deadline: '',
    progress: 0,
    priority: 'normal',
    completed: false,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTaskData({ ...taskData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://127.0.0.1:5552/tasks', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + localStorage.getItem('token'),
        },
        body: JSON.stringify(taskData),
      });
      if (!response.ok) {
        throw new Error('Failed to create task');
      }
      console.log('Task created successfully');
    } catch (error) {
      console.error('Error creating task:', error.message);
    }
  };

  return (
    <div>
      <h2>Create Task</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Title:</label>
          <input type="text" name="title" value={taskData.title} onChange={handleChange} />
        </div>
        <div>
          <label>Description:</label>
          <textarea name="description" value={taskData.description} onChange={handleChange}></textarea>
        </div>
        <div>
          <label>Deadline:</label>
          <input type="text" name="deadline" value={taskData.deadline} onChange={handleChange} />
        </div>
        <div>
          <label>Progress:</label>
          <input type="number" name="progress" value={taskData.progress} onChange={handleChange} />
        </div>
        <div>
          <label>Priority:</label>
          <select name="priority" value={taskData.priority} onChange={handleChange}>
            <option value="low">Low</option>
            <option value="normal">Normal</option>
            <option value="high">High</option>
          </select>
        </div>
        <div>
          <label>Completed:</label>
          <input type="checkbox" name="completed" checked={taskData.completed} onChange={(e) => setTaskData({ ...taskData, completed: e.target.checked })} />
        </div>
        <button type="submit">Create Task</button>
      </form>
    </div>
  );
};

export default TaskForm;

