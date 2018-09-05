import firebase from 'firebase';

// Required for side-effects
require('firebase/firestore');


const config = {
  apiKey: "AIzaSyB75ITbwG1Hi1WkRQY66-0GQD1NKx60_Jg",
  authDomain: "gochuco-comingsoon.firebaseapp.com",
  databaseURL: "https://gochuco-comingsoon.firebaseio.com",
  projectId: "gochuco-comingsoon",
  storageBucket: "gochuco-comingsoon.appspot.com",
  messagingSenderId: "256856668149"
};

const uiConfig = {
  signInFlow: 'popup',
  signInSuccessUrl: '/',
  signInOptions: [
    firebase.auth.GoogleAuthProvider.PROVIDER_ID
    // firebase.auth.EmailAuthProvider.PROVIDER_ID,
  ],
};

export default firebase.initializeApp(config);
export const db = firebase.firestore();
export const firebaseAuth = firebase.auth;
export const firebaseUI = uiConfig;
