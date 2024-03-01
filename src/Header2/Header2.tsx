import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ThemeContext } from "../App/App"; // Adjust the import path based on your file structure
import "./Header2.css";
import logo from '../Images/logo_480.png';

const Header2: React.FC = () => {
  const navigate = useNavigate();
  const { theme, setTheme } = useContext(ThemeContext); // Destructure theme and setTheme from the context

  const handleLogout = () => {
    localStorage.clear();
    navigate("../login");
  };
  const storedUser = JSON.parse(localStorage.getItem("User") || "{}");
  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light"); // Toggle theme
  };


  return (
    <header>
      <Link
        to="/"
        className="header-title"
        style={{ textDecoration: "none", color: "white" }}
      >
        <div className="grid-title">
          <div><img src={logo} alt="logo" width="30" height="30" /></div>
          <div><h1>WeatherTogether</h1></div>
        </div>
      </Link>
      <div className="nav-container">
        <Link to="/dashboard" className="nav-item">
          Dashboard
        </Link>
        <Link to="/profile" className="nav-item">
          Profile
        </Link>
        <button onClick={handleLogout} className="nav-item">
          Logout
        </button>
        <button onClick={toggleTheme} className="nav-item">
          Toggle Theme
        </button>
      </div>
    </header>
  );
};

export default Header2;
