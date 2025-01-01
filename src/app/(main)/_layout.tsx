import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { Stack } from "expo-router";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const Layout = () => {
  return (
    <>
      <Stack screenOptions={{ headerShown:false }}>
        <Stack.Screen name="(tabs)"/>
      </Stack>
    </>
  );
};

export default function MainScreenLayout() {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
        <Layout />
    </QueryClientProvider>
  )
};