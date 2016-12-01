import React from 'react';
import * as firebase from 'firebase';
import Row from 'react-bootstrap/lib/Row';
import Col from 'react-bootstrap/lib/Col';
import Well from 'react-bootstrap/lib/Well';
import Button from 'react-bootstrap/lib/Button';
import { Link } from 'react-router';
import fetchJudge from 'utils/judges';
import makeMove from 'utils/make-move';

export default class Game extends React.Component {
  state = { game: {}, uid: firebase.auth().currentUser.uid, judge: null }
  ref = null;

  static propTypes = {
    params: React.PropTypes.object,
  }

  componentWillMount() {
    var user = this.state.uid;
    var id = this.props.params.id;
    this.ref = firebase.database().ref(`games/${id}`);

    this.ref.once('value', (snap) => {
      this.setState({ judge: fetchJudge(snap.val().type) });
    });

    this.ref.on('value', (snap) => {
      this.setState({ game: snap.val() });
    });
  }

  componentWillUnmount() {
    this.ref.off();
  }

  makeMove = (action) => {
    var { game, judge, uid } = this.state;
    makeMove(this.ref, game, judge, uid, action);
  }

  buildGameEndNotice() {
    var { game } = this.state;
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
    var { game } = this.state;
    if(game.gameEnded) {
      return false;
    }
    var player = game.players[game.nextPlayer];
    return <p>Next player is: {player.username}</p>;
  }

  findUsername(uid) {
    var { players } = this.state.game;
    for(var i = 0; i < players.length; i += 1) {
      var player = players[i]
      if(uid === player.id) {
        return player.username;
      }
    }
    return 'The shadow';
  }

  render() {
    var { game, judge } = this.state;
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
