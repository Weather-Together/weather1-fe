import React from 'react';
import { Link } from 'react-router-dom'; 
import './Header.css'

function Header() {
  return (
    <header>
      <h1>WeatherTogether</h1>
      <nav>
        <Link to="/new-user">New User</Link>
        <Link to="/weather1-fe/login">Login</Link>
      </nav>
    </header>
  );
}

export default Header;