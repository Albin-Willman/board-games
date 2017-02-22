export const SET_GAME = 'setGame@Game';
export const SET_GAMES = 'setGames@Game';

export function setGame(game) {
  return {
    type: SET_GAME,
    payload: game,
  };
}

export function setGames(games) {
  return {
    type: SET_GAMES,
    payload: games,
  };
}
