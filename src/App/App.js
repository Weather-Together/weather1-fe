import React, { useState, createContext, useMemo } from 'react';
import './App.css';
import Map from '../Map/Map';
import LandingPage from '../LandingPage/LandingPage'
import DailyGame from '../DailyGame/DailyGame';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';


// Create UserContext
const UserContext = createContext();

function App() {
  const [user, setUser] = useState(null);
  const userValue = useMemo(() => ({ user, setUser }), [user, setUser]);

  return (
    <UserContext.Provider value={userValue}>
        <Routes>
          <Route path="/weather1-fe" element={<LandingPage />} />
          <Route path="/weather1-fe/daily-game" element={<DailyGame />} />
          {/* Add more routes as needed */}
        </Routes>
    </UserContext.Provider>
  );
}

export default App;

