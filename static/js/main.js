// auth.js - Make this a separate JavaScript module
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-analytics.js";
import {
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
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

// Login Function
export async function login() {
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  try {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );
    const idToken = await userCredential.user.getIdToken();

    const response = await fetch("/auth/verify-token/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ token: idToken }),
    });

    const data = await response.json();
    if (data.status === "success") {
      window.location.href = "/";
    }
  } catch (error) {
    console.error("Login Error:", error);
    alert(error.message);
  }
}

// Signup Function
export async function signup() {
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  try {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    const idToken = await userCredential.user.getIdToken();

    const response = await fetch("/auth/verify-token/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ token: idToken }),
    });

    const data = await response.json();
    if (data.status === "success") {
      window.location.href = "/";
    }
  } catch (error) {
    console.error("Signup Error:", error);
    alert(error.message);
  }
}

// const githubLogin = document.getElementById("github-login-btn");
// githubLogin.addEventListener("click", function () {
//   signInWithPopup(auth, provider)
//     .then((result) => {
//       // This gives you a GitHub Access Token. You can use it to access the GitHub API.
//       const credential = GithubAuthProvider.credentialFromResult(result);
//       const token = credential.accessToken;

//       // The signed-in user info.
//       const user = result.user;
//       console.log(user);
//       window.location.href = "/";

//       // IdP data available using getAdditionalUserInfo(result)
//       // ...
//     })
//     .catch((error) => {
//       // Handle Errors here.
//       const errorCode = error.code;
//       const errorMessage = error.message;
//       // The email of the user's account used.
//       const email = error.customData.email;
//       // The AuthCredential type that was used.
//       const credential = GithubAuthProvider.credentialFromError(error);
//       // ...
//       console.log(error);
//     });
// });
