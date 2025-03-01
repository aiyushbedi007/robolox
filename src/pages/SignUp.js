import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../supabaseClient';
import './Login.css';

const SignUp = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!email || !password || !confirmPassword) {
            setError('Email and password are required.');
            return;
        }
        if (!/\S+@\S+\.\S+/.test(email)) {
            setError('Email is invalid.');
            return;
        }
        if (password !== confirmPassword) {
            setError('Passwords do not match.');
            return;
        }
        setError('');

        const { user, error } = await supabase.auth.signUp({
            email,
            password,
        }, {
            data: {
                role: 'manager'
            }
        });

        if (error) {
            setError(error.message);
            setSuccess('');
        } else {
            setSuccess('Sign up successful! Redirecting to talent directory...');
            setTimeout(() => {
                navigate('/talent-directory');
            }, 2000);
        }
    };

    return (
        <div className="login-container">
            <h1>Sign Up Page</h1>
            {error && <p className="error-message">{error}</p>}
            {success && <p className="success-message">{success}</p>}
            <form className="login-form" onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label>Email:</label>
                    <input 
                        type="email" 
                        value={email} 
                        onChange={(e) => setEmail(e.target.value)} 
                        className="form-control"
                    />
                </div>
                <div className="mb-3">
                    <label>Password:</label>
                    <input 
                        type="password" 
                        value={password} 
                        onChange={(e) => setPassword(e.target.value)} 
                        className="form-control"
                    />
                </div>
                <div className="mb-3">
                    <label>Confirm Password:</label>
                    <input 
                        type="password" 
                        value={confirmPassword} 
                        onChange={(e) => setConfirmPassword(e.target.value)} 
                        className="form-control"
                    />
                </div>
                <button type="submit" className="btn btn-primary">Sign Up</button>
            </form>
        </div>
    );
};

export default SignUp;
