import Header from '../Header/Header';
import React from 'react';
import { useParams } from 'react-router-dom';
import './LandingPage.css'

function LandingPage() {
  const { id, token } = useParams()

  return (
      <div className="landing-container">
        <Header />
        <div className="landing-content">Instructions for the game!!!!!!</div>
        {/* Eventually, you can add more content or components here */}
        <p>ID: {id} Token: {token}</p>
      </div>
    //setup email verification
  );
}

export default LandingPage;
