import React from 'react';
import { Link } from 'react-router-dom'; 
import './Header2.css'

const Header: React.FC = () => {
  return (
    <header>
      <Link to="/weather1-fe" style={{ textDecoration: "none", color: "white"}}><h1>WeatherTogether</h1></Link>
      <nav>
        <Link to="/weather1-fe/login">Logout</Link>
        <Link to="/weather1-fe/dashboard">Dashboard</Link>
        <Link to="/weather1-fe/profile">Profile</Link>
      </nav>
    </header>
  );
}

export default Header;