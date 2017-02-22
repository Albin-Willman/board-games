import firebase from 'utils/firebase.jsx';
import { setGames } from 'actions/game-actions.jsx';
import { setGameInvites } from 'actions/new-game-actions.jsx';
import { browserHistory } from 'react-router';

var gamesRef;
var invitesRef;
export function connectHomePage() {
  return dispatch => {
    var userId = firebase.auth().currentUser.uid;
    gamesRef = firebase.database().ref(`permissions/${userId}/games`);

    gamesRef.on('value', (snap) => {
      dispatch(setGames(snap.val()));
    });
    invitesRef = firebase.database().ref(`game-offers/${userId}`);
    invitesRef.on('value', (snap) => {
      dispatch(setGameInvites(snap.val()));
    });
  };
}

export function disconnectHomePage() {
  return () => {
    gamesRef.off();
    invitesRef.off();
  };
}

export function acceptInvite(name, gameId) {
  return dispatch => {
    var permission = { access: true, name };
    gamesRef.child(gameId).set(permission, (error) => {
      if(error) {
        console.log(error);
      } else {
        browserHistory.push(`/games/${gameId}`);
      }
    });
    dispatch(removeInvite(gameId));
  };
}

export function removeInvite(gameId) {
  return () => {
    invitesRef.child(gameId).remove();
  };
}
