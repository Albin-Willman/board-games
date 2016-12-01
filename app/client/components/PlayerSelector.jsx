import React from 'react';

import FormGroup from 'react-bootstrap/lib/FormGroup';
import FormControl from 'react-bootstrap/lib/FormControl';
import ControlLabel from 'react-bootstrap/lib/ControlLabel';

export default class PlayerSelector extends React.Component {
  static propTypes = {
    options: React.PropTypes.array,
    value: React.PropTypes.object,
    setPlayer: React.PropTypes.func,
    index: React.PropTypes.number,
  }
  setPlayer = (e) => {
    var { index, setPlayer, options } = this.props;
    setPlayer(index, options[e.target.value]);
  }

  buildOption(data, i) {
    return <option key={i} value={i}>{data.username}</option>;
  }

  render() {
    var { index, options, value } = this.props;
    var optionElements = options.map(this.buildOption);
    return (
      <FormGroup>
        <ControlLabel>
          Select player {index + 1}
        </ControlLabel>
        <FormControl componentClass="select" placeholder="select" onChange={this.setPlayer}>
          <option>Select player</option>
          {optionElements}
        </FormControl>
      </FormGroup>
    );
  }
}
