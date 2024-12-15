import { initializeApp } from "https://www.gstatic.com/firebasejs/9.22.1/firebase-app.js";
import {
  getAuth,
  GithubAuthProvider,
  signInWithPopup,
} from "https://www.gstatic.com/firebasejs/9.22.1/firebase-auth.js";

const config = {
  apiKey: "AIzaSyDtuVBehpn3WJq8rlgBZ5WSfTCcs6o7b9c",
  authDomain: "chatroom-a8d76.firebaseapp.com",
  databaseURL: "https://chatroom-a8d76-default-rtdb.firebaseio.com",
  projectId: "chatroom-a8d76",
  storageBucket: "chatroom-a8d76.firebasestorage.app",
  messagingSenderId: "995255543988",
  appId: "1:995255543988:web:cd80d5313a5c63a929cfe1",
};

// Initialize Firebase dynamically
const app = initializeApp(config);
const auth = getAuth(app);
auth.languageCode = "en";
const provider = new GithubAuthProvider();
console.log("Firebase initialized successfully.");

const githubLogin = document.getElementById("github-login-btn");
githubLogin.addEventListener("click", function () {
  signInWithPopup(auth, provider)
    .then((result) => {
      // This gives you a GitHub Access Token. You can use it to access the GitHub API.
      const credential = GithubAuthProvider.credentialFromResult(result);
      const token = credential.accessToken;

      // The signed-in user info.
      const user = result.user;
      console.log(user);
      window.location.href = "/";

      // IdP data available using getAdditionalUserInfo(result)
      // ...
    })
    .catch((error) => {
      // Handle Errors here.
      const errorCode = error.code;
      const errorMessage = error.message;
      // The email of the user's account used.
      const email = error.customData.email;
      // The AuthCredential type that was used.
      const credential = GithubAuthProvider.credentialFromError(error);
      // ...
      console.log(error);
    });
});
