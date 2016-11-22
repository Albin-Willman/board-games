import React from 'react';
import TicTacToe from 'components/Boards/TicTacToe';

const lines = [
  [0,1,2],
  [3,4,5],
  [6,7,8],

  [0,4,8],
  [2,4,6],

  [0,3,6],
  [1,4,7],
  [2,5,8],
];

export function newGame(){
  var board = new Array(9);
  board.fill(0);
  var game = { name: 'TicTacToe', type: 'ttt', actions: [], board }
  return game;
}
function checkLine(line, board) {
  var values = line.map((i) => { return board[i]});
  var base = values[0];
  for(var j = 1; j < values.length; j += 1) {

    if(base !== values[j]) {
      return 0;
    }
  }
  return base;
}

export function makeMove(game, action) {
  var actions = game.actions || [];
  var player = (actions.length % 2) + 1;
  var board = [...game.board];
  board[action.payload] = player;
  return { ...game,
    actions: [...actions, action],
    board: board,
    winningLine: checkWin(board),
  };
}

export function renderGame(game, makeAndSaveMove) {
  var gameEnded = !!(game.actions && game.actions.length === 9 || game.winningLine);
  return (<TicTacToe
              board={game.board}
              gameEnded={gameEnded}
              winningLine={game.winningLine}
              makeMove={makeAndSaveMove}/>);
}

function checkWin(board) {
  for(var i = 0; i < lines.length; i += 1) {
    var lineValue = checkLine(lines[i], board);
    if(lineValue > 0) {
      return lines[i];
    }
  }

  return null;
}