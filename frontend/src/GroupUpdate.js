import React, { useState, useEffect } from 'react';

const GroupUpdate = ({ groupLeaderId, userId, taskId, onUpdate, onDelete }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [deadline, setDeadline] = useState('');
  const [progress, setProgress] = useState('');
  const [priority, setPriority] = useState('');
  const [completed, setCompleted] = useState(false);

  useEffect(() => {
    // Fetch task details when component mounts
    const fetchTask = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await fetch(`http://127.0.0.1:5552/group_leaders/${groupLeaderId}/users/${userId}/tasks/${taskId}`, {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        if (!response.ok) {
          throw new Error('Failed to fetch task details');
        }
        const data = await response.json();
        const taskDetails = data.task;
        setTitle(taskDetails.title);
        setDescription(taskDetails.description);
        setDeadline(taskDetails.deadline);
        setProgress(taskDetails.progress);
        setPriority(taskDetails.priority);
        setCompleted(taskDetails.completed);
      } catch (error) {
        console.error('Error fetching task details:', error.message);
      }
    };
    fetchTask();
  }, [groupLeaderId, userId, taskId]);

  const handleUpdate = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`http://127.0.0.1:5552/group_leaders/${groupLeaderId}/users/${userId}/tasks/${taskId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          title,
          description,
          deadline,
          progress,
          priority,
          completed
        })
      });
      if (!response.ok) {
        throw new Error('Failed to update task');
      }
      onUpdate(); // Notify parent component of successful update
    } catch (error) {
      console.error('Error updating task:', error.message);
    }
  };

  const handleDelete = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`http://127.0.0.1:5552/group_leaders/${groupLeaderId}/users/${userId}/tasks/${taskId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      if (!response.ok) {
        throw new Error('Failed to delete task');
      }
      onDelete(); 
    } catch (error) {
      console.error('Error deleting task:', error.message);
    }
  };

  return (
    <div>
      <h2>Edit Task</h2>
      <div>
        <label>Title: </label>
        <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} />
      </div>
      <div>
        <label>Description: </label>
        <textarea value={description} onChange={(e) => setDescription(e.target.value)} />
      </div>
      <div>
        <label>Deadline: </label>
        <input type="date" value={deadline} onChange={(e) => setDeadline(e.target.value)} />
      </div>
      <div>
        <label>Progress: </label>
        <input type="number" value={progress} onChange={(e) => setProgress(e.target.value)} />
      </div>
      <div>
        <label>Priority: </label>
        <input type="text" value={priority} onChange={(e) => setPriority(e.target.value)} />
      </div>
      <div>
        <label>Completed: </label>
        <input type="checkbox" checked={completed} onChange={(e) => setCompleted(e.target.checked)} />
      </div>
      <button onClick={handleUpdate}>Update</button>
      <button onClick={handleDelete}>Delete</button>
    </div>
  );
};

export default GroupUpdate;