import React from 'react';
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
        <Home />
        <TalentDirectory />
        <Dashboard />
        <TalentCheckIn />
        <Login />
        <InputForm />
      </main>
    </div>
  );
}

export default App;
