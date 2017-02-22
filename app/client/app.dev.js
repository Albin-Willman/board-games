/**
 * ReactClient
 * app startup script for development purpose
 */

/* eslint no-process-env:0 */


require('./index.scss');

import React from 'react';
import ReactDOM from 'react-dom';

import { Main } from 'utils/main';
import { makeStore } from 'utils/store';
import initialState from 'fixtures/initial-state-dev.fixture';

import routes from 'config/routes';
var appStore;

export function start(targetEl, payload) {
  initialState.payload = payload;
  appStore = makeStore(initialState);

  ReactDOM.render((
    <Main
      routes={routes}
      store={appStore} />
    ), targetEl);
}

export function dispatch(action) {
  appStore.dispatch(action);
}
