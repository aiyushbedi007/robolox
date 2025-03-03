import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../AuthContext';
import { supabase } from '../supabaseClient';

const Navbar = () => {
    const { session } = useAuth();

    const handleLogout = async () => {
        const { error } = await supabase.auth.signOut();
        if (error) {
            console.error('Logout error:', error.message);
        }
    };

    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <div className="container-fluid">
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav me-auto">
                        {session ? (
                            <>
                                <li className="nav-item">
                                    <Link className="nav-link" to="/talent-directory">Talent Directory</Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link" to="/talent-check-in">Talent Check-In</Link>
                                </li>
                            </>
                        ) : (
                            <>
                                <li className="nav-item">
                                    <Link className="nav-link" to="/login">Login</Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link" to="/signup">Sign Up</Link>
                                </li>
                            </>
                        )}
                    </ul>
                    {session && (
                        <button className="btn btn-outline-danger" onClick={handleLogout}>Logout</button>
                    )}
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
