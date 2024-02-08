import React from 'react';
import { Link, useNavigate } from 'react-router-dom'; 
import './Header2.css'

const Header: React.FC = () => {
  const navigate = useNavigate()
  const handleLogout = () => {
    localStorage.removeItem('User');
    navigate('../login')
  }
  return (
    <header>
      <Link to="/" style={{ textDecoration: "none", color: "white"}}><h1>WeatherTogether</h1></Link>
      <nav>
        <button onClick={handleLogout}>Logout</button>
        <Link to="/dashboard">Dashboard</Link>
        <Link to="/profile">Profile</Link>
      </nav>
    </header>
  );
}

export default Header;