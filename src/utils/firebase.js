// import { initializeApp } from "firebase/app";
// import { getMessaging, getToken, onMessage } from "firebase/messaging";
// // Replace this firebaseConfig object with the congurations for the project you created on your firebase console.
// var firebaseConfig = {
//   apiKey: "AIzaSyBAN1X9ZEoA815GP3wU2UU6JtQhDdIlan8",
//   authDomain: "notification-realtime-2a4c6.firebaseapp.com",
//   projectId: "notification-realtime-2a4c6",
//   storageBucket: "notification-realtime-2a4c6.appspot.com",
//   messagingSenderId: "251388469148",
//   appId: "1:251388469148:web:b68e6ecf742aa07c2bf259",
// };

// initializeApp(firebaseConfig);
// const messaging = getMessaging();

// export const requestForToken = () => {
//   return getToken(messaging, {
//     vapidKey: `BH2Y-NM6QWxWbksgvjTu1XDxYZ8RnRjJg2q2I5-b91LIG4a2A69UI4923Mk9jzx3mjLivQZInZKe0VaZgUTd2uE`,
//   })
//     .then((currentToken) => {
//       if (currentToken) {
//         console.log("current token for client: ", currentToken);
//         // Perform any other neccessary action with the token
//       } else {
//         // Show permission request UI
//         console.log(
//           "No registration token available. Request permission to generate one."
//         );
//       }
//     })
//     .catch((err) => {
//       console.log("An error occurred while retrieving token. ", err);
//     });
// };

// export const onMessageListener = () =>
//   new Promise((resolve) => {
//     onMessage(messaging, (payload) => {
//       console.log("payload", payload);
//       resolve(payload);
//     });
//   });
