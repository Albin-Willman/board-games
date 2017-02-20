import {
  SET_GAME,
} from 'actions/game-actions.jsx';

export const INITIAL_STATE = {
  game: {},
};

export function gamesReducer(state = INITIAL_STATE, action) {
  var { type, payload } = action;
  switch (type) {
    case SET_GAME:
      return { ...state,
        game: payload,
      };
    default: return state;
  }
}
