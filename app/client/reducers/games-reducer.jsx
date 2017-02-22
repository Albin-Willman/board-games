import {
  SET_GAME,
  SET_GAMES,
} from 'actions/game-actions.jsx';

export const INITIAL_STATE = {
  games: [],
  game: {},
};

export function gamesReducer(state = INITIAL_STATE, action) {
  var { type, payload } = action;
  switch (type) {
    case SET_GAME:
      return { ...state,
        game: payload,
      };
    case SET_GAMES:
      var games = [];
      for(var key in payload) {
        games.push({ ...payload[key],
          key,
        });
      }
      return { ...state, games };
    default: return state;
  }
}
