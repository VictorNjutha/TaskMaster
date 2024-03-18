import React from 'react';
import { Link } from 'react-router-dom';
import '/node_modules/bootstrap/dist/css/bootstrap.min.css';

const NavBar = ({ navbarBackground, logoImage }) => {
  return (
    <nav className="navbar navbar-expand-lg navbar-light fixed-top" style={{ backgroundColor: '#010101', color: 'white' }}>
      <div className="container d-flex justify-content-between align-items-center">
        
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse justify-content-center" id="navbarNav">
          <ul className="navbar-nav">
          <li className="nav-item">
              <Link className="nav-link" to="/dashboard" style={{ fontWeight: 'bold',color: 'white' }}>Dashboard</Link>
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
              <Link className="nav-link" to="/taskform" style={{ fontWeight: 'bold',color: 'white' }}>Task Form</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/tasklist" style={{ fontWeight: 'bold',color: 'white' }}>Task List</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/" style={{ fontWeight: 'bold',color: 'white' }}>Log Out</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/logout" style={{ fontWeight: 'bold',color: 'white' }}>Logout</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/admin" style={{ fontWeight: 'bold',color: 'white' }}>Admin</Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;