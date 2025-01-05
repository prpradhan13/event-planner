import "@/src/global.css";
import { Stack } from "expo-router";
import React from "react";
import { StatusBar } from "expo-status-bar";
import AuthProvider, { useAuth } from "@/src/context/AuthProvider";

const RootLayout = () => {
  return (
    <AuthProvider>
      <StatusBar style="light" translucent backgroundColor="transparent" />
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="(main)" />
      </Stack>
    </AuthProvider>
  );
};

export default RootLayout;
