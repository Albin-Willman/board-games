import firebase from 'utils/firebase.jsx';
import { browserHistory } from 'react-router';
import { setLoggedIn } from 'actions/app-actions.jsx';

export function connectToUserState() {
  return dispatch => {
    firebase.auth().onAuthStateChanged(user => {
      dispatch(setLoggedIn(null !== user))
      if(user) {
        console.log('Logged in: ', user);
        if(window.location.pathname === '/login') {
          browserHistory.push('/');
        }
      } else {
        console.log('Not logged in');
      }
    });
  }
}
