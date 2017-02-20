export const SET_GAME = 'setGame@Game';

export function setGame(game) {
  return {
    type: SET_GAME,
    payload: game,
  };
}