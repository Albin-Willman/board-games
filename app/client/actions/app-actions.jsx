export const SET_LOGGED_IN = 'loggedIn@App';

export function setLoggedIn(loggedIn) {
  return {
    type: SET_LOGGED_IN,
    payload: loggedIn,
  };
}
