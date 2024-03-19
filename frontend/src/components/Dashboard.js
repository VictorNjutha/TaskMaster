import React, { useState, useEffect } from 'react';
import backgroundImage from '../images/landingpage.jpeg';
import 'bootstrap/dist/css/bootstrap.min.css';
import Footer from './footer';

// Progress Bar Component
const ProgressBar = ({ value, label }) => {
  return (
    <div className="progress">
      <div className={`progress-bar ${value === 100 ? 'bg-danger' : value >= 75 ? 'bg-warning' : value >= 50 ? 'bg-info' : 'bg-success'}`}
        role="progressbar"
        style={{ width: `${value}%` }}
        aria-valuenow={value}
        aria-valuemin="0"
        aria-valuemax="100"
      >
        {label}
      </div>
    </div>
  );
};

function Dashboard() {
  const [showAllTasks, setShowAllTasks] = useState(false);
  const [tasks, setTasks] = useState([]);
  const [allTasks, setAllTasks] = useState([]);

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
        if (showAllTasks) {
          setAllTasks(data.tasks);
        } else {
          setTasks(data.tasks);
        }
      } catch (error) {
        console.error('Error fetching tasks:', error);
      }
    };

    fetchTasks();
  }, [showAllTasks]);

  // Calculate basic stats
  const totalTasks = showAllTasks ? allTasks.length : tasks.length;
  const completedTasks = showAllTasks ? allTasks.filter(task => task.completed).length : tasks.filter(task => task.completed).length;
  const overdueTasks = showAllTasks ? allTasks.filter(task => !task.completed && new Date(task.deadline) < new Date()).length : tasks.filter(task => !task.completed && new Date(task.deadline) < new Date()).length;
  const upcomingDeadlines = showAllTasks ? allTasks.filter(task => !task.completed && new Date(task.deadline) >= new Date()).length : tasks.filter(task => !task.completed && new Date(task.deadline) >= new Date()).length;

  return (
    <div>
      <h2>.</h2>
      <div
        style={{
          backgroundColor: 'hsl(218, 41%, 15%)',
          backgroundImage: `url(${backgroundImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          opacity: '1.0',
          height: '100vh',
          overflow: 'hidden',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <div className="col-lg-6 mb-5 mb-lg-0">
          <div
            className="card"
            style={{
              backgroundColor: 'hsla(0, 0%, 100%, 0.8)',
              backdropFilter: 'saturate(200%) blur(25px)',
              borderRadius: '15px',
              opacity: '1.0',
            }}
          >
            <div className="card-body px-4 py-5 px-md-5">
              <div>
                <h2 style={{ textAlign: 'center' }}>Welcome to My Dashboard</h2>
                <div className="mb-3">
                  <button
                    style={{ marginRight: '10px', marginBottom: '10px' }}
                    onClick={() => setShowAllTasks(false)}
                    className="btn btn-primary"
                  >
                    Your Tasks
                  </button>
                  <button
                    style={{ marginBottom: '10px' }}
                    onClick={() => setShowAllTasks(true)}
                    className="btn btn-primary"
                  >
                    All Tasks
                  </button>
                </div>
                <div>
                  <h3>Task Overview</h3>
                  <p>Total Tasks: {totalTasks}</p>
                  <p>Completed Tasks: {completedTasks}</p>
                  <p>Overdue Tasks: {overdueTasks}</p>
                  <p>Upcoming Deadlines: {upcomingDeadlines}</p>
                  {/* Progress Bars */}
                  <ProgressBar value={(completedTasks / totalTasks) * 100} label="Completed Tasks" />
                  <ProgressBar value={(overdueTasks / totalTasks) * 100} label="Overdue Tasks" />
                  <ProgressBar value={(upcomingDeadlines / totalTasks) * 100} label="Upcoming Deadlines" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container mt-4" style={{ backgroundColor: 'white', border: '1px solid #dee2e6', borderRadius: '5px', padding: '20px' }}>
        <h2 style={{ textAlign: 'center' }}>WE SPECIALISE IN TASK MANAGEMENT</h2>
        <p style={{ textAlign: 'center' }}>Specialist Management Services</p>

        {/* Three cards */}
        <div className="row">
          {showAllTasks ? allTasks.map(task => (
            <div key={task.id} className="col">
              <div className="card" style={{ width: '18rem' }}>
                <div className="card-body">
                  <h5 className="card-title">{task.title}</h5>
                  <p className="card-text">{task.description}</p>
                  <p className="card-text">Deadline: {task.deadline}</p>
                  <p className="card-text">{task.completed ? 'Completed' : 'Incomplete'}</p>
                </div>
              </div>
            </div>
          )) : (
            tasks.map(task => (
              <div key={task.id} className="col">
                <div className="card" style={{ width: '18rem' }}>
                  <div className="card-body">
                    <h5 className="card-title">{task.title}</h5>
                    <p className="card-text">{task.description}</p>
                    <p className="card-text">Deadline: {task.deadline}</p>
                    <p className="card-text">{task.completed ? 'Completed' : 'Incomplete'}</p>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Third div for additional content */}

      <Footer />
    </div>
  );
}

export default Dashboard;
