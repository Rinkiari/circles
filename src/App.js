import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { createContext } from 'react';
import './scss/app.scss';

import Home from './pages/Home';
import LogReg from './pages/LogReg';
import MyProfile from './pages/MyProfile';
import Profile from './pages/Profile';
import Event from './pages/Event';
import FillMyProfile from './pages/FillMyProfile';
import CreateProject from './pages/CreateProject';

export const LoginContext = createContext();

function App() {
  const [isLogged, setIsLogged] = React.useState(false);
  console.log(`state isLogged: ${isLogged}`);

  return (
    <div className="app-container">
      <LoginContext.Provider value={{ isLogged, setIsLogged }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<LogReg />} />
          <Route path="/myprofile" element={<MyProfile />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/fillmyprofile" element={<FillMyProfile />} />
          <Route path="/createproject" element={<CreateProject />} />
          <Route path="/event/:id" element={<Event />} />
        </Routes>
      </LoginContext.Provider>
    </div>
  );
}

export default App;
