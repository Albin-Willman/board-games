import React from 'react';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';
import App from 'containers/App';
import Home from 'containers/Home';
import Login from 'containers/Login';
import Game from 'containers/Game';
import Terms from 'components/Pages/Terms';
import requireAuth from '../utils/authenticated';

export default (
  <Router history={browserHistory}>
    <Route path="/" component={App}>
      <IndexRoute component={Home} onEnter={requireAuth} />
      <Route path="login" component={Login}/>
      <Route path="terms" component={Terms}/>
      <Route path="game/:id" component={Game} onEnter={requireAuth}/>
    </Route>
  </Router>
);