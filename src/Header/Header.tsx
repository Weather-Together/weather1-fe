// Header.js
import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { ThemeContext } from '../App/App'; // Adjust the import path based on your file structure
import './Header.css';

const Header: React.FC = () => {
  const { theme, setTheme } = useContext(ThemeContext); // Destructure theme and setTheme from the context

  const toggleTheme = () => {
    console.log("Current theme:", theme); // Before toggling
    setTheme(theme === 'light' ? 'dark' : 'light');
    console.log("New theme:", theme === 'light' ? 'dark' : 'light'); // Expected new theme
};


  return (
    <header>
        <Link to="/" style={{ textDecoration: "none", color: "white"}}><h1>WeatherTogether</h1></Link>
        <div className="nav-container">
          <Link to="/new-user" className="nav-item">New User</Link>
          <Link to="/login" className="nav-item">Login</Link>
          <button onClick={toggleTheme} className="nav-item">Toggle Theme</button>
        </div> 
    </header>
  );
}

export default Header;
