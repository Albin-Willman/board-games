import * as firebase from 'firebase';
import * as config from '../config/firebase.config.js';
firebase.initializeApp(config);

export default firebase;