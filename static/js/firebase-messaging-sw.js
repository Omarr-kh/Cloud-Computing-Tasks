// firebase-messaging-sw.js
importScripts(
  "https://www.gstatic.com/firebasejs/11.0.2/firebase-app-compat.js"
);
importScripts(
  "https://www.gstatic.com/firebasejs/11.0.2/firebase-messaging-compat.js"
);

// async function initializeFirebase() {
//   const response = await fetch("/api/firebase-config/");
//   const config = await response.json();

//   firebase.initializeApp(config);
// }

const firebaseConfig = {
  apiKey: "AIzaSyDtuVBehpn3WJq8rlgBZ5WSfTCcs6o7b9c",
  authDomain: "chatroom-a8d76.firebaseapp.com",
  databaseURL: "https://chatroom-a8d76-default-rtdb.firebaseio.com",
  projectId: "chatroom-a8d76",
  storageBucket: "chatroom-a8d76.firebasestorage.app",
  messagingSenderId: "995255543988",
  appId: "1:995255543988:web:cd80d5313a5c63a929cfe1",
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// initializeFirebase();
const messaging = firebase.messaging();

// Handle background messages
messaging.onBackgroundMessage((payload) => {
  console.log("Received background message:", payload);

  // Customize the notification here
  const notificationTitle = payload.notification.title || "New Notification";
  const notificationOptions = {
    body: payload.notification.body || "You have a new message",
  };

  // Show the notification
  self.registration.showNotification(notificationTitle, notificationOptions);
});
