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
          makeMove(i);
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
    var cells = board.map(this.buildCell)
    var className = 'board';
    if(gameEnded) {
      className = `${className} ended`
    }
    return (
      <div className="board">
        {cells}
      </div>
      );
    }
  }
