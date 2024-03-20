import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import './CreatePrivateGame.css';
import Header2 from '../Header2/Header2';
import { Player } from '@lottiefiles/react-lottie-player'; // Import the Lottie Player

interface GameDetails {
  name: string;
  lengthInDays: number;
  guessLeadTime: number;
  playerCap: number;
  invitees: string[];
}

const CreatePrivateGame: React.FC = () => {
  const navigate = useNavigate();

  useEffect(() => {
    if (!localStorage.getItem('User')) {
      return navigate('../login')
    }
  }, [navigate]);

  const [gameDetails, setGameDetails] = useState<GameDetails>({
    name: '',
    lengthInDays: 0,
    guessLeadTime: 0,
    playerCap: 30,
    invitees: [],
  });

  const [currentInvitee, setCurrentInvitee] = useState<string>('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setGameDetails((prevDetails) => ({ ...prevDetails, [name]: value }));
  };

  const handleInviteeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCurrentInvitee(e.target.value);
  };

  const handleAddInvitee = () => {
    if (currentInvitee.trim() !== '') {
      const newInvitee = currentInvitee.trim();
      setGameDetails((prevDetails) => ({
        ...prevDetails,
        invitees: [...prevDetails.invitees, newInvitee],
      }));
      setCurrentInvitee('');
    }
  };

  const handleRemoveInvitee = (index: number) => {
    setGameDetails(prevDetails => ({
      ...prevDetails,
      invitees: prevDetails.invitees.filter((_, i) => i !== index)
    }));
  };

  const handleSubmit = async () => {
    const user = JSON.parse(localStorage.getItem('User') || '{}');
    const newGame = {
      name: gameDetails.name,
      length_in_days: parseInt(gameDetails.lengthInDays.toString()),
      guess_lead_time: parseInt(gameDetails.guessLeadTime.toString()),
      player_cap: gameDetails.playerCap,
      invitees: [gameDetails.invitees.join(', ')]
    };

    try {
      const response = await fetch(`https://powerful-sierra-25067-22c20bb81d9c.herokuapp.com/api/v0/users/${user.id}/games`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify(newGame),
      });
      if (!response.ok) {
        throw new Error('Failed to fetch private round data');
      }
      const data = await response.json();
      navigate(`../private-game-view/${user.id}/${data.data.id}`);
      console.log('fetched data', data.data);
    }
    catch (error) {
      console.error('Error creating game:', error);
    }
  };

  return (
    <div className="create-private-game-container">
      <Header2 />

      <Player
        src='https://lottie.host/f35fa82a-0091-4ee8-ad6d-77e329ed464a/KqOVOsmCeH.json'
        className="player"
        loop={true}
        autoplay={true}
      />

<div className="create-private-game">
  <h2>Create a Private Game</h2>
  <hr />
  <div className="form-fields">
    <label>
      <input type="text" name="name" onChange={handleChange} />
      <span>Game Name:</span>
    </label>
    <label>
      <input type="number" name="lengthInDays" onChange={handleChange} />
      <span>Length in Days:</span>
    </label>
    <label>
      <input type="number" name="guessLeadTime" onChange={handleChange} />
      <span>Guess Lead Time (Days):</span>
    </label>
    <hr />
    <label>
      Add user by email:
      <input type="text" value={currentInvitee} onChange={handleInviteeChange} />
      <button onClick={handleAddInvitee}>Add</button>
    </label>
    <div>
      <h3>Invitees:</h3>
      <ul>
        {gameDetails.invitees.map((invitee, index) => (
          <li key={index}>
            {invitee}
            <button className="remove-button" onClick={() => handleRemoveInvitee(index)}>Remove</button>
          </li>
        ))}
      </ul>
    </div>
  </div>
  <hr />
  <button onClick={handleSubmit} style={{ width: 'fit-content', margin: '10px auto' }}>Create Game</button>
</div>


      <Player
        src='https://lottie.host/22de9b27-ab62-4b4f-b76f-0d0bfa2af678/wV6oqOj6AX.json'
        className="player"
        loop={true}
        autoplay={true}
      />
    </div>
  );
};

export default CreatePrivateGame;
