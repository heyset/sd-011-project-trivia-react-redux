import React from 'react';
import { Route, Switch, BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import Config from './pages/Config';
import Login from './pages/Login';
import Game from './pages/Game';
import Ranking from './pages/Ranking';
import Feedback from './pages/Feedback';
import store from './redux/store';

import './App.css';

export default function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Provider store={ store }>
          <Switch>
            <Route exact path="/" component={ Login } />
            <Route path="/game" component={ Game } />
            <Route path="/Config" component={ Config } />
            <Route path="/feedback" component={ Feedback } />
            <Route path="/ranking" component={ Ranking } />
          </Switch>
        </Provider>
      </BrowserRouter>
    </div>
  );
}
