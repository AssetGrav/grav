import { getApps, initializeApp } from "firebase/app";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: API_KEY,
  authDomain: AUTH_DOMAIN,
  databaseURL:
    "https://server-grav-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: PROJECT_ID,
  storageBucket: STORAGE_BUCKET,
  messagingSenderId: MESSAGING_SENDER_ID,
  appId: APP_ID,
};

// Initialize Firebase
let firebase_app =
  getApps.length === 0 ? initializeApp(firebaseConfig) : getApps()[0];

export default firebase_app;
