// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.4.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/11.4.0/firebase-analytics.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAJUWB5-lSClw3SsKISqxhQoLZbmRvioIY",
  authDomain: "jsi31-gsweb.firebaseapp.com",
  databaseURL: "https://jsi31-gsweb-default-rtdb.firebaseio.com",
  projectId: "jsi31-gsweb",
  storageBucket: "jsi31-gsweb.firebasestorage.app",
  messagingSenderId: "71886744724",
  appId: "1:71886744724:web:53606f7c3bfa7df3121881",
  measurementId: "G-1LGSQZYV4S"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);