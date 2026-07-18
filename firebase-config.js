// Import Firebase
import { initializeApp } from "https://www.gstatic.com/firebasejs/12.1.0/firebase-app.js";

// Your Firebase config goes here
const firebaseConfig = {
  apiKey: "AIzaSyDAZmYTeX1J44XVLI_ytbq5YgxAK5p_QpE",
  authDomain: "homeworkplanner-7efcb.firebaseapp.com",
  projectId: "homeworkplanner-7efcb",
  storageBucket: "homeworkplanner-7efcb.firebasestorage.app",
  messagingSenderId: "111434399145",
  appId: "1:111434399145:web:318eeb1f20f466fa0e58b8"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export { app };