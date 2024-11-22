import React from 'react';
import { Route, Routes } from 'react-router-dom';
import './scss/app.scss';

import Home from './pages/Home';
import LogReg from './pages/LogReg';
import MyProfile from './pages/MyProfile';

function App() {
  return (
    <div className="app-container">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<LogReg />} />
        <Route path="/myprofile" element={<MyProfile />} />
      </Routes>
    </div>
  );
}

export default App;
