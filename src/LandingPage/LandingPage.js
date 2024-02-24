import Header from '../Header/Header';
import { useEffect } from 'react';
import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './LandingPage.css'
import { Player } from '@lottiefiles/react-lottie-player'; // Import the Lottie Player

function LandingPage() {
  const { id, token } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if(id && token) {
    const verifyUser = async () => {
      try{
      const response = await fetch(`https://powerful-sierra-25067-22c20bb81d9c.herokuapp.com/api/v0/users/${id}/verify_account/${token}`);
       if(!response.ok) {
           const error = await response.json();
           console.log(error);
       }
       const result = await response.json();
       localStorage.setItem('User', JSON.stringify(result.data));
       navigate('../daily-game');      
      }  catch (error) {
       console.log('Error', error);
    }}
    verifyUser()
  }
  },[navigate, id,  token])
  return (
      <div className="landing-container">
        <Header />
        <div className="landing-content">Instructions for the game!!!!!!  We should do something here so that people have some idea how to play this thing.  </div>
        {/* Eventually, you can add more content or components here */}

        <Player
        src='https://lottie.host/5af3a8d3-d4b3-4263-9473-61e3ec669ce7/1NQFFWKZvw.json'
        className="player"
        loop={true}
        autoplay={true}
      />



      </div>
    //setup email verification
  );
}

export default LandingPage;
