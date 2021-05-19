import { firebase } from '@firebase/app';
import '@firebase/auth';
import '@firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyAeGnZRcK1pHenf0YQvCOIfj2VGkf4_8Mo',
  authDomain: 'pen-and-paper-c3709.firebaseapp.com',
  projectId: 'pen-and-paper-c3709',
  storageBucket: 'pen-and-paper-c3709.appspot.com',
  messagingSenderId: '372252257957',
  appId: '1:372252257957:web:d278e493d9692a6c61674c',
};

firebase.initializeApp(firebaseConfig);
// firebase.analytics();

// utils
const db = firebase.firestore();
const auth = firebase.auth();
const usersCollection = db.collection('users');
const roomsCollection = db.collection('rooms');

// collection references

// export utils/refs
export {
  db,
  auth,
  usersCollection,
  roomsCollection,
  firebase,
};
