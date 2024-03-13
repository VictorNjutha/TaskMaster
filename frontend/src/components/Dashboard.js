import React, { useState, useEffect } from 'react';

function Dashboard() {
  const [showAllTasks, setShowAllTasks] = useState(false);
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const fetchTasks = async () => {
      const url = showAllTasks ? 'http://127.0.0.1:5552/all-tasks' : 'http://127.0.0.1:5552/tasks';
      try {
        const response = await fetch(url, {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('access_token')}`
          }
        });
        if (!response.ok) {
          throw new Error('Failed to fetch tasks');
        }
        const data = await response.json();
        setTasks(data.tasks);
      } catch (error) {
        console.error('Error fetching tasks:', error);
      }
    };

    fetchTasks();
  }, [showAllTasks]);

  // Calculate basic stats
  const totalTasks = tasks.length;
  const completedTasks = tasks.filter(task => task.completed).length;
  const overdueTasks = tasks.filter(task => !task.completed && new Date(task.deadline) < new Date()).length;
  const upcomingDeadlines = tasks.filter(task => !task.completed && new Date(task.deadline) >= new Date()).length;

  return (
    <div>
      <h1>Dashboard</h1>
      <div>
        <button onClick={() => setShowAllTasks(false)}>Your Tasks</button>
        <button onClick={() => setShowAllTasks(true)}>All Tasks</button>
      </div>
      <div>
        <h2>Task Overview</h2>
        <p>Total Tasks: {totalTasks}</p>
        <p>Completed Tasks: {completedTasks}</p>
        <p>Overdue Tasks: {overdueTasks}</p>
        <p>Upcoming Deadlines: {upcomingDeadlines}</p>
      </div>
    </div>
  );
}

export default Dashboard;
