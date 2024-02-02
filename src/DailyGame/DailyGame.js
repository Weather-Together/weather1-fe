// import React, { useState, useEffect } from 'react';
// import Header from '../Header/Header';
// import Map from '../Map/Map';
// import './DailyGame.css';

function DailyGame() {
//   const [location, setLocation] = useState({ lat: null, lng: null });
//   // const [weatherData, setWeatherData] = useState(null);
//   const [roundData, setRoundData] = useState(null);

//   // Fetch the daily round data on component mount
//   useEffect(() => {
//     const fetchDailyRound = async () => {
//       try {
//         const response = await fetch('https://weather-together-be.onrender.com/api/v0/rounds/daily_round');
//         if (!response.ok) {
//           throw new Error('Network response was not ok');
//         }
//         const data = await response.json();
//         setRoundData(data);
//       } catch (error) {
//         console.error('Failed to fetch daily round:', error);
//       }
//     };

//     fetchDailyRound();
//   }, []);

//   const handleSubmit = async () => {
//     if (location.lat && location.lng) {
//       console.log("Submitting location:", location);
//       // Here you might want to submit the selected location to your backend
//       // For simplicity, I'm assuming you have an endpoint to submit the guess and then fetch the result
//       try {
//         const userId = 'YOUR_USER_ID'; // You'll need to replace this with the actual user ID
//         const roundId = roundData?.data?.id; // Assuming the round ID is needed for the submission
//         const response = await fetch(`https://weather-together-be.onrender.com/api/v0/users/${userId}/rounds/${roundId}/votes/get_result`, {
//           method: 'POST',
//           headers: {
//             'Content-Type': 'application/json',
//           },
//           body: JSON.stringify({
//             lat: location.lat,
//             lon: location.lng,
//           }),
//         });

//         if (!response.ok) {
//           throw new Error('Failed to submit location');
//         }

//         const resultData = await response.json();
//         console.log(resultData);
//         // Here you would process the result of the submission
//       } catch (error) {
//         console.error('Error submitting location:', error);
//         alert('There was an error submitting your guess. Please try again.');
//       }
//     } else {
//       alert("Please select a location on the map.");
//     }
//   };

return (
  <div></div>
//     <div className="daily-game">
//       <Header />
//       <Map onLocationSelect={setLocation} />
//       <div className="weather-data-container">
//         {roundData ? (
//           <>
//             <p>Location: {roundData.data.attributes.target_weather_stats.location.name}</p>
//             <p>Max Temp: {roundData.data.attributes.target_weather_stats.weather_data.maxtemp_c} °C</p>
//             <p>Humidity: {roundData.data.attributes.target_weather_stats.weather_data.avghumidity}%</p>
//             {/* Display other weather data as needed */}
//           </>
//         ) : (
//           <p>Loading daily game data...</p>
//         )}
//       </div>
//       {location.lat && location.lng && (
//         <div className="location-display">
//           <p>Latitude: {location.lat.toFixed(2)}</p>
//           <p>Longitude: {location.lng.toFixed(2)}</p>
//         </div>
//       )}
//       <button onClick={handleSubmit} className="submit-button">Submit</button>
//     </div>
);
}

export default DailyGame;

