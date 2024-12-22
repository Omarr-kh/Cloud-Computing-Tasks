import { initializeApp } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-app.js";
import {
  getAnalytics,
  logEvent,
} from "https://www.gstatic.com/firebasejs/11.1.0/firebase-analytics.js";
import {
  getAuth,
  onAuthStateChanged,
} from "https://www.gstatic.com/firebasejs/11.1.0/firebase-auth.js";

const firebaseConfig = {
  apiKey: "AIzaSyDtuVBehpn3WJq8rlgBZ5WSfTCcs6o7b9c",
  authDomain: "chatroom-a8d76.firebaseapp.com",
  databaseURL: "https://chatroom-a8d76-default-rtdb.firebaseio.com",
  projectId: "chatroom-a8d76",
  storageBucket: "chatroom-a8d76.firebasestorage.app",
  messagingSenderId: "995255543988",
  appId: "1:995255543988:web:cd80d5313a5c63a929cfe1",
  measurementId: "G-RBZ9881BDP",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);

// Track first-time login
onAuthStateChanged(auth, (user) => {
  if (user) {
    // Check if this is the user's first login
    const creationTime = user.metadata.creationTime;
    const lastSignInTime = user.metadata.lastSignInTime;

    if (creationTime === lastSignInTime) {
      console.log("first time login mother father");

      // This is a first-time login
      logEvent(analytics, "First_Time_Login", {
        user_id: user.uid,
        email: user.email,
      });
    }
  }
});

// Function to track channel subscription
export function trackChannelSubscription(channelId, isSubscribing = true) {
  const user = auth.currentUser;
  if (!user) return;

  const eventName = isSubscribing ? "channel_subscribe" : "channel_unsubscribe";

  logEvent(analytics, eventName, {
    user_id: user.uid,
    channel_id: channelId,
    timestamp: new Date().toISOString(),
  });
}

// Helper function to track custom events
export function trackCustomEvent(eventName, eventParams = {}) {
  const user = auth.currentUser;
  if (!user) return;

  // Add user ID to all events
  const enhancedParams = {
    ...eventParams,
    user_id: user.uid,
  };

  logEvent(analytics, eventName, enhancedParams);
}
