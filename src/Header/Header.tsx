import React from 'react';
import { Link } from 'react-router-dom'; 
import './Header.css'

const Header: React.FC = () => {
  return (
    <header>
      <Link to="/weather1-fe" style={{ textDecoration: "none", color: "white"}}><h1>WeatherTogether</h1></Link>
      <nav>
        <Link to="/weather1-fe/new-user">New User</Link>
        <Link to="/weather1-fe/login">Login</Link>
      </nav>
    </header>
  );
}

export default Header;