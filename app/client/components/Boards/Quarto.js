import React from 'react';

import { SELECT_NEXT, PLACE_PIECE } from '../../utils/games/Quarto';
export default class Board extends React.Component {

  static propTypes = {
    game: React.PropTypes.shape({
      winningLine: React.PropTypes.array,
      gameEnded: React.PropTypes.bool,
      board: React.PropTypes.array,
      pieces: React.PropTypes.array,
      nextPiece: React.PropTypes.string,
    }),
    makeMove: React.PropTypes.func,
  }

  buildPieceClass = (i) => {
    var classes = ['piece'];
    if(i & 1) {
      classes.push('tall');
    }
    if(i & 2) {
      classes.push('square');
    }
    if(i & 4) {
      classes.push('dark');
    }
    if(i & 8) {
      classes.push('flat');
    }
    return classes;
  }

  buildCell = (data, i) => {
    var { makeMove, game } = this.props;
    var { winningLine, nextPiece, gameEnded } = game;
    var classes = this.buildPieceClass(data);
    var clickFunction = () => {};
    if(winningLine && winningLine.indexOf(i) !== -1) {
      classes.push('winning');
    }

    if(data === '-') {
      classes.push('free');
      if(!gameEnded && nextPiece !== '-') {
        clickFunction = () => {
          makeMove({ payload: i, action: PLACE_PIECE });
        };
      }
    }
    return <div key={i} className={classes.join(' ')} onClick={clickFunction}></div>;
  }

  buildPiece = (i) => {
    var { makeMove, game } = this.props;
    var { gameEnded, nextPiece } = game;
    var classes = this.buildPieceClass(i);
    if(nextPiece === i) {
      classes.push('selected');
    }
    var clickFunction = () => {};
    if(!gameEnded && nextPiece === '-') {
      clickFunction = () => {
        makeMove({ payload: i, action: SELECT_NEXT });
      };
    }

    return <div key={i} className={classes.join(' ')} onClick={clickFunction}></div>;
  }

  render() {
    var { board, gameEnded, pieces, nextPiece } = this.props.game;
    if(!board) {
      return false;
    }
    var cells = board.map(this.buildCell);
    pieces = (pieces || []).map(this.buildPiece);
    var className = 'table quarto';
    var piecesClass = 'pieces';
    var boardClass = 'board';
    if(gameEnded) {
      className = `${className} ended`;
    } else {
      if(nextPiece === '-') {
        piecesClass = `${piecesClass} select-next`;
      } else {
        boardClass = `${boardClass} place-piece`;
      }
    }
    return (
      <div className={className}>
        <div className={piecesClass}>{pieces}</div>
        <div className={boardClass}>{cells}</div>
        <details>
          <summary>
            Rules
          </summary>
          <h2>Quarto</h2>
          <h3>Pieces</h3>
          <p>
            There are 16 unique pieces in Quarto each pieces has 4 attributes that can have one of
            two values. In this digital version each attribute is represented by on quarter of the
            circle representing the piece, the quarter can be silver or gold.
          </p>
          <h3>Game play</h3>
          <p>
            One player starts by selecting a piece then the other player places it on an unoccupied
            slot on the board. After placeing a piece the second player selects a new piece for the
            first player. This goes on untill one player has won or all pieces are on the board.
          </p>
          <h3>Winning</h3>
          <p>
            A player wins if a piece that player places on the board completes a row or a group in
            such a way that there are four pieces sharing the same value of any one attribute. For
            example if there are four pieces with a golden top on a single row.
          </p>
        </details>
      </div>
    );
  }
}
