import firebase from 'utils/firebase.jsx';
import { setPlayers } from 'actions/new-game-actions.jsx';
import { browserHistory } from 'react-router';

var playersRef;
export function connectToNewGame() {
  return (dispatch) => {
    dispatch(setPlayers({}));
    playersRef = firebase.database().ref(`public-users`)

    playersRef.on('value', (snap) => {
      dispatch(setPlayers(snap.val(), firebase.auth().currentUser.uid));
    });
  };
}

export function createGame(game) {
  return () => {
    var userId = firebase.auth().currentUser.uid;
    var permissionsRef = firebase.database().ref(`permissions/${userId}/games`);
    var gamesRef = firebase.database().ref('games');


    game.users = {};
    game.users[userId] = true;

    var permission = {
      access: true,
      name: game.name
    };
    var gamesRef = gamesRef;
    var ref = permissionsRef.push(permission, function() {
      var games = {};
      games[ref.key] = game;
      inviteOtherPlayers(game.players, ref.key, game.name);

      gamesRef.update(games,
        (error) => {
          if(error) {
            console.log(error);
          } else {
            browserHistory.push(`/games/${ref.key}`);
          }
      });
    });
  }
}

export function disconnectFromNewGame() {
  return () => {
    playersRef.off();
  };
}

function inviteOtherPlayers(players, gameId, gameName) {
  var userId = firebase.auth().currentUser.uid;
  for(var i = 0; i < players.length; i += 1) {
    var { id } = players[i];
    if(id !== userId && id !== 'ai') {
      invitePlayer(id, gameId, gameName);
    }
  }
}

function invitePlayer(playerId, gameId, gameName) {
  var ref = firebase.database().ref(`game-offers/${playerId}/${gameId}`).set(gameName);
}



