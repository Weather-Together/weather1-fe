import React, { useState, createContext, useMemo } from 'react';
import './App.css';
import Login from '../Login/Login';
import Header from '../Header/Header';
import LandingPage from '../LandingPage/LandingPage'
import DailyGame from '../DailyGame/DailyGame';
import NewUser from '../NewUser/NewUser';
import Dashboard from '../Dashboard/Dashboard'
import Footer from '../Footer/Footer';
import { Routes, Route } from 'react-router-dom';


const mockUser = {
  "id": "372",
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
        <Header />
        <Routes>
          <Route path="/weather1-fe" element={<LandingPage />} />
          <Route path="/weather1-fe/daily-game" element={<DailyGame />} />
          <Route path='/weather1-fe/login' element={<Login />} />
          <Route path='/weather1-fe/new-user' element={<NewUser />} />
          <Route path='/weather1-fe/dashboard' element={<Dashboard />} />
          {/* <Route path='/weather1-fe/comp-game' element={<CompGame />}></Route>
          <Route path='/weather1-fe/profile' element={<UserProfile />}></Route>
          Add more routes as needed */}
        </Routes>
        <Footer/>
    </UserContext.Provider>
  );
}

export default App;
