import React from 'react';
import myClass from './App.module.css';
import LandingPage from './components/LandingPage';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import { GlobalProvider } from './context/GlobalState'
import AllCountries from './components/Sections/AllCountries';


function App(props) {
  return (
    <div className={myClass.App}>
      <GlobalProvider>
        <BrowserRouter>
          <Switch>
            <Route path="/" exact component={LandingPage} />
            <Route path="/all" component={AllCountries} />
          </Switch>
        </BrowserRouter>
      </GlobalProvider>
    </div>
  );
}

export default App;
