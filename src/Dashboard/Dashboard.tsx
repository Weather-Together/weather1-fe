import Header2 from '../Header2/Header2';
import { Link } from 'react-router-dom';
import React, { useState, useContext, useEffect } from 'react';
import { UserContext } from '../App/App'; 
import './Dashboard.css';




interface dailyStats {
  gameCount: number;
  avgScore: number;
  date: string;
  bestScore: number;
}

const Dashboard: React.FC = () => {
  const { user } = useContext(UserContext);
  const [dailyStatsData, setDailyStatsData] = useState<dailyStats | null>(null); // Renamed to dailyStatsData

  useEffect(() => {
    // Function to fetch the current daily round data
    const fetchRoundData = async () => {
      try {
        const response = await fetch(`https://weather-together-be.onrender.com/api/v0/users/${user.id}/daily_stats`);
        if (!response.ok) {
          throw new Error('Failed to fetch daily round data');
        }
        const data = await response.json();

        setDailyStatsData({
          gameCount: data.daily_stats.daily_game_count, 
          avgScore: data.daily_stats.average_score_in_daily_games,
          date: data.daily_stats.date_and_score_of_best_daily_score.date,
          bestScore: data.daily_stats.date_and_score_of_best_daily_score.date,
        });

        console.log("fetched data", data);

      } catch (error) {
        console.error("Error fetching round data:", error);
      }
    };

    fetchRoundData();
  }, [user.id]); // Depend on user ID so it refetches if the user changes

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



