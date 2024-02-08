import React from 'react';
import { Link } from 'react-router-dom'; 
import './Header2.css'

const Header: React.FC = () => {
  return (
    <header>
      <Link to="/" style={{ textDecoration: "none", color: "white"}}><h1>WeatherTogether</h1></Link>
      <nav>
        <Link to="/login">Logout</Link>
        <Link to="/dashboard">Dashboard</Link>
        <Link to="/profile">Profile</Link>
      </nav>
    </header>
  );
}

export default Header;