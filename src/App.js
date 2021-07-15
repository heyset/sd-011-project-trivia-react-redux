import React from 'react';
import { Switch, Route } from 'react-router-dom';
import './App.css';
import Login from './pages/Login';
import Questions from './pages/Questions';
import Settings from './pages/Settings';

export default function App() {
  return (
    <Switch>
      <Route exact path="/" component={ Login } />
      <Route path="/questions" component={ Questions } />
      <Route path="/config" component={ Settings } />
    </Switch>
  );
}
