import React from 'react';
import { Link } from 'react-router-dom'; 
import './Header.css'

const Header: React.FC = () => {
  return (
    <header>
      <Link to="/" style={{ textDecoration: "none", color: "white"}}><h1>WeatherTogether</h1></Link>
      <nav>
        <Link to="/new-user">New User</Link>
        <Link to="/login">Login</Link>
      </nav>
    </header>
  );
}

export default Header;