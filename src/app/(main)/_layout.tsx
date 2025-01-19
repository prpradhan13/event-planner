import React from "react";
import { useAuth } from "@/src/context/AuthProvider";
import { Redirect, Stack } from "expo-router";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import "react-native-get-random-values";
import { StripeProvider } from '@stripe/stripe-react-native';

const queryClient = new QueryClient();

const Layout = () => {
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return <Redirect href="/(auth)/login" />;
  }

  return (
    <QueryClientProvider client={queryClient}>
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
    </QueryClientProvider>
  );
};

const MainLayout = () => {
  const publishableKey = process.env.EXPO_PUBLIC_STRIPE_PUBLISHABLE_KEY;

  return (
    <StripeProvider publishableKey={publishableKey!}>
      <Layout />
    </StripeProvider>
  )
}

export default MainLayout;
