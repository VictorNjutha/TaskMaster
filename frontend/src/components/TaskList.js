import React, { useState, useEffect } from 'react';

const TaskList = () => {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await fetch('http://127.0.0.1:5552/tasks');
        if (!response.ok) {
          throw new Error('Failed to fetch tasks');
        }
        const tasksData = await response.json();
        setTasks(tasksData.tasks);
      } catch (error) {
        console.error('Error fetching tasks:', error.message);
      }
    };

    fetchTasks();
  }, []);

  return (
    <div>
      <h2>Task List</h2>
      <ul>
        {tasks.map((task) => (
          <li key={task.id}>
            <h3>{task.title}</h3>
            <p>Description: {task.description}</p>
            <p>Created At: {task.created_at}</p>
            <p>Deadline: {task.deadline}</p>
            <p>Progress: {task.progress}</p>
            <p>Priority: {task.priority}</p>
            <p>Completed: {task.completed ? 'Yes' : 'No'}</p>
            <p>User ID: {task.user_id}</p>
            <p>Group Leader ID: {task.group_leader_id}</p>
            <h4>Comments:</h4>
            <ul>
              {task.comments.map((comment) => (
                <li key={comment.id}>
                  <p>{comment.text}</p>
                  <p>Created At: {comment.created_at}</p>
                  <p>User ID: {comment.user_id}</p>
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TaskList;