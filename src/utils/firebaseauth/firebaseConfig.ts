import { initializeApp } from "firebase/app";

const firebaseConfig = {
    apiKey: process.env.EXPO_PUBLIC_FIREBASE_APIKEY,
    authDomain: process.env.EXPO_PUBLIC_FIREBASE_AUTHDOMAIN,
    projectId: process.env.EXPO_PUBLIC_FIREBASE_PROJECTID,
    storageBucket: process.env.EXPO_PUBLIC_FIREBASE_STORAGEBUCKET,
    messagingSenderId: process.env.EXPO_PUBLIC_FIREBASE_MESSAGINGSENDERID,
    appId: process.env.EXPO_PUBLIC_FIREBASE_APPID,
}

const app = initializeApp(firebaseConfig);

export default app;