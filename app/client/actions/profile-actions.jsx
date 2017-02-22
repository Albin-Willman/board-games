export const SET_PROFILE = 'setProfilie@Profile';

export function setProfile(profile) {
  return {
    type: SET_PROFILE,
    payload: profile,
  };
}
