import React, { useState, useEffect } from 'react';
import Map from '../Map/Map';
import { useNavigate } from 'react-router-dom';
import './DailyGame.css';
import Header2 from '../Header2/Header2';

interface RoundData {
  maxtemp: number;
  mintemp: number;
  maxwind: number;
  avghumidity: number;
  totalprecip: number
  
}

interface ILocation {
  lat: number;
  lng: number;
}

interface User {
  id: string;
  type: string;
  attributes: {
    email: string;
    username: string;
  };
}

const DailyGame: React.FC = () => {
  const [user, setUser] = useState<User | null>(null)
  const [location, setLocation] = useState<ILocation | null>(null);
  const [roundData, setRoundData] = useState<RoundData | null>(null); // Store round data from API
  const [roundLocation, setRoundLocation] = useState<{location_name: string, country: string} | null>(null)
  const [score, setScore] = useState<number | null>(null);
  const [guessLocation, setGuessLocation] = useState<{location_name: string, country: string} | null>(null)
  const [markers, setMarkers] = useState<{ lat: number; lng: number }[]>([]); 
  const navigate = useNavigate();

// Define the function to handle location selection
  const handleLocationSelect = (selectedLocation: ILocation) => {
    setLocation(selectedLocation);
  };

  useEffect(() => {
    // Function to fetch the current daily round data
    if(!localStorage.getItem('User')){
      return navigate('../login')
    }
    const storedUser = JSON.parse(localStorage.getItem('User'))
    if(storedUser) {setUser(storedUser)};
    const fetchRoundData = async () => {
      try {
        const response = await fetch(`https://weather-together-be.onrender.com/api/v0/users/${storedUser.id}/rounds/current_daily_round`);
        if (!response.ok) {
          throw new Error('Failed to fetch daily round data');
        }
        const data = await response.json();

        setRoundData({
          maxtemp: data.data.attributes.maxtemp_f, 
          mintemp: data.data.attributes.mintemp_f,
          maxwind: data.data.attributes.maxwind_mph,
          avghumidity: data.data.attributes.avghumidity,
          totalprecip: data.data.attributes.totalprecip_in
        });
        setRoundLocation({
          location_name: data.data.attributes.location_name,
          country: data.data.attributes.country
        })

        console.log("fetched data", data)
      } catch (error) {
        console.error("Error fetching round data:", error);
      }
    };

    fetchRoundData();
  }, [navigate]); // Depend on user ID so it refetches if the user changes

  const handleSubmit = async () => {
    if (location) {
      try {
        const response = await fetch(`https://weather-together-be.onrender.com/api/v0/users/${user.id}/rounds/current_daily_round/vote`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            lat: location.lat,
            lon: location.lng,
          }),
        });

        if (!response.ok) {
          throw new Error('Failed to submit guess');
        }
        const result = await response.json();
        setScore(result.data.attributes.score); 
        console.log("score", result.data.attributes)
        setGuessLocation({
          location_name: result.data.attributes.location_name,
          country:result.data.attributes.country})// Assuming the score is in this path

          // Update markers state with guess location
      setMarkers(prevMarkers => [...prevMarkers, { lat: result.data.attributes.lat, lng: result.data.attributes.lon }]);

      } catch (error) {
        console.error("Error submitting guess:", error);
      }
    } else {
      window.alert("Please select a location on the map.");
    }
  };

  return (
    <div>
      <Header2 />
      <div className="daily-game">
        <div className="map-container">
          <Map onLocationSelect={handleLocationSelect} markers={markers} />
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
          <button onClick={handleSubmit} className="submit-button">Submit Guess</button>
          {score !== null && (
            <div className="score-display">
              <p>Your score: {score.toFixed(2)}</p>
              {guessLocation && ( 
            <>
            <h3>Your Guess</h3>
            <p>City: {guessLocation.location_name}</p>
            <p>Country: {guessLocation.country}</p>
            </>
            )}
            {roundLocation && ( 
            <>
            <h3>Actual Location</h3>
            <p>City: {roundLocation.location_name}</p>
            <p>Country: {roundLocation.country}</p>
            </>
            )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
  }

export default DailyGame;




