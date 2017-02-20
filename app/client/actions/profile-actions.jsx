export const SET_PROFILE = 'setProfilie@Profilie';

export function setProfile(profile) {
  return {
    type: SET_PROFILE,
    payload: profile,
  };
}
