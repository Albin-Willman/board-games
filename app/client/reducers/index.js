import { gamesReducer } from 'reducers/games-reducer.jsx';
import { profileReducer } from 'reducers/profile-reducer.jsx';
import { newGameReducer } from 'reducers/new-game-reducer.jsx';
import { appReducer } from 'reducers/app-reducer.jsx';

export const reducers = {
  games: gamesReducer,
  profile: profileReducer,
  newGame: newGameReducer,
  app: appReducer,
};
