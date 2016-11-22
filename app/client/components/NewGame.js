import React from 'react';
import * as firebase from 'firebase';
import Row from 'react-bootstrap/lib/Row';
import Col from 'react-bootstrap/lib/Col';
import Well from 'react-bootstrap/lib/Well';
import Button from 'react-bootstrap/lib/Button';
import FormGroup from 'react-bootstrap/lib/FormGroup';
import Radio from 'react-bootstrap/lib/Radio';

const possibleGames = [
  { name: "TicTacToe", type: 'ttt' },
  { name: "Quarto", type: 'q' },
];

export default class NewGame extends React.Component {

  static propTypes = {
    createGame: React.PropTypes.func,
  }

  state = {
    type: null,
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
    var { type } = this.state;
    if(!this.state.type) {
      this.setState({error: 'No game selected'});
      return;
    }
    this.props.createGame(type);
  }

  render() {
    var { createGame } = this.props;
    var gameOptions = possibleGames.map(this.buildGameRadio)
    var { error } = this.state;
    var notice = error ? <p>{error}</p> : false;

    return (
      <Well>
        <h2>New Game</h2>
        {notice}
        <FormGroup>
          {gameOptions}
        </FormGroup>
        <Button bsStyle='primary' onClick={this.validateAndCreateGame}>Create Game</Button>
      </Well>
      );
    }
  }
