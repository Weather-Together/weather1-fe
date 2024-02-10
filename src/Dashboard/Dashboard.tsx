import Header2 from '../Header2/Header2';
import { Link, useNavigate } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
// import { UserContext } from '../App/App'; 
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

interface competitiveStats {
  top5username: string;
  top5score: string;
  userRank: number;
  gameCount: number;
  avgCompScore: number;
}


interface custom {
  game: any;
}


const Dashboard: React.FC = () => {
  // const [user, setUser] = useState<User | null>(null)
  const [customGames, setCustomGames] = useState<custom | null>(null);
  const [dailyStatsData, setDailyStatsData] = useState<dailyStats | null>(null);
  const [competitiveData, setCompetitiveData] = useState<competitiveStats | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const navigate = useNavigate();
  const [invitationStatus, setInvitationStatus] = useState<string | null>(null); // Invitation status of the current user


  useEffect(() => {
    if(!localStorage.getItem('User')){
      return navigate('../login')
    }
    const storedUser = JSON.parse(localStorage.getItem('User'))
  
    const fetchRoundData = async () => {
      try {
        const response = await fetch(`https://weather-together-be.onrender.com/api/v0/users/${storedUser.id}/daily_stats`);
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

      } catch(error) {
        setError(error.message);
      }
    };

    const fetchCustomData = async () => {
      console.log("Fetching custom data...");
      try {
        const response = await fetch(`https://weather-together-be.onrender.com/api/v0/users/${storedUser.id}/games`);
        if (!response.ok) {
          throw new Error('Failed to fetch daily round data');
        }
        const responseData = await response.json();
  
    
        // Extract game names from each game object
        const gameNames = responseData.data.map((game: any) => game.attributes);
        console.log(gameNames.game_name, "Game Names") 
        console.log(gameNames) 
        console.log(gameNames.game_id, "344") 
        console.log(gameNames.invitation, "sent")
        const game = gameNames.map((game: any) => {
          return{names: game.game_name,
                  game_id: game.game_id,
                  invitations: game.invitation}
        })



        setCustomGames({
          game: game
        });
    
        console.log("fetched custom data", responseData.data);
    
      } catch(error) {
        setError(error.message);
      }
    };
    


    const fetchCompetitiveData = async () => {
      try {
        const response = await fetch(`https://weather-together-be.onrender.com/api/v0/users/${storedUser.id}/competitive_stats`);
        if (!response.ok) {
          throw new Error('Failed to fetch competitive stats data');
        }
        const data = await response.json();


        //format the scores in an array
        const top5scores = data.competitive_stats.top_5_competitive_users
          .map(user => user.score.toFixed(2))
          .join(", ");

          //an array of usernames
        const top5usernames = data.competitive_stats.top_5_competitive_users
          .map(user => user.username)
          .join(", ");

        setCompetitiveData({
          top5username: top5usernames,
          top5score: top5scores,
          userRank: data.competitive_stats.user_competitive_rank,
          gameCount: data.competitive_stats.competitive_game_count,
          avgCompScore: data.competitive_stats.average_score_in_competitive_games.toFixed(2),
        });

        console.log("fetched competitive stats data", data);
        setIsLoading(false)
      } catch (error) {
        setError(error.message)
      }
    };
    fetchRoundData();
    fetchCustomData();
    fetchCompetitiveData();
  }, [navigate]);

  // const handleAcceptInvitation = async () => {
  //   try {
  //     const response = await fetch(`https://weather-together-be.onrender.com/api/v0/users/${id}/games/${game_id}`, {
  //       method: 'PATCH',
  //       headers: {
  //         'Content-Type': 'application/json',
  //         'Accept': 'application/json'
  //       },
  //       body: JSON.stringify({ invitation_status: 'accepted' })
  //     });
  //     if (!response.ok) { throw new Error('Failed to accept invitation.'); }
  //     setInvitationStatus('accepted'); // Update invitation status in state
  //     console.log('Invitation accepted successfully.');
  //   } catch (error) {
  //     console.error('Error accepting invitation:', error);
  //   }
  // };
  return (
    <div className="dashboard-container">
      <Header2 />
      {isLoading ? (
       <p>Loading...</p>
      ) : (

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
          {competitiveData && (
            <>
              <ul style={{ listStyle: 'none', padding: 0 }}>
                {competitiveData.top5username.split(", ").reverse().map((username, index) => (
                  <li key={index} style={{ marginBottom: '5px' }}>
                    {username} - {competitiveData.top5score.split(", ").reverse()[index]}
                  </li>
                ))}
              </ul>
              <p>User Competitive Rank: {competitiveData.userRank}</p>
              <p>Competitive Game Count: {competitiveData.gameCount}</p>
              <p>Average Score in Competitive Games: {competitiveData.avgCompScore}</p>
            </>
          )}
        </div>
        <div className="custom-games">
        <h3>Custom Games</h3>
        {customGames && customGames.game.length > 0 ? (
        <ul className="game-list">
         {customGames.game.map((name, index) => (
        <li key={index}>{name.names}</li>
        // { name.invitation === 'sent' && (
        //      <button onClick={handleAcceptInvitation}>Accept Invitation</button>
        //    )}
            ))}
      </ul>
      ) : (
       <p>No Games</p>
      )}
      </div>
      </div>
      )}
      <div className="links">
        <div className="link-box">
          <Link to="/competitive">Competitive Game</Link>
        </div>
        <div className="link-box">
          <Link to="/new-private-game">New Private Game</Link>
        </div>
      </div>
      {error && <h2>Something happened with getting all of the data.</h2> }
    </div>
  );
}

export default Dashboard;

