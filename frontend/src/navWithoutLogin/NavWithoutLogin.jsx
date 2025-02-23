import React from 'react';
import { Link } from 'react-router-dom';
import './NavWithoutLogin.css';

const NavWithoutLogin = () => {
  return (
    <nav className="navbar">
      <div className="navbar-container">
        <h1 className="logo">Smart Stock</h1>
        <ul className="nav-links">
          {/* <li className="nav-item">
            <Link to="/" className="nav-link">Home</Link>
          </li> */}
          <li className="nav-item">
            <Link to="/buystock" className="nav-link">Buy Stock</Link>
          </li>
          <li className="nav-item">
            <Link to="/profile" className="nav-link">Profile</Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default NavWithoutLogin;
