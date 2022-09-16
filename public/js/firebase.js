// // Import the functions you need from the SDKs you need
// import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
// import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";

// // TODO: Add SDKs for Firebase products that you want to use
// // https://firebase.google.com/docs/web/setup#available-libraries

// // Your web app's Firebase configuration
// // For Firebase JS SDK v7.20.0 and later, measurementId is optional
// const firebaseConfig = {
//   apiKey: "AIzaSyBlembPAFdiEN9g9AaXX9wVmzfyVHKYpCI",
//   authDomain: "exam-hub-85db7.firebaseapp.com",
//   projectId: "exam-hub-85db7",
//   storageBucket: "exam-hub-85db7.appspot.com",
//   messagingSenderId: "536579729927",
//   appId: "1:536579729927:web:783c32130687e5fab698a2",
//   measurementId: "G-5C66QP5FLH",
// };
// const loginButton = document.getElementById("login-form-button");
// // Initialize Firebase
// const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);

// const provider = new GoogleAuthProvider(app);
// const auth = getAuth(app);
// auth.languageCode = "it";

// loginButton.addEventListener("click", (e) => {
//   console.log("clickk");
//   signInWithPopup(auth, provider)
//     .then((result) => {
//       // This gives you a Google Access Token. You can use it to access the Google API.
//       const credential = GoogleAuthProvider.credentialFromResult(result);
//       const token = credential.accessToken;
//       // The signed-in user info.
//       const user = result.user;
//       console.log(user);
//       // ...
//     })
//     .catch((error) => {
//       // Handle Errors here.
//       const errorCode = error.code;
//       const errorMessage = error.message;
//       // The email of the user's account used.
//       const email = error.customData.email;
//       // The AuthCredential type that was used.
//       const credential = GoogleAuthProvider.credentialFromError(error);
//       console.log(errorMessage);
//       // ...
//     });
// });
