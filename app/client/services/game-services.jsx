import { setGame } from 'actions/game-actions.jsx';

import fetchJudge from 'utils/judges';
import doMakeMove from 'utils/make-move';
import firebase from 'utils/firebase.jsx';

var ref;
export function connectToGame(gameId) {
  return (dispatch) => {
    dispatch(setGame({}));
    ref = firebase.database().ref(`games/${gameId}`);

    ref.on('value', (snap) => {
      dispatch(setGame(snap.val()));
    });
  };
}

export function disconnectFromGame() {
  return () => {
    ref.off();
  };
}

export function makeMove(action) {
  return (dispatch, getState) => {
    var { game } = getState().games;
    var uid = firebase.auth().currentUser.uid;
    var judge = fetchJudge(game.type);
    doMakeMove(ref, game, judge, uid, action);
  };
}
