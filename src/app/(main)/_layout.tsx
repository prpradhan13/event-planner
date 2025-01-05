import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { useAuth } from "@/src/context/AuthProvider";
import { Redirect, Stack } from "expo-router";

const MainLayout = () => {
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return <Redirect href="/(auth)/login" />;
  }

  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="(tabs)" />
    </Stack>
  );
};

export default MainLayout;
