import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-app.js";
import {
  getMessaging,
  getToken,
  onMessage,
} from "https://www.gstatic.com/firebasejs/11.0.2/firebase-messaging.js";

async function initializeFirebaseMessaging() {
  try {
    // Fetch Firebase configuration from your backend
    const response = await fetch("/api/firebase-config/");
    const config = await response.json();

    // Initialize Firebase Cloud Messaging
    const app = initializeApp(config);
    const messaging = getMessaging(app);

    // Request notification permission
    await Notification.requestPermission();

    // Get the token for sending messages
    const token = await getToken(messaging, {
      vapidKey:
        "BD7ujW0GOqkZpD5EgNyZ4p1qysDytEJzkkVgefmcM_u5Pgo9E6cWJbO8cqFfv_9lNGbYvHs26dnt9XVpRNizc_c",
    });

    if (token) {
      console.log("Firebase Messaging Token:", token);
      // Send this token to your server to use for targeting notifications
      await sendTokenToServer(token);
    } else {
      console.log(
        "No registration token available. Request permission to generate one."
      );
    }

    // Listen for messages when the app is in the foreground
    // onMessage(messaging, (payload) => {
    //   console.log("Message received. ", payload);
    //   // Customize how you want to handle foreground messages
    //   new Notification(payload.notification.title, {
    //     title: payload.notification.title,
    //     body: payload.notification.body,
    //   });
    // });
  } catch (error) {
    console.error("Error initializing Firebase Messaging:", error);
  }
}

// Helper function to send token to your server
async function sendTokenToServer(token) {
  try {
    const response = await fetch("/notifications/register/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        // Include CSRF token if using Django
        "X-CSRFToken": getCookie("csrftoken"),
      },
      body: JSON.stringify({ token: token }),
    });

    if (!response.ok) {
      throw new Error("Failed to send token to server");
    }
  } catch (error) {
    console.error("Error sending token to server:", error);
  }
}

// Helper function to get CSRF token from cookies
function getCookie(name) {
  let cookieValue = null;
  if (document.cookie && document.cookie !== "") {
    const cookies = document.cookie.split(";");
    for (let i = 0; i < cookies.length; i++) {
      const cookie = cookies[i].trim();
      if (cookie.substring(0, name.length + 1) === name + "=") {
        cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
        break;
      }
    }
  }
  return cookieValue;
}

// Initialize Firebase Messaging when the page loads
document.addEventListener("DOMContentLoaded", initializeFirebaseMessaging);
