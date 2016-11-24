import React from 'react';
import Quarto from '../../components/Boards/Quarto';

export const SELECT_NEXT = 'selectNext@quarto';
export const PLACE_PIECE = 'placePiece@quarto';

export function newGame(players){
  var board = new Array(16);
  board.fill('-');
  var pieces = [];
  for(var i = 0; i < 16; i += 1) {
    pieces.push(i);
  }
  var nextPiece = '-';
  players = setUpPlayers(players);
  var nextPlayer = Math.random > 0.5 ? 0 : 2;

  var game = {
    name: 'Quarto',
    type: 'q',
    actions: [],
    board,
    pieces,
    players,
    nextPlayer,
    nextPiece,
  };
  return game;
}

export function makeMove(game, action, uid) {
  var newGame = getNewGameState(game, action);
  var previousActions = game.actions || [];
  newGame.actions = [ ...previousActions, action];
  if(newGame.pieces.length === 0) {
    newGame.gameEnded = true;
  }
  var winningLine = checkForWin(newGame.board);
  if(winningLine) {
    newGame.winningLine = winningLine;
    newGame.gameEnded = true;
    newGame.winner = (game.actions.length % 2) + 1;
  }
  return newGame;
}

export function renderGame(game, makeAndSaveMove) {
  return (<Quarto
              game={game}
              makeMove={makeAndSaveMove}/>);
}

function setUpPlayers(players) {
  return [
    players[0],
    players[1],
    players[1],
    players[0],
  ];
}

function checkForWin(board) {
  return checkHorizontalLines(board) ||
          checkVerticalLines(board) ||
          checkDiagonalLines(board) ||
          false;
}

function checkDiagonalLines(board) {
  var line = [0, 5, 10, 15];
  if(checkLine(board, line)) {
    return line;
  }
  line = [3, 6, 9, 12];
  if(checkLine(board, line)) {
    return line;
  }
}

function checkVerticalLines(board) {
  for (var i = 0; i < 4; i += 1) {
    var line = [];
    for(var j = 0; j < 16; j += 4) {
      line.push(i+j);
    }
    if(checkLine(board, line)) {
      return line;
    }
  }
}

function checkHorizontalLines(board){
  for (var i = 0; i < 16; i += 4) {
    var line = [];
    for(var j = 0; j < 4; j += 1) {
      line.push(i+j);
    }
    if(checkLine(board, line)) {
      return line;
    }
  }
}

function checkLine(board, line) {
  var win = 15;
  var winReverse = 15;
  for(var i = 0; i < 4; i += 1) {
    win = win & board[line[i]];
    winReverse = winReverse & (15-board[line[i]]);
  }
  if(win > 0 || winReverse > 0){
    return true;
  }
  return false;
}

function getNewGameState(game, action) {
  if(action.action === SELECT_NEXT) {
    return selectNext(game, action.payload);;
  }
  return placePiece(game, action.payload);
}

function selectNext(game, piece) {
  return { ...game,
    nextPiece: piece,
  };
}

function placePiece(game, slot) {
  var board = [ ...game.board ];
  board[slot] = game.nextPiece;
  var pieces = [ ...game.pieces ];

  pieces = pieces.filter((p) => { return p !== game.nextPiece });

  return { ...game,
    nextPiece: '-',
    board,
    pieces,
  };
}
