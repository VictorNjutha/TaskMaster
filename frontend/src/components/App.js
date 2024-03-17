import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
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
import Footer from './footer';
import LandingPage from './LandingPage';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <Router>
        <NavBar />
        <div>
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
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;

ReactDOM.render(<App />, document.getElementById('root'));