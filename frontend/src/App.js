
// import './App.css';

// function App() {
//   return (
//     <div className="App">
//      <h1>welcome</h1>
//     </div>
//   );
// }

// export default App;


import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './NavBar';
import Register from './Register';
import Promote from './Promote';
import TaskForm from './TaskForm';
import TaskList from './TaskList';
import UpdateForm from './UpdateForm';

const App = () => {
  return (
    <Router>
      <div>
        <Navbar />
        <Routes>
          <Route path="/Register" element={<Register />} />
          
          <Route path="/Promote" element={<Promote />} />
          <Route path="/TaskForm" element={<TaskForm />} />
          <Route path="/TaskList" element={<TaskList />} />
          <Route path="/UpdateForm" element={<UpdateForm />} />
          <Route path="TaskForm" element={<TaskForm />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
