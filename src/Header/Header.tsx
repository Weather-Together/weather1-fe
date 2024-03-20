// Header.tsx
import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { ThemeContext } from '../App/App';
import './Header.css';
import logo from '../Images/logo_480.png';

const Header: React.FC = () => {
  const { theme, setTheme } = useContext(ThemeContext);

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  return (
    <header>
      <Link to="/" style={{ textDecoration: "none", color: "white" }}>
        <div className="grid-title">
          <div><img src={logo} alt="logo" width="30" height="30" /></div>
          <div><h1>WeatherTogether</h1></div>
        </div>
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

