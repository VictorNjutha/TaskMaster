import React from 'react';
import { Link } from 'react-router-dom';
import '/node_modules/bootstrap/dist/css/bootstrap.min.css';
import backgroundImage from '../images/landingpage.jpeg';

const LandingPage = () => {
  return (
    <div className="container-fluid position-relative p-0" style={{ backgroundImage: `url(${backgroundImage})`, backgroundSize: 'cover', backgroundPosition: 'center', opacity: '1.0' }}>

      <div className="home-container position-relative w-100 min-vh-100 d-flex align-items-center justify-content-center" style={{ flexDirection: 'column' }}>
        <div className="position-absolute top-0 start-0 w-100 h-100" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}></div>

        <div className="container position-relative z-index-1 text-white text-center"> 
          <p style={{ fontSize: '3rem', fontWeight: 'bold' }}>TaskMaster: Elevate Your Productivity</p>
          <p style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>Simplify tasks, hit goals effortlessly</p>
          <p style={{ fontSize: '1rem', color: 'white' }}>Say hello to TaskMaster: your ultimate task manager for streamlined productivity</p>
          <div className="mt-4">
            <Link to="/login" className="btn btn-primary btn-lg mx-2 px-4 py-2">Log In</Link>
            <Link to="/signup" className="btn btn-secondary btn-lg mx-2 px-4 py-2">Sign Up</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
