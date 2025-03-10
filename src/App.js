import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import TalentDirectory from './pages/TalentDirectory';
import Home from './pages/Home';
import TalentCheckIn from './pages/TalentCheckIn';
import Login from './pages/Login';
import SignUp from './pages/SignUp';
import Navbar from './components/Navbar';
import EmployeeDetails from './pages/EmployeeDetails';
import { AuthProvider, useAuth } from './AuthContext';

const ProtectedRoute = ({ children, role }) => {
    const { session, loading } = useAuth();

    if (loading) return <div>Loading...</div>;

    if (!session) {
        return <Navigate to="/login" />;
    }

    if (role && session.user.role !== role) {
        return <Navigate to="/" />;
    }

    return children;
};

function App() {
    return (
        <AuthProvider>
            <Router>
                <div className="App">
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/login" element={<Login />} />
                        <Route path="/signup" element={<SignUp />} />
                        <Route path="/talent-directory" element={
                            <ProtectedRoute>
                                <Navbar />
                                <TalentDirectory />
                            </ProtectedRoute>
                        } />
                        <Route path="/talent-check-in" element={
                            <ProtectedRoute>
                                <Navbar />
                                <TalentCheckIn />
                            </ProtectedRoute>
                        } />
                        <Route path="/employee-details/:employeeId" element={
                            <ProtectedRoute>
                                <Navbar />
                                <EmployeeDetails />
                            </ProtectedRoute>
                        } />
                    </Routes>
                </div>
            </Router>
        </AuthProvider>
    );
}

export default App;
