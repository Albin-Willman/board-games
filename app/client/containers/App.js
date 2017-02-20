
import React from 'react';
import { connect } from 'react-redux';

// ReactBoostrap components:
import Grid from 'react-bootstrap/lib/Grid';
import TopBar from 'components/Layout/TopBar.jsx';

import * as firebase from 'firebase';
import { browserHistory } from 'react-router';

@connect(s => {
  return { profile: s.profile.profile };
})
export default class App extends React.Component {
  state = {
    loggedIn: (null !== firebase.auth().currentUser),
  }

  componentWillMount() {
    firebase.auth().onAuthStateChanged(user => {
      this.setState({
        loggedIn: (null !== user),
      });
      if(user) {

        console.log('Logged in: ', user);
        if(window.location.pathname === '/login') {
          browserHistory.push('/');
        }
      } else {
        console.log('Not logged in');
      }
    });
  }

  render() {
    var loginOrOut;
    var { loggedIn } = this.state;
    if(loggedIn) {
      loginOrOut = 'logged in';
    } else {
      loginOrOut = 'logged out';
    }

    return (
      <div>
        <TopBar />
        <Grid style={{marginTop: '100px'}}>
          {this.props.children}
        </Grid>
      </div>
      );
    }
  }
