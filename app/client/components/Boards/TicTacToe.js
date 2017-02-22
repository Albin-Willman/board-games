import React from 'react';
export default class Board extends React.Component {

  static propTypes = {
    board: React.PropTypes.array,
    winningLine: React.PropTypes.array,
    makeMove: React.PropTypes.func,
    gameEnded: React.PropTypes.bool,
  }

  buildCell = (data, i) => {
    var { winningLine, makeMove } = this.props;
    var className = 'cell ';
    clickFunction = () => {};
    if(winningLine && winningLine.indexOf(i) !== -1) {
      className += 'winning ';
    }

    if(data === 0) {
      className += 'free';
      if(!winningLine) {
        var clickFunction = () => {
          makeMove({ payload: i });
        };
      }
    } else if(data === 1) {
      className += 'cross';
    } else if(data === 2) {
      className += 'circle';
    }
    return <div key={i} className={className} onClick={clickFunction}></div>;

  }

  render() {
    var { board, gameEnded } = this.props;
    if(!board) {
      return false;
    }
    var cells = board.map(this.buildCell);
    var className = 'board';
    if(gameEnded) {
      className = `${className} ended`;
    }
    return (
      <div>
        <div className="board">
          {cells}
        </div>
        <details>
          <summary>
            Rules
          </summary>
          <h2>Tic tac toe</h2>
          <h3>Game play</h3>
          <p>
            The players takes turns placing markers on the board until the board is full or
            one player has three markers in a row.
          </p>
        </details>
      </div>
    );
  }
}
