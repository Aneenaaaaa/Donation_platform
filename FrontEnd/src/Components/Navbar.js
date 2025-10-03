// src/components/Navbar.js
import React from 'react';
import { NavLink } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-title">
        <NavLink to="/" className="navbar-brand">give.do</NavLink>
      </div>
      <div className="navbar-links">
        <NavLink to="/" end>Home</NavLink>
        <NavLink to="/profile">Profile</NavLink>
        <NavLink to="/donate-campaigns">Donate</NavLink>
        <NavLink to="/donation_history">Donation History</NavLink>
      </div>
    </nav>
  );
};

export default Navbar;
