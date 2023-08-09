// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDXfmrCM610SSX7izMeuqs3YL6te8hnpFA",
  authDomain: "busybuy-7c244.firebaseapp.com",
  projectId: "busybuy-7c244",
  storageBucket: "busybuy-7c244.appspot.com",
  messagingSenderId: "421742309263",
  appId: "1:421742309263:web:01f92b8b666921dc6ae5fa"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// Initialize Cloud Firestore and get a reference to the service
const db = getFirestore(app);