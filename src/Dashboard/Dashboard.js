import './Dashboard.css';
import Header2 from '../Header2/Header2';
import { Link } from 'react-router-dom';
import React from 'react';

function Dashboard() {
  return (
    <div className="dashboard-container">
      <Header2 />
      <div className="dashboard-content">
        <div className="user-stats">
          <p>User Stats</p>
        </div>
        <div className="competitive-stats">
        <p>Competitive Stats</p>
        </div>
        <div className="custom-games">
        <p>Custom Games</p>
        </div>
      </div>
      <div className="links">
        <div className="link-box">
          <Link to="/weather1-fe/competitive">Competitive Game</Link>
        </div>
        <div className="link-box">
          <Link to="/weather1-fe/private">Private Game</Link>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;



