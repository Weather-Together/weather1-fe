import React, { useState, createContext, useMemo, useEffect } from 'react';
import './App.css';
import Login from '../Login/Login';
import LandingPage from '../LandingPage/LandingPage'
import DailyGame from '../DailyGame/DailyGame';
import NewUser from '../NewUser/NewUser';
import Profile from '../Profile/Profile';
import Dashboard from '../Dashboard/Dashboard'
import CompetitiveGame from '../Competitive/CompetitiveGame';
import Footer from '../Footer/Footer';
import PrivateGame from '../PrivateGame/PrivateGame';
import CreatePrivateGame from '../CreatePrivateGame/CreatePrivateGame';
import NotFound from '../NotFound/NotFound';
import { Routes, Route } from 'react-router-dom';
import PrivateGameView from "../Private/PrivateGameView";

const mockUser = {
  "id": "465",
  "type": "user",
  "attributes": {
    "email": "user1@gmail.com",
    "username": "username1"
  }
}


// Create UserContext
interface User {
  id: string;
  type: string;
  attributes: {
    email: string;
    username: string;
  };
}

//create them context
interface ThemeContextType {
  theme: string;
  setTheme: React.Dispatch<React.SetStateAction<string>>;
}


interface UserContextType {
  user: User;
  setUser: React.Dispatch<React.SetStateAction<User>>;
}

// When creating the context
export const UserContext = createContext<UserContextType | undefined>(undefined);

//Added the theme to the context
export const ThemeContext = createContext<ThemeContextType>({ theme: 'light', setTheme: () => {} });


function App() {


  // Correcting the useState with the mockUser
  const [user, setUser] = useState<User>(mockUser as User);

  const [theme, setTheme] = useState('light'); // Default theme is light

  const userValue = useMemo(() => ({ user, setUser }), [user, setUser]);

  // Theme state and other states remain unchanged
  
useEffect(() => {
  document.body.className = theme + '-theme';
}, [theme]);


  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
    <UserContext.Provider value={userValue}>
    <div className={theme + '-theme'}>

        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/:id/:token" element={<LandingPage />} />
          <Route path="/daily-game" element={<DailyGame />} />
          <Route path='/login' element={<Login />} />
          <Route path='/login/:userLogin' element={<Login />} />
          <Route path='/new-user' element={<NewUser />} />
          <Route path='/dashboard' element={<Dashboard />} />
          <Route path='/profile' element={<Profile />} />
          <Route path='/competitive' element={<CompetitiveGame />} />
          <Route path='/private-game/:id/:game_id' element={<PrivateGame />} />
          <Route path='/new-private-game' element={<CreatePrivateGame />} />
          <Route path='/private-game-view/:id/:game_id' element={<PrivateGameView />} />
          <Route path='*' element={<NotFound />} />
        </Routes>
        <Footer />
      </div>
    </UserContext.Provider>
    </ThemeContext.Provider>
  );
}

export default App;


