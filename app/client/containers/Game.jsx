import React from 'react';
import { connect } from 'react-redux';

import * as firebase from 'firebase';
import Row from 'react-bootstrap/lib/Row';
import Col from 'react-bootstrap/lib/Col';
import Well from 'react-bootstrap/lib/Well';
import Button from 'react-bootstrap/lib/Button';
import { Link } from 'react-router';
import fetchJudge from 'utils/judges';

import { connectToGame, disconnectFromGame, makeMove } from 'services/game-services.jsx';

@connect(s => {
  return { game: s.games.game };
})
export default class Game extends React.Component {
  static propTypes = {
    game: React.PropTypes.object,
    params: React.PropTypes.object,
    dispatch: React.PropTypes.func,
  }

  componentWillMount() {
    var { dispatch, params } = this.props;
    dispatch(connectToGame(params.id));
  }

  componentWillUnmount() {
    var { dispatch } = this.props;
    dispatch(disconnectFromGame());
  }

  makeMove = (action) => {
    var { dispatch, game } = this.props;
    dispatch(makeMove(action));
  }

  buildGameEndNotice() {
    var { game } = this.props;
    if(!game.gameEnded) {
      return false;
    }
    if(game.winningLine) {
      var winnerId = game.actions[game.actions.length - 1].uid;
      var username = this.findUsername(winnerId);
      return <p>Congratulations {username}, you won!</p>;
    }
    return <p>Game ended in a draw</p>;
  }

  buildTurnNotice() {
    var { game } = this.props;
    if(game.gameEnded || !game.nextPlayer) {
      return false;
    }
    var player = game.players[game.nextPlayer];
    return <p>Next player is: {player.username}</p>;
  }

  findUsername(uid) {
    var { players } = this.props.game;
    for(var i = 0; i < players.length; i += 1) {
      var player = players[i]
      if(uid === player.id) {
        return player.username;
      }
    }
    return 'The shadow';
  }

  render() {
    var { game } = this.props;
    var judge = fetchJudge(game.type);
    if(!judge || !game) {
      return <p>'Waiting for judge'</p>;
    }
    var gameEndNotice = this.buildGameEndNotice();
    var turnNotice = this.buildTurnNotice();

    var board = judge.renderGame(game, this.makeMove);
    return (
      <Row>
        <Col md={10} mdOffset={1}>
          <Well>
            <h1>Game</h1>
            {turnNotice}
            {gameEndNotice}
            <div>
              {board}
            </div>
            <Link to="/">Back</Link>
          </Well>
        </Col>
      </Row>
      );
  }
}
