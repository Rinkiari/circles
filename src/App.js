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
  // state поиска
  const [searchValue, setSearchValue] = React.useState('');

  return (
    <div className="app-container">
      <AuthProvider>
        <Routes>
          <Route
            path="/"
            element={<Home searchValue={searchValue} setSearchValue={setSearchValue} />}
          />
          <Route path="/login" element={<LogReg />} />
          <Route
            path="/myprofile"
            element={<MyProfile searchValue={searchValue} setSearchValue={setSearchValue} />}
          />
          <Route
            path="/profile/:id"
            element={<Profile searchValue={searchValue} setSearchValue={setSearchValue} />}
          />
          <Route
            path="/fillmyprofile"
            element={<FillMyProfile searchValue={searchValue} setSearchValue={setSearchValue} />}
          />
          <Route
            path="/createproject"
            element={<CreateProject searchValue={searchValue} setSearchValue={setSearchValue} />}
          />
          <Route
            path="/event/:id"
            element={<Event searchValue={searchValue} setSearchValue={setSearchValue} />}
          />
        </Routes>
      </AuthProvider>
    </div>
  );
}

export default App;
