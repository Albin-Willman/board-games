import {
  SET_PLAYERS,
  SET_GAME_INVITES,
} from 'actions/new-game-actions.jsx';

export const INITIAL_STATE = {
  invites: [],
  players: [],
  publicPlayer: false,
  currentUser: '',
};

export function newGameReducer(state = INITIAL_STATE, action) {
  var { type, payload } = action;
  switch (type) {
    case SET_PLAYERS:
      var players = [];
      for(var id in payload.players) {
        players.push({ ...payload.players[id], id });
      }
      return { ...state, players,
        currentUser: payload.currentPlayer,
        publicPlayer: !!payload.players[payload.currentPlayer],
      };
    case SET_GAME_INVITES:
      var invites = [];
      for(var key in payload) {
        invites.push({ name: payload[key], key });
      }
      return { ...state, invites };
    default: return state;
  }
}
