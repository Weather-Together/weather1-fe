import React, { useState, createContext, useMemo } from 'react';
import './App.css';
import Login from '../Login/Login';
import LandingPage from '../LandingPage/LandingPage'
import DailyGame from '../DailyGame/DailyGame';
import NewUser from '../NewUser/NewUser';
import Profile from '../Profile/Profile';
import Dashboard from '../Dashboard/Dashboard'
import CompetitiveGame from '../Competitive/CompetitiveGame';
import Footer from '../Footer/Footer';
import Private from '../Private/Private';
import NotFound from '../NotFound/NotFound';
import { Routes, Route } from 'react-router-dom';

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

interface UserContextType {
  user: User;
  setUser: React.Dispatch<React.SetStateAction<User>>;
}

// When creating the context
export const UserContext = createContext<UserContextType | undefined>(undefined);

function App() {
 // Correcting the useState with the mockUser
const [user, setUser] = useState<User>(mockUser as User);

const userValue = useMemo(() => ({ user, setUser }), [user, setUser]);

  return (
    <UserContext.Provider value={userValue}>
      
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/:id/:token" element={<LandingPage />} />
          <Route path="/daily-game" element={<DailyGame />} />
          <Route path='/login' element={<Login />} />
          <Route path='/new-user' element={<NewUser />} />
          <Route path='/dashboard' element={<Dashboard />} />
          <Route path='/profile' element={<Profile />} />
          <Route path='/competitive' element={<CompetitiveGame />} />
          <Route path='/private' element={<Private />} />
          <Route path='*' element={<NotFound />} />
        </Routes>
        <Footer/>
    </UserContext.Provider>
  );
}

export default App;


