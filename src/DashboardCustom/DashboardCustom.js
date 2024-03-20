import React, { useState, useEffect } from 'react';
import './DashboardCustom.css';
import { useNavigate } from "react-router-dom";

const DashboardCustom = () => {
  const [customGames, setCustomGames] = useState([]);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

const toGame = (game) => {
  const storedUser = JSON.parse(localStorage.getItem('User'));
  navigate(`/private-game-view/${storedUser.id}/${game}`)
}

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

  const acceptInvite = async (game) => {
    const user = JSON.parse(localStorage.getItem('User'));

    try {
      const response = await fetch(`https://powerful-sierra-25067-22c20bb81d9c.herokuapp.com/api/v0/users/${user.id}/games/${game}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify({ "rsvp": "accept" }),
    })
      if (!response.ok) {
        throw new Error('Failed to accept invite');
      }

      const data = await response.json();
      console.log('fetched data', data.data);
      navigate('../dashboard')
    }
    catch(error) {
        // Handle errors
        console.error('Error accepting invite:', error);
      };
  };

  const declineInvite = async (game) => {
    const user = JSON.parse(localStorage.getItem('User'));

    try {
      const response = await fetch(`https://powerful-sierra-25067-22c20bb81d9c.herokuapp.com/api/v0/users/${user.id}/games/${game}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify({ "rsvp": "decline" }),
    })
      if (!response.ok) {
        throw new Error('Failed to decline invite');
      }

      const data = await response.json();
      console.log('fetched data', data.data);
      navigate('../dashboard')
    }
    catch(error) {
        // Handle errors
        console.error('Error declining invite:', error);
      };
  };

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
            {(game.attributes.invitation === 'accepted' || game.attributes.invitation === 'admin') ? (
              <button onClick={() =>(toGame(game.attributes.id))} className="button">Go to Game</button>
            ) : (
              <>
                <button onClick={() =>(acceptInvite(game.attributes.game_id))} className="button">Accept</button>
                <button onClick={() =>(declineInvite(game.attributes.game_id))} className="button">Decline</button>
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