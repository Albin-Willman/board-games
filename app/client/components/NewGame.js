import React from 'react';
import * as firebase from 'firebase';
import Row from 'react-bootstrap/lib/Row';
import Col from 'react-bootstrap/lib/Col';
import Well from 'react-bootstrap/lib/Well';
import Button from 'react-bootstrap/lib/Button';
import FormGroup from 'react-bootstrap/lib/FormGroup';
import Radio from 'react-bootstrap/lib/Radio';
import fetchJudge from 'utils/judges';

const possibleGames = [
  { name: "TicTacToe", type: 'ttt' },
  { name: "Quarto", type: 'q' },
];

export default class NewGame extends React.Component {

  static propTypes = {
    createGame: React.PropTypes.func,
    uid: React.PropTypes.string,
  }

  state = {
    type: null,
    options: {},
    error: null,
  }

  selectType = (e) => {
    this.setState({ type: e.target.value });
  }

  buildGameRadio = (opts) => {
    return (
      <Radio
        name="type"
        key={opts.type}
        value={opts.type}
        onChange={this.selectType}>
        {opts.name}
      </Radio>
    );
  }

  validateAndCreateGame = () => {
    var { type, options } = this.state;
    if(!this.state.type) {
      this.setState({error: 'No game selected'});
      return;
    }
    var judge = fetchJudge(type);
    var game = judge.newGame(options);
    game.players = this.setUpPlayers(options.gameType);
    game.nextPlayer = game.players[randomInteger(2)];
    this.props.createGame(game);
  }

  setUpPlayers(gameType) {
    var { uid } = this.props;
    switch(gameType) {
      case 'aivai': return ['ai', 'ai'];
      case 'aivh': return ['ai', uid];
      default: return [uid, uid];
    }
  }

  buildGameOptions() {
    var setOption = (e) => {
      this.setState({ options: { gameType: e.target.value } });
    };
    return (<div>
      <label>How do you want to play</label>
      <FormGroup>
        <Radio name="gameType" value="aivai" onChange={setOption}>
          Ai vs Ai
        </Radio>
        <Radio name="gameType" value="aivh" onChange={setOption}>
          Ai vs Human
        </Radio>
        <Radio name="gameType" value="hvh" onChange={setOption}>
          Human vs Human
        </Radio>
      </FormGroup>
    </div>);
  }

  render() {
    var { createGame } = this.props;
    var gameOptions = possibleGames.map(this.buildGameRadio)
    var { error } = this.state;
    var notice = error ? <p>{error}</p> : false;
    var gameChoices = this.buildGameOptions();

    return (
      <Well>
        <h2>New Game</h2>
        {notice}
        <FormGroup>
          {gameOptions}
        </FormGroup>
        {gameChoices}
        <Button bsStyle='primary' onClick={this.validateAndCreateGame}>Create Game</Button>
      </Well>
    );
  }
}

function randomInteger(i) {
  return Math.floor(Math.random() * i);
}
