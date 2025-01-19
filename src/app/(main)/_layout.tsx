import React from "react";
import { useAuth } from "@/src/context/AuthProvider";
import { Redirect, Stack } from "expo-router";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import "react-native-get-random-values";
import NotificationProvider from "@/src/context/NotificationProvider";

const queryClient = new QueryClient();

const MainLayout = () => {
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return <Redirect href="/(auth)/login" />;
  }

  return (
    <QueryClientProvider client={queryClient}>
      <NotificationProvider>
        <Stack screenOptions={{ headerShown: false }}>
          <Stack.Screen name="(tabs)" />
          <Stack.Screen
            name="event/[id]"
            options={{
              headerShown: true,
              // headerTransparent: true,
              headerStyle: {
                backgroundColor: "#1e1e1e",
              },
              headerShadowVisible: false,
              headerTintColor: "#fff",
              headerTitle: "",
            }}
          />
        </Stack>
      </NotificationProvider>
    </QueryClientProvider>
  );
};

export default MainLayout;
