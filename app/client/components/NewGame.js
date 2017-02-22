import React from 'react';
import Row from 'react-bootstrap/lib/Row';
import Col from 'react-bootstrap/lib/Col';
import Well from 'react-bootstrap/lib/Well';
import Button from 'react-bootstrap/lib/Button';
import FormGroup from 'react-bootstrap/lib/FormGroup';
import Radio from 'react-bootstrap/lib/Radio';
import fetchJudge from 'utils/judges';
import PlayerSelector from 'components/PlayerSelector.jsx';

const possibleGames = [
  { name: "TicTacToe", type: 'ttt' },
  { name: "Quarto", type: 'q' },
];

export default class NewGame extends React.Component {

  static propTypes = {
    createGame: React.PropTypes.func,
    uid: React.PropTypes.string,
    publicPlayer: React.PropTypes.bool,
    players: React.PropTypes.array,
  }

  state = {
    type: null,
    options: {},
    error: null,
    selectedPlayers: [],
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
    if(!type) {
      this.setState({error: 'No game selected'});
      return;
    }
    var players = this.setUpPlayers();
    if(players.length < 2) {
      this.setState({error: 'To few players'});
      return;
    }
    var judge = fetchJudge(type);
    var game = judge.newGame(players);
    game.players = game.players || players;
    game.nextPlayer = game.nextPlayer || randomInteger(game.players.length);
    this.props.createGame(game);
  }

  setUpPlayers() {
    var { uid, publicPlayer } = this.props;
    if(!publicPlayer) {
      return [
        { id: uid, username: 'Player 1' },
        { id: uid, username: 'Player 2' },
      ];
    }
    var { selectedPlayers } = this.state;
    var allPlayers = selectedPlayers.filter((e) => { return e !== null; })
    return allPlayers;

  }

  buildPlayerOptions() {
    var { players, publicPlayer } = this.props;
    if(!publicPlayer) {
      return <p>
        Since you have not accepted to play against other players only games against yourself
        is possible.
      </p>
    }

    var { type, selectedPlayers } = this.state;
    if(!type) {
      return false;
    }
    var setOption = (index, value) => {
      var { selectedPlayers } = this.state;
      selectedPlayers[index] = value;
      this.setState({ selectedPlayers });
    };

    var judge = fetchJudge(type);
    var playerDropdowns = []
    for(var i = 0; i < 2; i += 1) {
      playerDropdowns.push(
        <PlayerSelector
          key={i}
          options={players}
          value={selectedPlayers[i]}
          setPlayer={setOption}
          index={i} />
      );
    }
    return playerDropdowns;
  }

  render() {
    var { createGame } = this.props;
    var gameOptions = possibleGames.map(this.buildGameRadio)
    var { error } = this.state;
    var notice = error ? <p>{error}</p> : false;
    var gameChoices = this.buildPlayerOptions();

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
