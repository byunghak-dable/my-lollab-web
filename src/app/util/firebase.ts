import firebase from 'firebase/app';
import 'firebase/messaging';

firebase.initializeApp({
  apiKey: 'AIzaSyCaCFYOxE7FhBNr0hIyM9DcwRf5Qp7B_eA',
  authDomain: 'lollab-9919a.firebaseapp.com',
  projectId: 'lollab-9919a',
  storageBucket: 'lollab-9919a.appspot.com',
  messagingSenderId: '124520287892',
  appId: '1:124520287892:web:b05b94b1a7d74fcbbfae81',
  measurementId: 'G-9ETXV4JS2C',
}); // Initialize Firebase

export const fcm = firebase.messaging();
