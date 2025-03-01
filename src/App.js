import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
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
          <Switch>
            <Route path="/" exact component={Home} />
            <Route path="/talent-directory" component={TalentDirectory} />
            <Route path="/dashboard" component={Dashboard} />
            <Route path="/talent-check-in" component={TalentCheckIn} />
            <Route path="/login" component={Login} />
            <Route path="/input-form" component={InputForm} />
          </Switch>
        </main>
      </div>
    </Router>
  );
}

export default App;
