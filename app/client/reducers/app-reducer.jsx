import {
  SET_LOGGED_IN,
} from 'actions/app-actions.jsx';

export const INITIAL_STATE = {
  loggedIn: false,
};

export function appReducer(state = INITIAL_STATE, action) {
  var { type, payload } = action;
  switch (type) {
    case SET_LOGGED_IN:
      return { ...state,
        loggedIn: payload,
      };
    default: return state;
  }
}
