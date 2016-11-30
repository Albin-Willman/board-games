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

export default class Home extends React.Component {
  state = {
    games: [],
    user: firebase.auth().currentUser,
  }
  permissionsRef = null;
  user = null;

  componentWillMount() {
    this.user = this.state.user.uid;
    this.permissionsRef = firebase.database().ref(`permissions/${this.user}/games`);

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

  createGameLink = (game, i) => {
    return <div key={i}><Link to={`/games/${game.key}`}>{game.data.name}</Link></div>;
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
        </Col>
      </Row>
      );
  }
}
