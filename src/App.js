import React from 'react';
import { Route, Routes } from 'react-router-dom';
import './scss/app.scss';

import Home from './pages/Home';
import LogReg from './pages/LogReg';
import MyProfile from './pages/MyProfile';
import Profile from './pages/Profile';
import Event from './pages/Event';
import FillMyProfile from './pages/FillMyProfile';
import CreateProject from './pages/CreateProject';

export const AuthContext = React.createContext();
export const useAuth = () => React.useContext(AuthContext);

function App() {
  const [isLogged, setIsLogged] = React.useState(false);

  return (
    <div className="app-container">
      <AuthContext.Provider value={{ isLogged, setIsLogged }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<LogReg />} />
          <Route path="/myprofile" element={<MyProfile />} />
          <Route path="/profile/:id" element={<Profile />} />
          <Route path="/fillmyprofile" element={<FillMyProfile />} />
          <Route path="/createproject" element={<CreateProject />} />
          <Route path="/event/:id" element={<Event />} />
        </Routes>
      </AuthContext.Provider>
    </div>
  );
}

export default App;
