import { initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth"

const firebaseConfig = {
  apiKey: "AIzaSyC0hhtORCdZoiaqCwAIk2Azt7wdGTC3w7w",
  authDomain: "nails-907de.firebaseapp.com",
  projectId: "nails-907de",
  storageBucket: "nails-907de.appspot.com",
  messagingSenderId: "995106567598",
  appId: "1:995106567598:web:74981e6e8a3b9f56f8843f"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)