import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { Redirect, Tabs } from "expo-router";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { useAuth } from "@/src/context/AuthProvider";

const TabLayout = () => {
  return (
    <Tabs screenOptions={{ headerShown: false }}>
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          tabBarIcon: ({ focused }) => (
            <FontAwesome
              name="home"
              size={26}
              color={focused ? "#2A2A2A" : "#FAD4D4"}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: "Profile",
          tabBarIcon: ({ focused }) => (
            <FontAwesome
              name="user"
              size={26}
              color={focused ? "#2A2A2A" : "#FAD4D4"}
            />
          ),
        }}
      />
    </Tabs>
  );
};

export default TabLayout;

const styles = StyleSheet.create({});
