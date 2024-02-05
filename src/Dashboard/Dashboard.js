import './Dashboard.css';
import Header2 from '../Header2/Header2';
import { Link } from 'react-router-dom'; 
import React from 'react';

function Dashboard() {
    return (
        <div className="dashboard-container">
            <Header2 />
            <div className="dashboard-content">
                <div className="hello-wrapper"> 
                    Hello
                    <nav>
                        <Link to="/weather1-fe/competative">Competitive Game</Link>
                        <Link to="/weather1-fe/private">Private Game</Link>
                    </nav>
                </div>
            </div>
        </div>    
    );
}

export default Dashboard;



