import React, { useState } from 'react';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import Map from '../Map/Map';
import './DailyGame.css';

interface RoundData {
  maxtemp: number;
  avghumidity: number;
  // other fields as necessary
}

interface ILocation {
  lat: number;
  lng: number;
}

const mockDailyRoundData: RoundData = {
  maxtemp: 19.4,
  avghumidity: 95,
  // other necessary weather data fields
};

const DailyGame: React.FC = () => {
  const [location, setLocation] = useState<ILocation | null>(null);
  const [score, setScore] = useState<number | null>(null);

  const handleSubmit = () => {
    if (location) {
      console.log("Submitting location:", location);
      setScore(1082); // Mock score for demonstration
    } else {
      window.alert("Please select a location on the map.");
    }
  };

  return (
    <div>
      
      <div className="daily-game">
        <div className="map-container">
          <Map onLocationSelect={setLocation} />
        </div>
        <div className="details-container">
          <div className="weather-data-container">
            <h2>Today's Weather Challenge</h2>
            <p>Max Temp: {mockDailyRoundData.maxtemp} °C</p>
            <p>Humidity: {mockDailyRoundData.avghumidity}%</p>
          </div>
          {location && (
            <div className="location-display">
              <p>Latitude: {location.lat.toFixed(2)}</p>
              <p>Longitude: {location.lng.toFixed(2)}</p>
            </div>
          )}
          <button onClick={handleSubmit} className="submit-button">Submit Guess</button>
          {score !== null && (
            <div className="score-display">
              <p>Your score: {score}</p>
            </div>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default DailyGame;




