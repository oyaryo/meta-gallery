// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCe-0sXMZ59zyh4NjKyy0pUzUCBQbRtdwk",
  authDomain: "meta-gallary.firebaseapp.com",
  projectId: "meta-gallary",
  storageBucket: "meta-gallary.appspot.com",
  messagingSenderId: "239972272231",
  appId: "1:239972272231:web:9b00a0bdf3c5398d5c2cc2",
  measurementId: "G-ZDQ3B0WMZB",
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);
const analytics = getAnalytics(firebaseApp);
