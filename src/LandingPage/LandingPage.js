import Header from '../Header/Header';
import { useEffect } from 'react';
import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './LandingPage.css'

function LandingPage() {
  const { id, token } = useParams()
  const navigate = useNavigate();

  useEffect(() => {
    if(id && token) {
    const verifyUser = async () => {
      try{
      const response = await fetch(`https://weather-together-be.onrender.com/api/v0/users/${id}/verify_account/${token}`);
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
        <div className="landing-content">Instructions for the game!!!!!!</div>
        {/* Eventually, you can add more content or components here */}
      </div>
    //setup email verification
  );
}

export default LandingPage;
