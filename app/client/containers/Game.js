import React from 'react';
import * as firebase from 'firebase';
import Row from 'react-bootstrap/lib/Row';
import Col from 'react-bootstrap/lib/Col';
import Well from 'react-bootstrap/lib/Well';
import Button from 'react-bootstrap/lib/Button';
import { Link } from 'react-router';
import fetchJudge from 'utils/judges';

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
    var { game, judge } = this.state;
    var newGame = judge.makeMove(game, action);
    this.ref.set(newGame);
  }

  render() {
    var { game, judge } = this.state;
    if(!judge) {
      return <p>'Waiting for judge'</p>;
    }
    var gameEnded = !!(game.actions && game.actions.length === 9 || game.winningLine || game.gameEnded);
    var gameEndNotice;
    if(gameEnded) {
      if(game.winningLine) {
        gameEndNotice = (
          <p>
            Congratulatios player {game.board[game.winningLine[0]]}, you won!
          </p>);
      } else {
        gameEndNotice = <p>Game ended in a draw</p>;
      }
    }
    var board = judge.renderGame(game, this.makeMove);
    return (
      <Row>
        <Col md={10} mdOffset={1}>
          <Well>
            <h1>Game</h1>
            {gameEndNotice}
            {board}

            <Link to="/">Back</Link>
          </Well>
        </Col>
      </Row>
      );
  }
}
