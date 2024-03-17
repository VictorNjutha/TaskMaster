import React from 'react';
import { Link } from 'react-router-dom';
import '/node_modules/bootstrap/dist/css/bootstrap.min.css';

const NavBar = ({ navbarBackground, logoImage }) => {
  return (
    <nav className="navbar navbar-expand-lg navbar-light fixed-top" style={{ backgroundColor: '#010101', color: 'white' }}>
      <div className="container d-flex justify-content-between align-items-center">
        {/* Use Link component to make the image clickable */}
        <Link className="navbar-brand" to="/">
          {/* Use an image tag */}
          <img src={logoImage} alt="Pace Of Africa Ltd" style={{ width: '100px', height: 'auto' }} />
        </Link>
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse justify-content-center" id="navbarNav">
          <ul className="navbar-nav">
            <li className="nav-item">
              <Link className="nav-link" to="/" style={{ fontWeight: 'bold',color: 'white' }}>Landin Page</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/register" style={{ fontWeight: 'bold',color: 'white' }}>Register</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/logout" style={{ fontWeight: 'bold',color: 'white' }}>Logout</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/demote" style={{ fontWeight: 'bold',color: 'white' }}>Demote</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/groupform" style={{ fontWeight: 'bold',color: 'white' }}>Group Form</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/grouplist" style={{ fontWeight: 'bold',color: 'white' }}>Group List</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/profile" style={{ fontWeight: 'bold',color: 'white' }}>Profile</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/promote" style={{ fontWeight: 'bold',color: 'white' }}>Promote</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/taskform" style={{ fontWeight: 'bold',color: 'white' }}>Task Form</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/tasklist" style={{ fontWeight: 'bold',color: 'white' }}>Task List</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/dashboard" style={{ fontWeight: 'bold',color: 'white' }}>Dashboard</Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;