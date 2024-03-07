import React, { useState, useEffect } from 'react';

const UpdateForm = () => {
  const [taskData, setTaskData] = useState({
    id: '',
    title: '',
    description: '',
    deadline: '',
    progress: 0,
    priority: 'normal',
    completed: false,
  });

  useEffect(() => {
    const fetchTaskData = async () => {
      try {
        const response = await fetch('http://127.0.0.1:5552/tasks/' + taskData.id, {
          method: 'GET',
          headers: {
            'Authorization': 'Bearer ' + localStorage.getItem('token'),
          },
        });
        if (!response.ok) {
          throw new Error('Failed to fetch task data');
        }
        const data = await response.json();
        setTaskData(data.task);
      } catch (error) {
        console.error('Error fetching task data:', error.message);
      }
    };

    fetchTaskData();
  }, [taskData.id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://127.0.0.1:5552/tasks/' + taskData.id, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + localStorage.getItem('token'),
        },
        body: JSON.stringify(taskData),
      });
      if (!response.ok) {
        throw new Error('Failed to update task');
      }
      console.log('Task updated successfully');
    } catch (error) {
      console.error('Error updating task:', error.message);
    }
  };

  const handleDelete = async () => {
    try {
      const response = await fetch('http://127.0.0.1:5552/tasks/' + taskData.id, {
        method: 'DELETE',
        headers: {
          'Authorization': 'Bearer ' + localStorage.getItem('token'),
        },
      });
      if (!response.ok) {
        throw new Error('Failed to delete task');
      }
      console.log('Task deleted successfully');
    } catch (error) {
      console.error('Error deleting task:', error.message);
    }
  };

  return (
    <div>
      <h2>Update Task</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Title:</label>
          <input type="text" name="title" value={taskData.title} onChange={(e) => setTaskData({ ...taskData, title: e.target.value })} />
        </div>
        <div>
          <label>Description:</label>
          <textarea name="description" value={taskData.description} onChange={(e) => setTaskData({ ...taskData, description: e.target.value })}></textarea>
        </div>
        <div>
          <label>Deadline:</label>
          <input type="date" name="deadline" value={taskData.deadline} onChange={(e) => setTaskData({ ...taskData, deadline: e.target.value })} />
        </div>
        <div>
          <label>Progress:</label>
          <input type="number" name="progress" value={taskData.progress} onChange={(e) => setTaskData({ ...taskData, progress: e.target.value })} />
        </div>
        <div>
          <label>Priority:</label>
          <select name="priority" value={taskData.priority} onChange={(e) => setTaskData({ ...taskData, priority: e.target.value })}>
            <option value="low">Low</option>
            <option value="normal">Normal</option>
            <option value="high">High</option>
          </select>
        </div>
        <div>
          <label>Completed:</label>
          <input type="checkbox" name="completed" checked={taskData.completed} onChange={(e) => setTaskData({ ...taskData, completed: e.target.checked })} />
        </div>
        <button type="submit">Update Task</button>
      </form>
      <button onClick={handleDelete}>Delete Task</button>
    </div>
  );
};

export default UpdateForm;