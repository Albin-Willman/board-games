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

import { Link } from 'react-router';
import fetchJudge from 'utils/judges';

export default class Home extends React.Component {
  state = {
    games: [],
    user: firebase.auth().currentUser,
    selectedGame: null,
  }
  permissionsRef = null;
  gamesRef = null;
  user = null;

  componentWillMount() {
    this.user = this.state.user.uid;
    this.permissionsRef = firebase.database().ref(`permissions/${this.user}/games`);
    this.gamesRef = firebase.database().ref('games');

    this.permissionsRef.on('child_added', (snap) => {
      this.setState({
        games: [...this.state.games, {
          data: snap.val(),
          key: snap.key,
        }],
      });
    });
  }

  componentWillUnmount() {
    this.permissionsRef.off();
  }

  createGame = (type) => {
    var judge = fetchJudge(type);
    var game = judge.newGame();
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
            browserHistory.push(`/game/${ref.key}`);
          }
      });
    });
  }

  createGameLink = (game, i) => {
    return <div key={i}><Link to={`/game/${game.key}`}>{game.data.name}</Link></div>;
  }

  render() {
    var games = this.state.games;
    var links = games.map(this.createGameLink);
    return (
      <Row>
        <Col md={6} mdOffset={3}>
          <Well>
            <h1>Your Games</h1>
            <p>Games: {games.length}</p>
            {links}
          </Well>
          <NewGame createGame={this.createGame}/>
        </Col>
      </Row>
      );
  }
}
