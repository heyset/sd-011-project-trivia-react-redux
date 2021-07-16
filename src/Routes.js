import React from 'react';
import { Switch, Route } from 'react-router';
import Login from './pages/Login';
import Quiz from './pages/Quiz';
import Setting from './pages/Setting';
import Feedback from './pages/Feedback';

class Routes extends React.Component {
  render() {
    return (
      <Switch>
        <Route path="/" exact component={ Login } />
        <Route path="/quiz" component={ Quiz } />
        <Route path="/settings" component={ Setting } />
        <Route path="/feedback" component={ Feedback } />
      </Switch>
    );
  }
}

export default Routes;
