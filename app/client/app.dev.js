/**
 * ReactClient
 * app startup script for development purpose
 */

/* eslint no-process-env:0 */


require('./index.scss');

import React from 'react';
import ReactDOM from 'react-dom';

import routes from 'config/routes';


export function start(targetEl, payload) {
  ReactDOM.render(routes, targetEl);
}
