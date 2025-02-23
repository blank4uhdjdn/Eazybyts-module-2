import React from 'react';
import './Navbar.css'; // Import the CSS file for styling
import { Link } from 'react-router-dom';

const Navbar = () => {
    return (
        <nav className="navbar">
            <div className="navbar-container">
                <h1 className="logo">Smart Stock</h1>
                <ul className="nav-links">
                    <li className="nav-item">
                        <Link to="/" className="nav-link">Home</Link>
                    </li>
                    {/* <li className="nav-item">
                        <Link to="/login" className="nav-link">Login</Link>
                    </li> */}
                    {/* <li className="nav-item">
                        <Link to="/buystock" className="nav-link">Buy Stock</Link>
                    </li>
                    <li className="nav-item">
                        <Link to="/profile" className="nav-link">Profile</Link>
                    </li> */}
                   
                </ul>
            </div>
        </nav>
    );
};

export default Navbar;