// import React from 'react';
// import { Link } from 'react-router-dom';

// const NavBar = () => {
//   return (
//     <nav>
//       <ul>
//         <li>
//           <Link to="/register">Register</Link>
//         </li>
//         <li>
//           <Link to="/logout">Logout</Link>
//         </li>
//         <li>
//           <Link to="/demote">Demote</Link>
//         </li>
//         <li>
//           <Link to="/groupform">Group Form</Link>
//         </li>
//         <li>
//           <Link to="/grouplist">Group List</Link>
//         </li>
//         <li>
//           <Link to="/profile">Profile</Link>
//         </li>
//         <li>
//           <Link to="/promote">Promote</Link>
//         </li>
//         <li>
//           <Link to="/taskform">Task Form</Link>
//         </li>
//         <li>
//           <Link to="/tasklist">Task List</Link>
//         </li>
//         <li>
//           <Link to="/dashboard">Dashboard</Link> {/* Add Dashboard link */}
//         </li>
//       </ul>
//     </nav>
//   );
// };

// export default NavBar;

import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import '/node_modules/bootstrap/dist/css/bootstrap.min.css';
import logoImage from '../images/favicon.jpeg';
import backgroundImage from '../images/481W.jpeg'; // Import your image

const NavBar = () => {
//   const [navbarBackground, setNavbarBackground] = useState('transparent');

//   useEffect(() => {
//     const handleScroll = () => {
//       const scrollPosition = window.scrollY;
//       const windowHeight = window.innerHeight;
//       const divHeight = document.querySelector('.home-container').offsetHeight;
//       const quarterOfDiv = divHeight / 4;

//       if (scrollPosition > quarterOfDiv) {
//         setNavbarBackground('#010101'); // Change background color when scrolling 1/4 of the div
//       } else {
//         setNavbarBackground('transparent'); // Make transparent when not scrolled 1/4 of the div
//       }
//     };

//     window.addEventListener('scroll', handleScroll);
//     return () => {
//       window.removeEventListener('scroll', handleScroll);
//     };
//   }, []);

//   return (
//     <div className="container-fluid position-relative p-0" style={{ backgroundImage: `url(${backgroundImage})`, backgroundSize: 'cover', backgroundPosition: 'center', opacity: '0.8' }}>
//       {/* Address and Contact Information */}
//       <div className="bg-light text-center py-2" style={{ background: `url(${backgroundImage})`, backgroundSize: 'cover', backgroundPosition: 'center', opacity: '0.9',color: 'white' }}>
//         New Cannon Tower, 7th Flr, Mombasa | Mon - Sat: 8 am - 5 pm, Sunday: CLOSED | +254712 228 338 / 0712 228 339
//       </div>

//       {/* Navbar */}
//       <nav className="navbar navbar-expand-lg navbar-light fixed-top" style={{ backgroundColor: navbarBackground, color: 'white' }}>
//         <div className="container d-flex justify-content-between align-items-center">
//           {/* Use Link component to make the image clickable */}
//           <Link className="navbar-brand" to="/">
//             {/* Use an image tag */}
//             <img src={logoImage} alt="Pace Of Africa Ltd" style={{ width: '100px', height: 'auto' }} />
//           </Link>
//           <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
//             <span className="navbar-toggler-icon"></span>
//           </button>
//           <div className="collapse navbar-collapse justify-content-center" id="navbarNav">
//             <ul className="navbar-nav">
//               <li className="nav-item">
//                 <Link className="nav-link" to="/" style={{ fontWeight: 'bold',color: 'white' }}>Landin Page</Link>
//               </li>
//               <li className="nav-item">
//                 <Link className="nav-link" to="/register" style={{ fontWeight: 'bold',color: 'white' }}>Register</Link>
//               </li>
//               <li className="nav-item">
//                 <Link className="nav-link" to="/logout" style={{ fontWeight: 'bold',color: 'white' }}>Logout</Link>
//               </li>
//               <li className="nav-item">
//                 <Link className="nav-link" to="/demote" style={{ fontWeight: 'bold',color: 'white' }}>Demote</Link>
//               </li>
//               <li className="nav-item">
//                 <Link className="nav-link" to="/groupform" style={{ fontWeight: 'bold',color: 'white' }}>Group Form</Link>
//               </li>
//               <li className="nav-item">
//                 <Link className="nav-link" to="/grouplist" style={{ fontWeight: 'bold',color: 'white' }}>Group List</Link>
//               </li>
//               <li className="nav-item">
//                 <Link className="nav-link" to="/profile" style={{ fontWeight: 'bold',color: 'white' }}>Profile</Link>
//               </li>
//               <li className="nav-item">
//                 <Link className="nav-link" to="/promote" style={{ fontWeight: 'bold',color: 'white' }}>Promote</Link>
//               </li>
//               <li className="nav-item">
//                 <Link className="nav-link" to="/taskform" style={{ fontWeight: 'bold',color: 'white' }}>Task Form</Link>
//               </li>
//               <li className="nav-item">
//                 <Link className="nav-link" to="/tasklist" style={{ fontWeight: 'bold',color: 'white' }}>Task List</Link>
//               </li>
//               <li className="nav-item">
//                 <Link className="nav-link" to="/dashboard" style={{ fontWeight: 'bold',color: 'white' }}>Dashboard</Link>
//               </li>
//             </ul>
//           </div>
//         </div>
//       </nav>

//       {/* Rest of your content */}
//       {/* First Div */}
//       <div className="home-container position-relative w-100 min-vh-100">
//         <div className="position-absolute top-0 start-0 w-100 h-100" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}></div>

//         <div className="container position-relative z-index-1 text-white">
//           {/* Paragraph with three different sizes */}
//           <p style={{ fontSize: '1rem', color: '#8CCB5E' }}>Welcome to Pace of Africa Ltd, where reliability meets excellence in transportation and logistics solutions.</p>
//           <p style={{ fontSize: '3rem', fontWeight: 'bold' }}>Big and bold</p>
//           <p style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>Small and bold</p>

//         </div>
//       </div>

//       {/* Second div for additional content */}
//       <div className="container mt-4" style={{ backgroundColor: 'white', border: '1px solid #dee2e6', borderRadius: '5px', padding: '20px' }}>
//         {/* Content here */}
//       </div>

//       {/* Third div for additional content */}
//       <div className="container-fluid mt-4" style={{ backgroundColor: '#f8f9fa', border: '1px solid #dee2e6', borderRadius: '5px', padding: '0px' }}>
//         {/* Content here */}
//       </div>
//     </div>
//   );
};

export default NavBar;
