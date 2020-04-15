import React from 'react';
import './App.css';
import LandingPage from './components/LandingPage';

import { GlobalProvider } from './context/GlobalState'

function App() {
  return (
    <div className="App">
      <GlobalProvider>
        <LandingPage />
      </GlobalProvider>
    </div>
  );
}

export default App;
