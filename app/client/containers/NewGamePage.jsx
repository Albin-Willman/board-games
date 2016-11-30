import React from 'react';
import * as firebase from 'firebase';
import Row from 'react-bootstrap/lib/Row';
import Col from 'react-bootstrap/lib/Col';
import Well from 'react-bootstrap/lib/Well';
import Button from 'react-bootstrap/lib/Button';
import FormGroup from 'react-bootstrap/lib/FormGroup';
import Radio from 'react-bootstrap/lib/Radio';
import NewGame from 'components/NewGame';
import { browserHistory } from 'react-router';

export default class Home extends React.Component {
  state = {
    user: firebase.auth().currentUser,
    selectedGame: null,
    options: {},
    users: [],
  }
  permissionsRef = null;
  gamesRef = null;
  user = null;
  usersRef = null;

  componentWillMount() {
    this.user = this.state.user.uid;
    this.permissionsRef = firebase.database().ref(`permissions/${this.user}/games`);
    this.gamesRef = firebase.database().ref('games');
    this.usersRef = firebase.database().ref(`public-users`);
    console.log(this.usersRef);
    this.usersRef.on('child_added', (snap) => {
      console.log('hej');
      console.log(snap.val());
    });
  }

  componentWillUnmount() {
    this.permissionsRef.off();
  }

  createGame = (game) => {
    game.users = {};
    game.users[this.user] = true;

    var permission = {
      access: true,
      name: game.name
    };
    var gamesRef = this.gamesRef;
    var ref = this.permissionsRef.push(permission, function() {
      var games = {};
      games[ref.key] = game;
      gamesRef.update(games,
        (error) => {
          if(error) {
            console.log(error);
          } else {
            browserHistory.push(`/games/${ref.key}`);
          }
      });
    });
  }

  render() {
    return (
      <Row>
        <Col md={6} mdOffset={3}>
          <NewGame createGame={this.createGame} uid={this.user}/>
        </Col>
      </Row>
      );
  }
}