import React, { Component } from 'react';
import * as firebase from 'firebase';
import * as config from '../config/firebase.config.js';
firebase.initializeApp(config);
var firstTry = true;
export default function requireAuth(nextState, replace) {
  if(null === firebase.auth().currentUser) {
    replace({
      pathname: '/login',
      state: { nextPathname: nextState.location.pathname }
    })
  }
}
