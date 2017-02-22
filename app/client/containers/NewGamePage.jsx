import React from 'react';
import { connect } from 'react-redux';
import {
  connectToNewGame,
  disconnectFromNewGame,
  createGame,
} from 'services/new-game-services.jsx';

import Row from 'react-bootstrap/lib/Row';
import Col from 'react-bootstrap/lib/Col';
import Well from 'react-bootstrap/lib/Well';
import Button from 'react-bootstrap/lib/Button';
import FormGroup from 'react-bootstrap/lib/FormGroup';
import Radio from 'react-bootstrap/lib/Radio';
import NewGame from 'components/NewGame';

@connect(s => {
  return s.newGame;
})
export default class NewGamePage extends React.Component {

  static proptypes = {
    players: React.PropTypes.array,
    publicPlayer: React.PropTypes.bool,
    currentUser: React.PropTypes.string,
  }

  componentWillMount() {
    var { dispatch } = this.props;
    dispatch(connectToNewGame());
  }

  componentWillUnmount() {
    var { dispatch } = this.props;
    dispatch(disconnectFromNewGame());
  }

  createGame = (game) => {
    var { dispatch } = this.props;
    dispatch(createGame(game));
  }

  render() {
    var { players, publicPlayer, currentUser } = this.props;
    return (
      <Row>
        <Col md={6} mdOffset={3}>
          <NewGame
            createGame={this.createGame}
            uid={currentUser}
            players={players}
            publicPlayer={publicPlayer}
            />
        </Col>
      </Row>
      );
  }
}
