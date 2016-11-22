/**
 * ReactClient
 * app startup script for production purpose
 */

/* eslint no-process-env:0 */
console.log('NODE_ENV:', process.env.NODE_ENV);

require('./index.scss');

import React from 'react';
import ReactDOM from 'react-dom';

import routes from 'config/routes';

export function start(targetEl, payload) {
  ReactDOM.render(routes, targetEl);
}
