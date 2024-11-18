import React from 'react';
import './scss/app.scss';

import Header from './components/Header';
import Home from './pages/Home';

function App() {
  return (
    <div className="app-container">
      <Header />
      <Home />
    </div>
  );
}

export default App;
