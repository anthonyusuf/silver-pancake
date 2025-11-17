import './App.css';
import React from 'react';
import Navbar from './components/NavBar';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import Home from "./pages/Home";
import Login from "./pages/login";
import Register from "./pages/register";
import UserDashboard from './pages/UserDashboard';
import AdminDashboard from './pages/AdminDashboard';
import manageDonations from './pages/manageDonations';
import ManageDonations from './pages/manageDonations';


function App() {
  return (
    <div className="App">
    <Router>
      <Routes> {/*parent container that holds all page routes*/}
          <Route path="/" element={<><Navbar/><Home/> </>} />
          <Route path="/register" element={<Register />} />
          <Route path="/log-in" element={<Login />} />
          <Route path="/user-dashboard" element={<UserDashboard/>} />
          <Route path="/admin-dashboard" element={<AdminDashboard/>} />
          <Route path="/user-dashboard/manage-donations" element={<ManageDonations/>} />
      </Routes>
    </Router>
    </div>
  );
}


export default App;