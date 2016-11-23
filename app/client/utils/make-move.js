export default function(ref, game, judge, uid, action) {
  if(game.nextPlayer === uid){
    action.uid = uid;
    var newGame = judge.makeMove(game, action);
    newGame.nextPlayer = getNextPlayer(game, uid);
    ref.set(newGame);
  }
}

function getNextPlayer(game, uid) {
  var { nextPlayer, players, gameEnded } = game;
  if(gameEnded) {
    return '-';
  }
  if(nextPlayer !== uid) {
    return nextPlayer;
  }
  var index = (players.indexOf(uid) + 1) % players.length;
  return players[index];
}
