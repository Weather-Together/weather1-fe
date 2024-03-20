import React, { useState, useEffect } from 'react';
import './DashboardCustom.css';

const DashboardCustom = () => {
  const [customGames, setCustomGames] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem('User'));

    const fetchCustomData = async () => {
      try {
        const response = await fetch(`https://powerful-sierra-25067-22c20bb81d9c.herokuapp.com/api/v0/users/${storedUser.id}/games`);
        if (!response.ok) {
          throw new Error('Failed to fetch custom games data');
        }

        const responseData = await response.json();
        setCustomGames(responseData.data);
      } catch (error) {
        setError(error.message);
      }
    };

    if (storedUser) {
      fetchCustomData();
    }
  }, []);

  return (
    <div className="custom-games-list">
    
      <div className="custom-games-container">
        {customGames.map((game, index) => (
          <div key={index} className="custom-game-container">
            <h3
                  style={{
                    margin: '2px 0px 0px 2px'
                  }}
            >{game.attributes.game_name}</h3>
            <hr
                  style={{
                    color: 'gray',
                    backgroundColor: 'gray',
                    width: '100%'
                  }}
            />
            <p>Players: {game.attributes.player_count}</p>
            <p>Rounds: {game.attributes.rounds}</p>
            {game.attributes.invitation === 'accepted' ? (
              <button className="button">Go to Game</button>
            ) : (
              <>
                <button className="button">Accept</button>
                <button className="button">Decline</button>
              </>
            )}
          </div>
        ))}
        {error && <p>{error}</p>}
      </div>
    </div>
  );
}

export default DashboardCustom;