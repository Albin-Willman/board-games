import * as ttt from 'utils/games/TicTacToe';
import * as q from 'utils/games/Quarto';

export default function fetchJudge(type) {
  var judge = {};
  switch(type) {
    case 'ttt': return ttt;
    case 'q':   return q;
    default: {
      return {
        newGame: () => {},
        makeMove: () => {}
      };
    }
  }
}