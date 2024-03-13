import React from 'react';
import { Link } from 'react-router-dom';

const NavBar = () => {
  return (
    <nav>
      <ul>
        <li>
          <Link to="/register">Register</Link>
        </li>
        <li>
          <Link to="/login">Login</Link>
        </li>
        <li>
          <Link to="/logout">Logout</Link>
        </li>
        <li>
          <Link to="/comments">Comments</Link>
        </li>
        <li>
          <Link to="/demote">Demote</Link>
        </li>
        <li>
          <Link to="/groupform">Group Form</Link>
        </li>
        <li>
          <Link to="/grouplist">Group List</Link>
        </li>
        <li>
          <Link to="/groupupdate">Group Update</Link>
        </li>
        <li>
          <Link to="/profile">Profile</Link>
        </li>
        <li>
          <Link to="/promote">Promote</Link>
        </li>
        <li>
          <Link to="/taskform">Task Form</Link>
        </li>
        <li>
          <Link to="/tasklist">Task List</Link>
        </li>
        <li>
          <Link to="/updateform">Update Form</Link>
        </li>
      </ul>
    </nav>
  );
};

export default NavBar;
gggg