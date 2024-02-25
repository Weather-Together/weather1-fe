import React, { useState, useEffect } from "react";
import Map from "../Map/Map";
import "./Competitive.css";
import Header2 from "../Header2/Header2";

const CompetitiveGame = () => {
  const [user, setUser] = useState(null);
  const [location, setLocation] = useState(null); //picked location
  const [roundData, setRoundData] = useState(null); // this is what gets displayed first
  const [round, setRound] = useState(null); // to determine the round
  const [score, setScore] = useState(null); // your score after submit
  const [roundLocation, setRoundLocation] = useState(null); // from the get the location of the round
  const [guessLocation, setGuessLocation] = useState(null); // the location of your guess

  // Define the function to handle location selection
  const handleLocationSelect = (selectedLocation) => {
    setLocation(selectedLocation);
  };

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("User"));
    if (storedUser) {
      setUser(storedUser);
    }
    const fetchRoundData = async () => {
      try {
        const response = await fetch(
          `https://powerful-sierra-25067-22c20bb81d9c.herokuapp.com/api/v0/rounds/current_competitive_round`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch competitive round data");
        }
        const data = await response.json();
        setRound(data.data.id);
        setRoundData({
          maxtemp: data.data.attributes.maxtemp_f,
          mintemp: data.data.attributes.mintemp_f,
          maxwind: data.data.attributes.maxwind_mph,
          avghumidity: data.data.attributes.avghumidity,
          totalprecip: data.data.attributes.totalprecip_in,
        });
        setRoundLocation({
          location_name: data.data.attributes.location_name,
          country: data.data.attributes.country,
        });

        console.log("Fetched round data:", data);
      } catch (error) {
        console.error("Error fetching round data:", error);
      }
    };

    fetchRoundData();
  }, []); // Depend on user ID so it refetches if the user changes

  // console.log('Fetching with user ID:', user.id, 'and round:', round);

  const handleSubmit = async () => {
    console.log(user)
    if (location) {
      try {
        const response = await fetch(
          `https://powerful-sierra-25067-22c20bb81d9c.herokuapp.com/api/v0/users/${user.id}/rounds/${round}/votes/new`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              lat: location.lat,
              lon: location.lng,
            }),
          }
        );

        console.log("Response status:", response.status);

        if (!response.ok) {
          throw new Error("Failed to submit guess");
        }
        const result = await response.json();
        setScore(result.data.attributes.score); // Assuming the score is in this path
        console.log("My score:", score);
        setGuessLocation({
          location_name: result.data.attributes.location_name,
          country: result.data.attributes.country,
        }); // Assuming the score is in this path
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
      <div className="competitive-game">
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
          <button onClick={handleSubmit} className="submit-button">
            Submit Guess
          </button>
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
          {/* Conditional rendering for ongoing competition */}
          {score === null && (
            <div className="ongoing-competition-message">
              <p>
                Guess submitted!! However, the competition is still ongoing.
                Check back later for your score!
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CompetitiveGame;
