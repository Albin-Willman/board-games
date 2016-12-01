export default function(ref, game, judge, uid, action) {
  if(game.players[game.nextPlayer].id === uid) {
    action.uid = uid;
    var newGame = judge.makeMove(game, action);
    newGame.nextPlayer = getNextPlayer(game);
    ref.set(newGame);
  }
}

function getNextPlayer(game) {
  var { nextPlayer, players, gameEnded } = game;
  if(gameEnded) {
    return '-';
  }
  return (nextPlayer + 1) % players.length;
}
