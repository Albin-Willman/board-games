import firebase from 'utils/firebase.jsx';

export default function requireAuth(nextState, replace) {
  if(firebase.auth().currentUser === null) {
    replace({
      pathname: '/login',
      state: { nextPathname: nextState.location.pathname },
    });
  }
}
