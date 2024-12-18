import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import './scss/app.scss';

import Home from './pages/Home';
import LogReg from './pages/LogReg';
import MyProfile from './pages/MyProfile';
import Profile from './pages/Profile';
import Event from './pages/Event';
import FillMyProfile from './pages/FillMyProfile';
import CreateProject from './pages/CreateProject';

function App() {
  return (
    <div className="app-container">
      <AuthProvider>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<LogReg />} />
          <Route path="/myprofile" element={<MyProfile />} />
          <Route path="/profile/:id" element={<Profile />} />
          <Route path="/fillmyprofile" element={<FillMyProfile />} />
          <Route path="/createproject" element={<CreateProject />} />
          <Route path="/event/:id" element={<Event />} />
        </Routes>
      </AuthProvider>
    </div>
  );
}

export default App;
