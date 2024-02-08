import React, { useState } from "react";
import './CreatePrivateGame.css';
import Header2 from '../Header2/Header2';
import { useNavigate } from 'react-router-dom';


const CreatePrivateGame = () => {
  const navigate = useNavigate();
  const [gameDetails, setGameDetails] = useState({
    name: '',
    lengthInDays: 0,
    guessLeadTime: 0,
    playerCap: 30,
    invitees: [],
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setGameDetails((prevDetails) => ({ ...prevDetails, [name]: value }));
  };

  const handleInviteeChange = (e) => {
    const invitees = e.target.value.split(',').map((email) => email.trim());
    setGameDetails((prevDetails) => ({ ...prevDetails, invitees }));
  };

  const handleSubmit = async () => {
    const user = JSON.parse(localStorage.getItem('User'));
    const newGame = {
      name: gameDetails.name,
      length_in_days: parseInt(gameDetails.lengthInDays),
      guess_lead_time: parseInt(gameDetails.guessLeadTime),
      player_cap: gameDetails.playerCap,
      invitees: gameDetails.invitees,
    };

    try {
      const response = await fetch(`http://https://weather-together-be.onrender.com/api/v0/users/${user.id}/games`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify(newGame),
    })
      if (!response.ok) {
        throw new Error('Failed to fetch daily round data');
      }
      const data = await response.json();
      console.log('fetched data', data);
    }
    catch(error) {
        // Handle errors
        console.error('Error creating game:', error);
      };
  };

  return (
    <div className="create-private-game-container">
      <Header2 />
        <div className="create-private-game">
          <h2>Create a Private Game</h2>
          <label>
            Game Name:
            <input type="text" name="name" onChange={handleChange} />
          </label>
          <br />
          <label>
            Length in Days:
            <input type="number" name="lengthInDays" onChange={handleChange} />
          </label>
          <br />
          <label>
            Guess Lead Time (Days):
            <input type="number" name="guessLeadTime" onChange={handleChange} />
          </label>
          <br />
          <label>
            Invitees (comma-separated emails):
            <input type="text" name="invitees" onChange={handleInviteeChange} />
          </label>
          <br />
        <button onClick={handleSubmit}>Create Game</button>
          </div>
        
      </div>
  );
};

export default CreatePrivateGame;
