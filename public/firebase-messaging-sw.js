importScripts('https://www.gstatic.com/firebasejs/8.4.1/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/8.4.1/firebase-messaging.js');

firebase.initializeApp({
  apiKey: 'AIzaSyCaCFYOxE7FhBNr0hIyM9DcwRf5Qp7B_eA',
  authDomain: 'lollab-9919a.firebaseapp.com',
  projectId: 'lollab-9919a',
  storageBucket: 'lollab-9919a.appspot.com',
  messagingSenderId: '124520287892',
  appId: '1:124520287892:web:b05b94b1a7d74fcbbfae81',
  measurementId: 'G-9ETXV4JS2C',
});

const fcm = firebase.messaging();
fcm.onBackgroundMessage((payload) => {
  console.log('[firebase-messaging-sw.js] Received background message ', payload);
  // Customize notification here
  const notificationTitle = 'Background Message Title';
  const notificationOptions = {
    body: 'Background Message body.',
    icon: '/firebase-logo.png',
  };
  self.registration.showNotification(notificationTitle, notificationOptions);
});
