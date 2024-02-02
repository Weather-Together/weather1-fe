import React, { useState } from 'react';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import Map from '../Map/Map';
import './DailyGame.css';

const mockDailyRoundData = {
    weather_data: {
        maxtemp: 19.4,
        avghumidity: 95,
        // other necessary weather data fields
    },
};

function DailyGame() {
    const [location, setLocation] = useState(null);
    const [roundData, setRoundData] = useState(mockDailyRoundData);
    const [score, setScore] = useState(null);

    const handleSubmit = () => {
        if (location) {
            console.log("Submitting location:", location);
            setScore(1082.19); // Mock score for demonstration
        } else {
            alert("Please select a location on the map.");
        }
    };

    return (
        <div>
        <Header />
        <div className="daily-game">
            
            <div className="map-container">
                <Map onLocationSelect={setLocation} />
            </div>
            <div className="details-container">
                <div className="weather-data-container">
                    <h2>Today's Weather Challenge</h2>
                    <p>Max Temp: {roundData.weather_data.maxtemp} °C</p>
                    <p>Humidity: {roundData.weather_data.avghumidity}%</p>
                    {/* Display additional weather data as needed */}
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
        <Footer/>
    </div>
    );
}

export default DailyGame;



