export const SET_PLAYERS = 'setPlayers@NewGame';
export const SET_GAME_INVITES = 'setGameInvites@NewGame'

export function setPlayers(players, currentPlayer) {
  return {
    type: SET_PLAYERS,
    payload: { players, currentPlayer },
  };
}

export function setGameInvites(invites = {}) {
  return {
    type: SET_GAME_INVITES,
    payload: invites,
  };
}
