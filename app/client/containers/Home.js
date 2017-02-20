import React from 'react';
import { connect } from 'react-redux';

import * as firebase from 'firebase';
import Row from 'react-bootstrap/lib/Row';
import Col from 'react-bootstrap/lib/Col';
import Well from 'react-bootstrap/lib/Well';
import Button from 'react-bootstrap/lib/Button';
import FormGroup from 'react-bootstrap/lib/FormGroup';
import Radio from 'react-bootstrap/lib/Radio';
import NewGame from 'components/NewGame';
import Invite from 'components/Utils/Invite.jsx';

import { Link } from 'react-router';

@connect(s => s)
export default class Home extends React.Component {
  state = {
    games: [],
    invites: [],
    user: firebase.auth().currentUser,
  }
  permissionsRef = null;
  invitesRef = null;
  user = null;

  componentWillMount() {
    this.user = this.state.user.uid;
    this.permissionsRef = firebase.database().ref(`permissions/${this.user}/games`);
    this.invitesRef = firebase.database().ref(`game-offers/${this.user}`);

    this.invitesRef.on('child_added', (snap) => {
      this.setState({
        invites: [...this.state.invites, {
          name: snap.val(),
          key: snap.key,
        }],
      });
    });

    this.invitesRef.on('child_removed', (snap) => {
      var key = snap.key;
      var invites = this.state.invites.filter((invite) => {
        return invite.key !== key;
      });
      this.setState({ invites });
    });

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
    this.invitesRef.off();
  }

  createGameLink = (game, i) => {
    return <div key={i}><Link to={`/games/${game.key}`}>{game.data.name}</Link></div>;
  }

  acceptGame = (gameId, gameName) => {
    var permission = {
      access: true,
      name: gameName,
    };
    this.permissionsRef.child(gameId).set(permission);
    this.removeInvite(gameId);
  }

  removeInvite = (gameId) => {
    this.invitesRef.child(gameId).remove();
  }

  createInviteRow = (invite, i) => {
    return (<Invite
      key={i}
      acceptGame={this.acceptGame}
      rejectGame={this.removeInvite}
      invite={invite} />);
  }

  render() {
    var { games, invites } = this.state;
    var links = games.map(this.createGameLink);
    var invitesRow = invites.map(this.createInviteRow);
    return (
      <Row>
        <Col md={6} mdOffset={3}>
          <Well>
            <h1>Your Games</h1>
            <p>Games: {games.length}</p>
            {links}
            <h2>Invites</h2>
            {invitesRow.length > 0 ? invitesRow : 'No invites'}
          </Well>
        </Col>
      </Row>
      );
  }
}
