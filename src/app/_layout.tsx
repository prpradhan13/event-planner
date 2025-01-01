import "@/src/global.css";
import { Stack, useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import { StatusBar } from "expo-status-bar";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import app from "../utils/firebaseauth/firebaseConfig";

const auth = getAuth(app);

export default function RootLayout() {
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        // If user is logged in, navigate to the Home screen
        router.push("/(main)/(tabs)");
      } else {
        // If user is not logged in, navigate to the Sign-Up screen
        router.push("/(auth)");
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, [router]);

  return (
    <>
      <StatusBar
        style={"dark"}
        translucent={true} // Ensures content flows behind the status bar
        backgroundColor="transparent" // Removes solid background
      />
      <Stack screenOptions={{ headerShown: false }} />
    </>
  )
}
