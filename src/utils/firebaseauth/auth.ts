import {
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signInWithCredential,
  GoogleAuthProvider,
  signOut,
} from "firebase/auth";
import * as AuthSession from "expo-auth-session";
import * as Random from "expo-random";
import app from "./firebaseConfig";
import { EmailPassword } from "@/src/types/authType";

const auth = getAuth(app);

export const firebaseSignUp = async ({email, password}: EmailPassword) => {
   try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password); 
    return userCredential.user;

   } catch (error: any) {
    console.error("Error signing up:", error.message);
    throw error;
   } 
}

// Sign In
export const firebaseSignIn = async ({email, password}: EmailPassword) => {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      return userCredential.user;
    } catch (error: any) {
      console.error("Error signing in:", error.message);
      throw error;
    }
};

// Sign Out
export const logout = async () => {
    try {
      await signOut(auth);
    } catch (error: any) {
      console.error("Error signing out:", error.message);
      throw error;
    }
};

// export const signInWithGoogle = async () => {
//   try {
//     const redirectUri = AuthSession.makeRedirectUri();

//     // Define the Google OAuth2 endpoint and parameters
//     const discovery = {
//       authorizationEndpoint: "https://accounts.google.com/o/oauth2/v2/auth",
//       tokenEndpoint: "https://oauth2.googleapis.com/token",
//     };

//     const clientId = process.env.EXPO_PUBLIC_FIREBASE_OAUTH_CLIENTID;

//     const response = await AuthSession.startAsync({
//       authUrl: `${
//         discovery.authorizationEndpoint
//       }?client_id=${clientId}&redirect_uri=${encodeURIComponent(
//         redirectUri
//       )}&response_type=token&scope=profile email`,
//     });

//     if (response.type === "success") {
//         const { access_token } = response.params;
  
//         const credential = GoogleAuthProvider.credential(null, access_token);
//         const userCredential = await signInWithCredential(auth, credential);
//         return userCredential.user;
//     }
  
//     throw new Error("Google Sign-In canceled");
    
//   } catch (error) {
//     console.error("Error during Google Sign-In:", error);
//     throw error;
//   }
// };
