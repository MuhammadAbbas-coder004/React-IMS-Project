import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";


const firebaseConfig = {
  apiKey: "AIzaSyCgY0KBh4zvmlUqBu6CKe_HGeXYhHT54z4",
  authDomain: "react-4cdcb.firebaseapp.com",
  projectId: "react-4cdcb",
  storageBucket: "react-4cdcb.appspot.com",
  messagingSenderId: "457878300166",
  appId: "1:457878300166:web:aa71886482cb91ce080587",
  measurementId: "G-5DK9PKDQTG"
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);

import { initializeApp as initializeSecondaryApp } from "firebase/app";
import { getAuth as getSecondaryAuth } from "firebase/auth";

const secondaryApp = initializeSecondaryApp(firebaseConfig, "Secondary");
export const secondaryAuth = getSecondaryAuth(secondaryApp);
