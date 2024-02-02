import React from 'react';
import { Link } from 'react-router-dom'; 
import './Header.css'

function Header() {
  return (
    <header>
      <h1>WeatherTogether</h1>
      <nav>
        <Link to="/new-user">New User</Link>
        <Link to="/login">Login</Link>
      </nav>
    </header>
  );
}

export default Header;