import { setProfile  } from 'actions/profile-actions.jsx';
import firebase from 'utils/firebase.jsx';

var ref;
export function connectToProfile() {
  return (dispatch) => {
    var userId = firebase.auth().currentUser.uid;

    dispatch(setProfile({}));
    ref = firebase.database().ref(`public-users/${userId}`);

    ref.on('value', (snap) => {
      dispatch(setProfile(snap.val() || {}));
    });
  };
}

export function disconnectFromProfile() {
  return () => {
    ref.off();
  };
}

export function updateProfile(data) {
  return () => {
    ref.set(data);
  };
}

export function removeProfile() {
  return () => {
    ref.remove();
  };
}
