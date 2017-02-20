import {
  SET_PROFILE,
} from 'actions/profile-actions.jsx';

export const INITIAL_STATE = {
  profile: {},
};

export function profileReducer(state = INITIAL_STATE, action) {
  var { type, payload } = action;
  switch (type) {
    case SET_PROFILE:
      return { ...state,
        profile: payload,
      };
    default: return state;
  }
}
