import React from 'react';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';
import App from 'containers/App.jsx';
import Home from 'containers/Home';
import Profile from 'containers/Profile.jsx';
import Login from 'containers/Login.jsx';
import Game from 'containers/Game.jsx';
import NewGamePage from 'containers/NewGamePage.jsx';


import Terms from 'components/Pages/Terms.jsx';
import SkipPage from 'components/Pages/SkipPage.jsx';
import requireAuth from '../utils/authenticated';

export default (
  <Router history={browserHistory}>
    <Route path="/" component={App}>
      <IndexRoute component={Home} onEnter={requireAuth} />
      <Route path="profile" component={Profile} onEnter={requireAuth} />
      <Route path="login" component={Login}/>
      <Route path="terms" component={Terms}/>
      <Route path="games" component={SkipPage} onEnter={requireAuth}>
        <IndexRoute component={Home} />
        <Route path="new" component={NewGamePage} />
        <Route path=":id" component={Game} />
      </Route>
    </Route>
  </Router>
);