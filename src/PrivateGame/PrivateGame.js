import React, { useState, useEffect } from 'react';
import Map from '../Map/Map';
import './PrivateGame.css';
import Header2 from '../Header2/Header2';
import { useParams } from 'react-router-dom';

function PrivateGame() {
  const { id, game_id } = useParams();
  const [location, setLocation] = useState(null);
  const [roundData, setRoundData] = useState(null); // Store game data from API
  const [score, setScore] = useState(null);

  useEffect(() => {
    // Function to fetch the current private game data
    const storedUser = JSON.parse(localStorage.getItem('User'))

    const fetchRoundData = async () => {
      try {
        const response = await fetch(`https://weather-together-be.onrender.com/api/v0/users/${storedUser.id}/games/${game_id}/current_round`);
        if (!response.ok) {
          throw new Error('Failed to fetch private round data');
        }
        const data = await response.json();
        setRoundData({
          maxtemp: data.data.attributes.maxtemp_f,
          mintemp: data.data.attributes.mintemp_f,
          maxwind: data.data.attributes.maxwind_mph,
          avghumidity: data.data.attributes.avghumidity,
          totalprecip: data.data.attributes.totalprecip_in,
        });

        console.log('fetched data', data);
      } catch (error) {
        console.error('Error fetching round data:', error);
      }
    };

    fetchRoundData();
  }, [game_id]); // Depend on user ID so it refetches if the user changes

  const handleSubmit = async () => {
    if (location) {
      try {
        const response = await fetch(`https://weather-together-be.onrender.com/api/v0/users/${id}/games/${game_id}/vote`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json', 
          },
          body: JSON.stringify({
            lat: location.lat,
            lon: location.lng
          }),
        });

        if (!response.ok) {
          throw new Error('Failed to submit guess');
        }
        const result = await response.json();
        setScore(result.data.attributes.score); // Assuming the score is in this path
      } catch (error) {
        console.error('Error submitting guess:', error);
      }
    } else {
      window.alert('Please select a location on the map.');
    }
  };

  return (
    <div>
      <Header2 />
      <div className="private-game">
        <div className="map-container">
          <Map onLocationSelect={setLocation} />
        </div>
        <div className="details-container">
          {roundData ? (
            <div className="weather-data-container">
              <h2>Today's Weather Challenge</h2>
              <p>Max Temp: {roundData.maxtemp} °F</p>
              <p>Min Temp: {roundData.mintemp} °F</p>
              <p>Max Wind: {roundData.maxwind} MPH</p>
              <p>Avg. Humidity: {roundData.avghumidity}%</p>
              <p>Total Precip: {roundData.totalprecip} in</p>
            </div>
          ) : (
            <p>Loading weather data...</p>
          )}
          {location && (
            <div className="location-display">
              <p>Latitude: {location.lat.toFixed(2)}</p>
              <p>Longitude: {location.lng.toFixed(2)}</p>
            </div>
          )}
          <button onClick={handleSubmit} className="submit-button">
            Submit Guess
          </button>
          {score !== null && (
            <div className="score-display">
              <p>Your score: {score.toFixed(2)}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PrivateGame;