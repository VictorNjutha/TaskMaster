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
      <h2>.</h2>
      <div style={{backgroundColor: 'hsl(218, 41%, 15%)', backgroundImage: `url(${backgroundImage})`, backgroundSize: 'cover', backgroundPosition: 'center', opacity: '1.0', height: '100vh', overflow: 'hidden', position: 'relative',}}>
  <div className="col-lg-6 mb-5 mb-lg-0 position-relative">
    <div className="card" style={{ backgroundColor: 'hsla(0, 0%, 100%, 0.8)', backdropFilter: 'saturate(200%) blur(25px)', borderRadius: '15px', opacity: '1.0',}}>
      <div className="card-body px-4 py-5 px-md-5">
        <div>
          <h2 style={{ textAlign: 'center' }}>Welcome to My Dashboard</h2>
          <div className="mb-3">
            <button style={{ marginRight: '10px', marginBottom: '10px' }} onClick={() => setShowAllTasks(false)} className="btn btn-primary">Your Tasks</button>
            <button style={{ marginBottom: '10px' }} onClick={() => setShowAllTasks(true)} className="btn btn-primary">All Tasks</button>
          </div>
          <div>
            <h3>Task Overview</h3>
            <p>Total Tasks: {totalTasks}</p>
            <p>Completed Tasks: {completedTasks}</p>
            <p>Overdue Tasks: {overdueTasks}</p>
            <p>Upcoming Deadlines: {upcomingDeadlines}</p>
            {/* Progress Bars */}
            <div className="progress mb-3">
              <div className="progress-bar bg-success" role="progressbar" style={{ width: `${(completedTasks / totalTasks) * 100}%` }} aria-valuenow={(completedTasks / totalTasks) * 100} aria-valuemin="0" aria-valuemax="100">Completed Tasks</div>
            </div>
            <div className="progress mb-3">
              <div className="progress-bar bg-danger" role="progressbar" style={{ width: `${(overdueTasks / totalTasks) * 100}%` }} aria-valuenow={(overdueTasks / totalTasks) * 100} aria-valuemin="0" aria-valuemax="100">Overdue Tasks</div>
            </div>
            <div className="progress mb-3">
              <div className="progress-bar bg-warning" role="progressbar" style={{ width: `${(upcomingDeadlines / totalTasks) * 100}%` }} aria-valuenow={(upcomingDeadlines / totalTasks) * 100} aria-valuemin="0" aria-valuemax="100">Upcoming Deadlines</div>
            </div>
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
<Footer />
    </div>
   
  );
}

export default Dashboard;