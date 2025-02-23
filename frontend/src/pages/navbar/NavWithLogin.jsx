import React from 'react'
import { Link } from 'react-router-dom'


const NavWithLogin = () => {
  return (
    <nav className="navbar">
    <div className="navbar-container">
        <h1 className="logo">Smart Stock</h1>
        <ul className="nav-links">
            <li className="nav-item">
                <Link to="/" className="nav-link">Home</Link>
            </li>
            <li className="nav-item">
                <Link to="/login" className="nav-link">Login</Link>
            </li>

           
        </ul>
    </div>
</nav>
  )
}

export default NavWithLogin
