import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Redirect, Stack } from 'expo-router';
import { useAuth } from '@/src/context/AuthProvider';

const AuthLayout = () => {
    const { isAuthenticated } = useAuth();

    if (isAuthenticated) {
      return <Redirect href="/(main)/(tabs)" />
    }

  return <Stack screenOptions={{ headerShown: false }} />;
}

export default AuthLayout;