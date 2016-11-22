import React from 'react';

import { SELECT_NEXT, PLACE_PIECE } from 'utils/games/Quarto';
export default class Board extends React.Component {

  static propTypes = {
    game: React.PropTypes.shape({
      winningLine: React.PropTypes.array,
      gameEnded: React.PropTypes.bool,
      board: React.PropTypes.array,
      pieces: React.PropTypes.array,
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
        var clickFunction = () => {
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
      var clickFunction = () => {
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
    var pieces = (pieces || []).map(this.buildPiece);
    var className = 'table quarto';
    var piecesClass = 'pieces';
    var boardClass = 'board';
    if(gameEnded) {
      className = `${className} ended`
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
      </div>
      );
    }
  }
