import React from 'react';
import { connect } from 'react-redux';

import {
  connectHomePage,
  disconnectHomePage,
  acceptInvite,
  removeInvite,
} from 'services/home-services.jsx';

import Row from 'react-bootstrap/lib/Row';
import Col from 'react-bootstrap/lib/Col';
import Well from 'react-bootstrap/lib/Well';
import Button from 'react-bootstrap/lib/Button';
import FormGroup from 'react-bootstrap/lib/FormGroup';
import Radio from 'react-bootstrap/lib/Radio';
import NewGame from 'components/NewGame';
import Invite from 'components/Utils/Invite.jsx';

import { Link } from 'react-router';

@connect(s => {
  return {
    games: s.games.games,
    invites: s.newGame.invites,
  };
})
export default class Home extends React.Component {

  static proptypes = {
    dispatch: React.PropTypes.func,
    invites: React.PropTypes.array,
    games: React.PropTypes.array,
  }

  componentWillMount() {
    var { dispatch } = this.props;
    dispatch(connectHomePage());
  }

  componentWillUnmount() {
    var { dispatch } = this.props;
    dispatch(disconnectHomePage());
  }

  createGameLink = (game, i) => {
    return <div key={i}><Link to={`/games/${game.key}`}>{game.name}</Link></div>;
  }

  acceptGame = (gameId, gameName) => {
    var { dispatch } = this.props;
    dispatch(acceptInvite(gameName, gameId));
  }

  removeInvite = (gameId) => {
    var { dispatch } = this.props;
    dispatch(removeInvite(gameId));
  }

  createInviteRow = (invite, i) => {
    return (<Invite
      key={i}
      acceptGame={this.acceptGame}
      rejectGame={this.removeInvite}
      invite={invite} />);
  }

  render() {
    var { games, invites } = this.props;
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
