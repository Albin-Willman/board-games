import * as firebase from 'firebase';
import { browserHistory } from 'react-router';

export function login() {
  return () => {
    var provider = new firebase.auth.GoogleAuthProvider();
    firebase.auth().signInWithPopup(provider).then(function(result) {
      browserHistory.push('/');
      console.log('sign in', result.credential.accessToken);
    });
  }
}
