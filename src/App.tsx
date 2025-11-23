import './App.css';
import React from 'react';
import Navbar from './components/NavBar';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import Home from "./pages/Home";
import Login from "./pages/login";
import Register from "./pages/register";
import UserDashboard from './pages/UserDashboard';
import AdminDashboard from './pages/AdminDashboard';
import ContactPage from './pages/ContactPage';
import Inbox from './pages/inbox';
import ProtectedRoute from "./components/ProtectedRoute";
import ManageReceipts from './pages/ManageReceipts';


function App() {
  return (
    <div className="App">
    <Router>
      <Routes> {/*parent container that holds all page routes*/}
          <Route path="/" element={<><Navbar/><Home/> </>} />
          <Route path="/register" element={<Register />} />
          <Route path="/log-in" element={<Login />} />
          <Route path="/contact" element={<ContactPage />} />
          
           <Route
            path="/user-dashboard"
            element={
              <ProtectedRoute role="user">
                <UserDashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/manage-receipts"
            element={
              <ProtectedRoute role="user">
                <ManageReceipts />
              </ProtectedRoute>
            }
          />
          {/*Protected admin dashboard routes */}
          <Route
            path="/admin-dashboard"
            element={
              <ProtectedRoute role="admin">
                <AdminDashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/inbox"
            element={
              <ProtectedRoute role="admin">
                <Inbox />
              </ProtectedRoute>
            }
          />
        </Routes>
      </Router>
    </div>
  );
}


export default App;