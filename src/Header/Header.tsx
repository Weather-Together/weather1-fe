// Header.tsx
import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { ThemeContext } from '../App/App';
import './Header.css';

const Header: React.FC = () => {
  const { theme, setTheme } = useContext(ThemeContext);

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  return (
    <header>
      <Link to="/" style={{ textDecoration: "none", color: "white" }}>
        <h1>WeatherTogether</h1>
      </Link>
      <nav>
        <Link to="/new-user" className="nav-item">New User</Link>
        <Link to="/login" className="nav-item">Login</Link>
        <button onClick={toggleTheme} className="nav-item">Toggle Theme</button>
      </nav>
    </header>
  );
};

export default Header;

