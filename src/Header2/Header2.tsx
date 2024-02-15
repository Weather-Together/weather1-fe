import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom'; 
import { ThemeContext } from '../App/App'; // Adjust the import path based on your file structure
import './Header2.css';

const Header2: React.FC = () => {
  const navigate = useNavigate();
  const { theme, setTheme } = useContext(ThemeContext); // Destructure theme and setTheme from the context

  const handleLogout = () => {
    localStorage.removeItem('User');
    navigate('../login');
  };

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light'); // Toggle theme
  };

  return (
  <header>
    <Link to="/" className="header-title" style={{ textDecoration: "none", color: "white" }}>
    <h1>WeatherTogether</h1>
    </Link>
    <div className="nav-container">
    <Link to="/dashboard" className="nav-link">Dashboard</Link>
    <Link to="/profile" className="nav-link">Profile</Link>
    <button onClick={handleLogout} className="header-button">Logout</button>
    <button onClick={toggleTheme} className="header-button">Toggle Theme</button>
    </div>
  </header>

  );
}

export default Header2;
