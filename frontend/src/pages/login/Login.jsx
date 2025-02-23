import React, { useState } from 'react';
import axios from 'axios';
import './Login.css'; 
import { Link, useNavigate } from 'react-router-dom';

const Login = () => {
    const [userName, setUserName] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const navigate=useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        setError('');
        setSuccess('');

        if (!userName || !password) {
            setError('Please enter both username and password');
            return;
        }

        try {
            const response = await axios.post('/api/login', { userName, password });
            setSuccess('Login successful!');
            navigate('/navwlogin')

            console.log(response.data);
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
            <div className="login-card">
                <h2 className="login-title">Login</h2>
                <form onSubmit={handleLogin} className="space-y-4">
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
                        <label htmlFor="password" className="label">Password:</label>
                        <input
                            type="password"
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            className="input"
                        />
                        <Link className='link' to="/signup">Don't have an account?</Link>
                    </div>
                    <button
                        type="submit"
                        className="button"
                    >
                        Login
                    </button>
                </form>
                {error && <p className="error-message">{error}</p>}
                {success && <p className="success-message">{success}</p>}
            </div>
        </div>
    );
};

export default Login;