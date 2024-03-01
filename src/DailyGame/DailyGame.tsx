import React, { useState, useEffect } from 'react';
import Map from '../Map/Map';
import { useNavigate } from 'react-router-dom';
import './DailyGame.css';
import Header2 from '../Header2/Header2';
import notFoundImage from '../Images/img-not-found.png';

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
  const [guessData, setGuessData] = useState<any | null>(null)
  const [guessImage, setGuessImage] = useState<any | null>(null)
  const [score, setScore] = useState<number | null>(null);
  const [guessLocation, setGuessLocation] = useState<{location_name: string, country: string} | null>(null)
  const [showModal, setShowModal] = useState(false)
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
    if(storedUser) {
      setUser(storedUser)
    };
    const fetchRoundData = async () => {
      if(!localStorage.getItem("DailyRoundData")) {
        try {
          const response = await fetch(`https://powerful-sierra-25067-22c20bb81d9c.herokuapp.com/api/v0/users/${storedUser.id}/rounds/current_daily_round`);
          if (!response.ok) {
            throw new Error('Failed to fetch daily round data');
          }
          const data = await response.json();

          const dailyRoundData = {
            maxtemp: data.data.attributes.maxtemp_f, 
            mintemp: data.data.attributes.mintemp_f,
            maxwind: data.data.attributes.maxwind_mph,
            avghumidity: data.data.attributes.avghumidity,
            totalprecip: data.data.attributes.totalprecip_in
          };
          localStorage.setItem("DailyRoundData", JSON.stringify(dailyRoundData));

          setRoundLocation({
            location_name: data.data.attributes.location_name,
            country: data.data.attributes.country
          })

          console.log("fetched data", data)
        } catch (error) {
          console.error("Error fetching round data:", error);
        }
      }
      console.log('TEST', localStorage.getItem("DailyRoundData"))
      setRoundData(JSON.parse(localStorage.getItem("DailyRoundData")))
    };

    fetchRoundData();
  }, [navigate]); // Depend on user ID so it refetches if the user changes

  const handleSubmit = async () => {
    if (location) {
      try {
        const response = await fetch(`https://powerful-sierra-25067-22c20bb81d9c.herokuapp.com/api/v0/users/${user.id}/rounds/current_daily_round/vote`, {
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
        setGuessData(result.data.attributes)
        setGuessImage(JSON.parse(result.data.attributes.image))
        setGuessLocation({
          location_name: result.data.attributes.location_name,
          country:result.data.attributes.country})// Assuming the score is in this path
        setShowModal(true);
      } catch (error) {
        console.error("Error submitting guess:", error);
      }
    } else {
      window.alert("Please select a location on the map.");
    }
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const toDashboard = () => {
    navigate('../dashboard')
  }

  return (
    <div>
      <Header2 />
      <div className="daily-game">
        <div className="map-container">
          <Map onLocationSelect={handleLocationSelect} />
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
        {guessLocation ? <div className='modal-container'>
          <dialog className='score-modal' open={showModal} onClose={handleCloseModal}>
            <form className='close-dialog' method='dialog'>
              <button className='dialog-button'>X</button>
            </form>
            <div className='score-logic'>
              <div className='scoring max-temp'>
                <p>Max Temp:</p>
                <p>{roundData.maxtemp} °F</p>
                <p>-</p>
                <p>{guessData.maxtemp_f} °F</p>
                <p>=</p>
                <p>{(roundData.maxtemp - guessData.maxtemp_f).toFixed(2)}²</p>
              </div>
              <div className='scoring min-temp'>
                <p>Min Temp:</p>
                <p>{roundData.mintemp} °F</p>
                <p>-</p>
                <p>{guessData.mintemp_f} °F</p>
                <p>=</p>
                <p>{(roundData.mintemp - guessData.mintemp_f).toFixed(2)}²</p>
              </div>
              <div className='scoring max-wind'>
                <>Max Wind:</>
                <p>{roundData.maxwind} MPH</p>
                <p>-</p>
                <p>{guessData.maxwind_mph} MPH</p>
                <p>=</p>
                <p>{(roundData.maxwind - guessData.maxwind_mph).toFixed(2)}²</p>
              </div>
              <div className='scoring avg-humidity'>
                <p>Avg. Humidity:</p>
                <p>{roundData.avghumidity}%</p>
                <p>-</p>
                <p>{guessData.avghumidity}%</p>
                <p>=</p>
                <p>{(roundData.avghumidity - guessData.avghumidity).toFixed(2)}²</p>
              </div>
              <div className='scoring total-precipitation'>
                <p>Total Precip:</p>
                <p>{roundData.totalprecip} in</p>
                <p>-</p>
                <p>{guessData.totalprecip_in} in</p>
                <p>=</p>
                <p>{(roundData.totalprecip - guessData.totalprecip_in).toFixed(2)}²</p>
              </div>
            </div>
            <div className='filler'></div>
            <div className='info-section'>
              <div className='location-info'>
                <h3>Your Guess: </h3>
                <p>{guessLocation.location_name}, {guessLocation.country}</p>
                <a href={guessData.wiki}>Wiki Page</a>
              </div>
              <img className='location-img' src={guessImage ? guessImage[0] : notFoundImage} alt={`${guessLocation.location_name}`} style={{ border: '1px solid black' }}></img>
              <div className='score-total'>
                <h3>Total Score: </h3>
                <p>{score.toFixed(2)}</p>
              </div>
            </div>
            <div className='modal-dashboard'>
            <button onClick={toDashboard} className='dashboard-button'>Dashboard</button>
            </div>
          </dialog>
          </div> :
          <p></p>}
      </div>
    </div>
  );
  }

export default DailyGame;




