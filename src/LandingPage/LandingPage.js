import Header from '../Header/Header';
import React from 'react';

function LandingPage() {
  return (
    <div>
      <Header />
      <div className="instructions-container">
        <p>Here will be some instructions or information about the game.</p>
        {/* Eventually, you can add more content or components here */}
      </div>
    </div>
  );
}

export default LandingPage;
