import React, { useState, useEffect } from 'react';
import backgroundImage from '../images/landingpage.jpeg';
import 'bootstrap/dist/css/bootstrap.min.css';
import NavBar from './NavBar';

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
      <h2>Welcome to My Dashboard</h2>
      <div>
        <button onClick={() => setShowAllTasks(false)}>Your Tasks</button>
        <button onClick={() => setShowAllTasks(true)}>All Tasks</button>
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

      <div className="container mt-4" style={{ backgroundColor: 'white', border: '1px solid #dee2e6', borderRadius: '5px', padding: '20px' }}>
        <h2 style={{ textAlign: 'center' }}>WE SPECIALISE IN TASK MANAGEMENT</h2>
        <p style={{ textAlign: 'center' }}>Specialist Management Services</p>

        {/* Three cards */}
        <div className="row">
          <div className="col">
            <div className="card" style={{ width: '18rem' }}>
              <img src={backgroundImage} className="card-img-top" alt="Card image cap" />
              <div className="card-body">
                <h5 className="card-title">Card title</h5>
                <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                <a href="#" className="btn btn-primary">Go somewhere</a>
              </div>
            </div>
          </div>
          <div className="col">
            <div className="card" style={{ width: '18rem' }}>
              <img src={backgroundImage} className="card-img-top" alt="Card image cap" />
              <div className="card-body">
                <h5 className="card-title">Card title</h5>
                <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                <a href="#" className="btn btn-primary">Go somewhere</a>
              </div>
            </div>
          </div>
          <div className="col">
            <div className="card" style={{ width: '18rem' }}>
              <img src={backgroundImage} className="card-img-top" alt="Card image cap" />
              <div className="card-body">
                <h5 className="card-title">Card title</h5>
                <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                <a href="#" className="btn btn-primary">Go somewhere</a>
              </div>
            </div>
          </div>
        </div>
      </div>

     {/* Third div for additional content */}
<div className="container-fluid mt-4" style={{ backgroundColor: '#f8f9fa', border: '1px solid #dee2e6', borderRadius: '5px', padding: '0px' }}>
  <div className="row">
    <div className="col-md-6" style={{ padding: 0 }}>
      {/* Your image here */}
      <img src={backgroundImage} alt="./images/wallimage.jpeg" style={{ width: '60%', height: 'auto', borderRadius: '5px' }} />
    </div>
    <div className="col-md-6">
      <p>Welcome to Pace of Africa Ltd, where reliability meets excellence in transportation and logistics solutions. With a steadfast commitment to delivering your goods safely and efficiently, we redefine the standards of service in the industry. Our dedicated team works tirelessly to ensure seamless delivery, whether it's across the city or across borders. From streamlined logistics management to cutting-edge technology, we are your trusted partner every step of the way. Experience the pace of progress with Pace of Africa Ltd, where your satisfaction drives our journey forward.</p>
      <div className="d-flex justify-content-between mt-3">
        <button className="btn btn-primary">Get a Quote Now</button>
        <button className="btn btn-primary">About Us</button>
      </div>
    </div>
  </div>
</div>
    </div>
  );
}

export default Dashboard;