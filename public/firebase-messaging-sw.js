// // Scripts for firebase and firebase messaging
// importScripts("https://www.gstatic.com/firebasejs/8.2.0/firebase-app.js");
// importScripts("https://www.gstatic.com/firebasejs/8.2.0/firebase-messaging.js");

// // Initialize the Firebase app in the service worker by passing the generated config
// const firebaseConfig = {
//   apiKey: "AIzaSyBAN1X9ZEoA815GP3wU2UU6JtQhDdIlan8",
//   authDomain: "notification-realtime-2a4c6.firebaseapp.com",
//   projectId: "notification-realtime-2a4c6",
//   storageBucket: "notification-realtime-2a4c6.appspot.com",
//   messagingSenderId: "251388469148",
//   appId: "1:251388469148:web:b68e6ecf742aa07c2bf259",
// };

// firebase.initializeApp(firebaseConfig);

// // Retrieve firebase messaging
// const messaging = firebase.messaging();

// messaging.onBackgroundMessage(function (payload) {
//   console.log("Received background message ", payload);
//   const jsonObject = JSON.parse(payload.data.notification);
//   // Customize notification here
//   const notificationTitle = jsonObject.title;
//   const notificationOptions = {
//     body: jsonObject.message,
//   };
//   self.registration.showNotification(notificationTitle, notificationOptions);
// });
