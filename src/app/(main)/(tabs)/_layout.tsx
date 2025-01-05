import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { Redirect, Tabs } from "expo-router";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { useAuth } from "@/src/context/AuthProvider";

const TabLayout = () => {
  return (
    <Tabs 
      screenOptions={{ 
        headerShown: false,
        tabBarActiveTintColor: "white",
        tabBarStyle: {
          position: "absolute",
          bottom: 0,
          shadowColor: "transparent",
          backgroundColor: "rgba(0, 0, 0, 0.5)",
          borderTopWidth: 0,
        }
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          tabBarIcon: ({ focused }) => (
            <FontAwesome
              name="home"
              size={26}
              color={focused ? "white" : "#ababab"}
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
              color={focused ? "white" : "#ababab"}
            />
          ),
        }}
      />
    </Tabs>
  );
};

export default TabLayout;

const styles = StyleSheet.create({});
