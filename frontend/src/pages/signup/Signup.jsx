import React, { useState } from 'react';
import axios from 'axios';
import './Signup.css'; 
import { useNavigate } from 'react-router-dom';

const Signup = () => {
    const [fullName, setFullName] = useState('');
    const [userName, setUserName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const navigate=useNavigate();

    const handleSignup = async (e) => {
        e.preventDefault();
        setError('');
        setSuccess('');

        if (!fullName || !userName || !email || !password || !confirmPassword) {
            setError('Please enter all fields');
            return;
        }

        if (password !== confirmPassword) {
            setError('Passwords do not match');
            return;
        }

        try {
            const response = await axios.post('/api/signup', {
                fullName,
                userName,
                email,
                password,
                confirmPassword,
            });
            setSuccess('Signup successful! You can now log in.');
            console.log(response.data);
            navigate('/login')
        } catch (err) {
            if (err.response) {
                setError(err.response.data.message);
            } else {
                setError('Internal server error');
            }
        }
    };

    return (
        <div className="container">
            <div className="signup-card">
                <h2 className="signup-title">Sign Up</h2>
                <form onSubmit={handleSignup} className="space-y-4">
                    <div className="form-group">
                        <label htmlFor="fullName" className="label">Full Name:</label>
                        <input
                            type="text"
                            id="fullName"
                            value={fullName}
                            onChange={(e) => setFullName(e.target.value)}
                            required
                            className="input"
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="userName" className="label">Username:</label>
                        <input
                            type="text"
                            id="userName"
                            value={userName}
                            onChange={(e) => setUserName(e.target.value)}
                            required
                            className="input"
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="email" className="label">Email:</label>
                        <input
                            type="email"
                            id="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            className="input"
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="password" className="label">Password:</label>
                        <input
                            type="password"
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            className="input"
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="confirmPassword" className="label">Confirm Password:</label>
                        <input
                            type="password"
                            id="confirmPassword"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            required
                            className="input"
                        />
                    </div>
                    <button
                        type="submit"
                        className="button"
                    >
                        Sign Up
                    </button>
                </form>
                {error && <p className="error-message">{error}</p>}
                {success && <p className="success-message">{success}</p>}
            </div>
        </div>
    );
};

export default Signup;