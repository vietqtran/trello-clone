import { initializeApp } from "firebase/app"
import { getFirestore } from '@firebase/firestore'
import { GoogleAuthProvider, getAuth } from 'firebase/auth'

const firebaseConfig = {
   apiKey: "AIzaSyADUfgROkXT6bqBaNMC0l_BrbRizQOfcRQ",
   authDomain: "login-next-5ca69.firebaseapp.com",
   databaseURL: "https://login-next-5ca69-default-rtdb.firebaseio.com",
   projectId: "login-next-5ca69",
   storageBucket: "login-next-5ca69.appspot.com",
   messagingSenderId: "1046517537605",
   appId: "1:1046517537605:web:4abfb3aafe68115c3cfc2c",
   measurementId: "G-70YF39329D"
}

const app = initializeApp(firebaseConfig)
const googleProvider = new GoogleAuthProvider()
const auth = getAuth(app)
export const db = getFirestore(app)
export { googleProvider, auth, app }