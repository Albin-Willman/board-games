import React from 'react';
import firebase from 'utils/firebase.jsx';
var firstTry = true;
export default function requireAuth(nextState, replace) {
  if(null === firebase.auth().currentUser) {
    replace({
      pathname: '/login',
      state: { nextPathname: nextState.location.pathname },
    });
  }
}
