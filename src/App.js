import React, { Component } from 'react';
import {
  Routes,
  Route
} from "react-router-dom";
import Dashboard from "./screens/dashboard";
import DashboardDetails from "./screens/dashboard_details";
import Login from './screens/login';
import { ToastContainer } from 'react-toastify';
import './App.css';

class App extends Component {
  render() {  
  return (
    <div className="App" id="App" >
      <Routes>
        <Route path="/" element={<Dashboard/>} />
        <Route path="/login" element={<Login/>} />
        <Route path="/dashboard" element={<Dashboard/>} />
        <Route path="/dashboard-details" element={<DashboardDetails/>} />
      </Routes>
      <ToastContainer 
          position="bottom-center"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
      />
    </div>
 );
  }
}

export default App;
