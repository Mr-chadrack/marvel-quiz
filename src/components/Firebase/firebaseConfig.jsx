import { initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth"
import { getFirestore, doc} from "firebase/firestore";


const config = {
  apiKey: "AIzaSyBeaIjDy9UN94KSTYKe3Jteky4cck7m3rA",
  authDomain: "marvel-quiz-de942.firebaseapp.com",
  projectId: "marvel-quiz-de942",
  storageBucket: "marvel-quiz-de942.firebasestorage.app",
  messagingSenderId: "83936484253",
  appId: "1:83936484253:web:d268e95e9b38336530ad74"
};

const app = initializeApp(config)
export const auth = getAuth(app)

export const firestore = getFirestore()

export const user = uid => doc(firestore,`users/${uid}`)



