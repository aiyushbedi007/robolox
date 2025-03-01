import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import logo from './logo.svg';
import './App.css';
import TalentDirectory from './components/TalentDirectory';
import EmployeeCard from './components/EmployeeCard';
import InputForm from './components/InputForm';
import Home from './pages/Home';
import Dashboard from './pages/Dashboard';
import TalentCheckIn from './pages/TalentCheckIn';
import Login from './pages/Login';

function App() {
  return (
    <Router>
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Edit <code>src/App.js</code> and save to reload.
          </p>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>
        </header>
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/talent-directory" element={<TalentDirectory />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/talent-check-in" element={<TalentCheckIn />} />
            <Route path="/login" element={<Login />} />
            <Route path="/input-form" element={<InputForm />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
