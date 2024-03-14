import React, { useState, useEffect } from 'react';
import backgroundImage from '../images/landingpage.jpeg';
import 'bootstrap/dist/css/bootstrap.min.css';


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

  // Inline styles for the carousel and its images
  const carouselStyle = {
    width: '300px', // Adjust width as needed
    height: '200px', // Adjust height as needed
  };

  const imageStyle = {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
  };

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
      {/* Carousel HTML code */}
      <div id="carouselExampleSlidesOnly" className="carousel slide" data-bs-ride="carousel" style={carouselStyle}>
        <div className="carousel-inner">
          <div className="carousel-item active">
            <img src={backgroundImage} className="d-block w-100" style={imageStyle} alt="..." />
          </div>
          <div className="carousel-item">
            <img src={backgroundImage} className="d-block w-100" style={imageStyle} alt="..." />
          </div>
          <div className="carousel-item">
            <img src={backgroundImage} className="d-block w-100" style={imageStyle} alt="..." />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;





// import React, { useState, useEffect } from 'react';
// import backgroundImage from '../images/landingpage.jpeg';
// import 'bootstrap/dist/css/bootstrap.min.css';



// function Dashboard() {
//   const [showAllTasks, setShowAllTasks] = useState(false);
//   const [tasks, setTasks] = useState([]);

//   useEffect(() => {
//     const fetchTasks = async () => {
//       const url = showAllTasks ? 'http://127.0.0.1:5552/all-tasks' : 'http://127.0.0.1:5552/tasks';
//       try {
//         const response = await fetch(url, {
//           method: 'GET',
//           headers: {
//             'Authorization': `Bearer ${localStorage.getItem('access_token')}`
//           }
//         });
//         if (!response.ok) {
//           throw new Error('Failed to fetch tasks');
//         }
//         const data = await response.json();
//         setTasks(data.tasks);
//       } catch (error) {
//         console.error('Error fetching tasks:', error);
//       }
//     };

//     fetchTasks();
//   }, [showAllTasks]);

//   // Calculate basic stats
//   const totalTasks = tasks.length;
//   const completedTasks = tasks.filter(task => task.completed).length;
//   const overdueTasks = tasks.filter(task => !task.completed && new Date(task.deadline) < new Date()).length;
//   const upcomingDeadlines = tasks.filter(task => !task.completed && new Date(task.deadline) >= new Date()).length;

//   useEffect(() => {
//     // Start carousel auto sliding after component mounts
//     const carouselInterval = setInterval(() => {
//       const carousel = document.querySelector('#carouselExampleSlidesOnly');
//       if (carousel) {
//         const carouselInstance = new window.bootstrap.Carousel(carousel);
//         carouselInstance.next();
//       }
//     }, 3000); // Change interval time as needed (3 seconds in this case)

//     return () => {
//       clearInterval(carouselInterval); // Clear interval on component unmount
//     };
//   }, []);

//   return (
//     <div>
//       <h1>Dashboard</h1>
//       <div>
//         <button onClick={() => setShowAllTasks(false)}>Your Tasks</button>
//         <button onClick={() => setShowAllTasks(true)}>All Tasks</button>
//       </div>
//       <div>
//         <h2>Task Overview</h2>
//         <p>Total Tasks: {totalTasks}</p>
//         <p>Completed Tasks: {completedTasks}</p>
//         <p>Overdue Tasks: {overdueTasks}</p>
//         <p>Upcoming Deadlines: {upcomingDeadlines}</p>
//       </div>
//       {/* Carousel HTML code */}
//       <div id="carouselExampleSlidesOnly" className="carousel slide" data-bs-ride="carousel">
//         <div className="carousel-inner">
//           <div className="carousel-item active">
//             <img src={backgroundImage} className="d-block w-100" alt="..." />
//           </div>
//           <div className="carousel-item">
//             <img src={backgroundImage} className="d-block w-100" alt="..." />
//           </div>
//           <div className="carousel-item">
//             <img src={backgroundImage} className="d-block w-100" alt="..." />
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default Dashboard;
