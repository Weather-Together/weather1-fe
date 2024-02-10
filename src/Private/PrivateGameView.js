import React, { useState, useEffect } from 'react';
import './PrivateGameView.css';
import Header2 from '../Header2/Header2';
import { useParams, Link } from 'react-router-dom';

const PrivateGameView = () => {
    const [inviteEmail, setInviteEmail] = useState(''); // Invite email
    const { id, game_id } = useParams();
    const [gameData, setGameData] = useState(null);


    useEffect(() => {
        const handleSendInvite = async () => {
            try {
                const response = await fetch(`https://weather-together-be.onrender.com/api/v0/users/${id}/games/${game_id}`)

                if (!response.ok) { throw new Error("Failed to fetch data") }
                const data = await response.json()

                setGameData(data.data)

                console.log(data)
            }
            catch (error) {
                console.log(error)
            }
        }
        handleSendInvite()
    }, [game_id, id])

    // Function to send invite
    const handleSendInvite = async () => {
        try {
            const newInvites = {
                invitees: [inviteEmail]
            };
            const response = await fetch(`https://weather-together-be.onrender.com/api/v0/users/${id}/games/${game_id}/invite`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify(newInvites)
            });
            if (response.ok) {
                window.alert('Invite sent successfully.');
                setInviteEmail(''); // Clear the invite email field after sending invite
            } else {
                throw new Error('Failed to send invite.');
            }
        } catch (error) {
            console.error('Error sending invite:', error);
        }
    };


    return (
        <div className="private-game-view-container">
            <Header2 />
            <div className="private-game-view-content">
                <div className="details-container private-content">
                    <div className="participants-section">
                        <h2>Participants</h2>
                        <ul>
                            {gameData ? gameData.attributes.users.map((participant, index) => (
                                <li key={index}>{participant.attributes.username}</li>
                            )) : null}
                        </ul>
                    </div>
                    <div className="standings-section">
                        <h2>Standings</h2>
                    </div>
                    <div className="game-length-section">
                        <p>Game Length: {gameData ? gameData.attributes.length_in_days : null} days</p>
                    </div>
                    <div className="invite-section">
                        <h2>Invite Others</h2>
                        <input
                            type="email"
                            placeholder="Enter email"
                            value={inviteEmail}
                            onChange={(e) => setInviteEmail(e.target.value)}
                        />
                        <button onClick={handleSendInvite}>Send Invite</button>
                        
                    </div>
                    <div className="current-round-section">
                        <Link to={`/private-game/${id}/${game_id}`}>
                            <button>Go to Current Round</button>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PrivateGameView;
