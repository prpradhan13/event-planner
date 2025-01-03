import "@/src/global.css";
import { Redirect, Stack, useRouter, useSegments } from "expo-router";
import React, { useEffect, useState } from "react";
import { StatusBar } from "expo-status-bar";
import { ActivityIndicator, View } from "react-native";

const RootLayout = () => {

  return (
    <>
      <StatusBar
        style={"light"}
        translucent={true}
        backgroundColor="transparent"
      />
      <Stack screenOptions={{ headerShown: false }} />
      {<Redirect href="/(auth)" />}
    </>
  )
}

export default RootLayout;