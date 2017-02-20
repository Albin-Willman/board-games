import fetchJudge from 'utils/judges';
import doMakeMove from 'utils/make-move';

export default function(game, ref) {
  if(game.players[game.nextPlayer].id !== 'ai' ||
    game.gameEnded) {
    return;
  }
  startTurn(game, ref)
    .then(computeAlternatives)
    .then(rankMoves)
    .then(selectMove)
    .then(makeMove);
}

function startTurn(game, ref) {
  return new Promise((fulfill, reject) => {
    if(!game || !ref) {
      reject('needs input');
    }
    fulfill({ game, ref });
  });
}

function computeAlternatives(data) {
  return { ...data,

  };
}

function rankMoves(data) {
  return { ...data,

  };
}

function selectMove(data) {
  return { ...data,

  };
}

function makeMove(data) {
  return { ...data,

  };
}