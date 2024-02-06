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
  level1: number;
  level2: number;
  level3: number;
  level4: number;
  level5: number;

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
          bestScore: data.daily_stats.date_and_score_of_best_daily_score.score,
          level1: data.daily_stats.grade_book_daily_round["0.00-500.00"],
          level2: data.daily_stats.grade_book_daily_round["500.01-1000.00"],
          level3: data.daily_stats.grade_book_daily_round["1000.01-2000.00"],
          level4: data.daily_stats.grade_book_daily_round["2000.01-5000.00"],
          level5: data.daily_stats.grade_book_daily_round["5000.01+"],
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
            <h3>User Stats</h3>
            {dailyStatsData && (
            <>
              <p>Total Games: {dailyStatsData.gameCount}</p>
              <p>Avg. Score: {dailyStatsData.avgScore || 'N/A'}</p>
              <p>Best Score: {dailyStatsData.bestScore || 'N/A'}</p> 
              <p>Date: {dailyStatsData.date}</p>
              <p>Level 5: {dailyStatsData.level5}</p>
              <p>Level 4: {dailyStatsData.level4}</p>
              <p>Level 3: {dailyStatsData.level3}</p>
              <p>Level 2: {dailyStatsData.level2}</p>
              <p>Level 1: {dailyStatsData.level1}</p>
            </>
          )}
        </div>
        <div className="competitive-stats">
        <h3>Competitive Stats</h3>
        </div>
        <div className="custom-games">
        <h3>Custom Games</h3>
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



