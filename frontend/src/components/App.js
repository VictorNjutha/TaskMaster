import React from 'react';
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
import NavBar from './NavBar';
import Register from './Register';
import Login from './Login';
import Logout from './Logout';
import Comments from './Comments';
import Demote from './Demote';
import GroupForm from './GroupForm';
import GroupList from './GroupList';
import GroupUpdate from './GroupUpdate';
import Profile from './Profile';
import Promote from './Promote';
import TaskForm from './TaskForm';
import TaskList from './TaskList';
import UpdateForm from './UpdateForm';
import Dashboard from './Dashboard';
import Admin from './Admin';
import LandingPage from './LandingPage';
import EmailNotificationForm from './EmailNotificationForm';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <Router>
      <AppRoutes />
    </Router>
  );
}

function AppRoutes() {
  const location = useLocation();
  const { pathname } = location;

  // Define an array of paths where the navbar should not be displayed
  const excludePaths = ['/', '/signup', '/login'];

  // Check if the current path is in the excludePaths array
  const shouldHideNavbar = excludePaths.includes(pathname);

  return (
    <div>
      {/* Render the navbar only if shouldHideNavbar is false */}
      {!shouldHideNavbar && <NavBar />}
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/signup" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/logout" element={<Logout />} />
        <Route path="/comments" element={<Comments />} />
        <Route path="/demote" element={<Demote />} />
        <Route path="/groupform" element={<GroupForm />} />
        <Route path="/grouplist" element={<GroupList />} />
        <Route path="/groupupdate" element={<GroupUpdate />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/promote" element={<Promote />} />
        <Route path="/taskform" element={<TaskForm />} />
        <Route path="/tasklist" element={<TaskList />} />
        <Route path="/updateform" element={<UpdateForm />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/emailnotificationform" element={<EmailNotificationForm />} />
      </Routes>
    </div>
  );
}

export default App;
