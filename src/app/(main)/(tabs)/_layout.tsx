import { StyleSheet } from "react-native";
import React from "react";
import { Tabs } from "expo-router";
import Entypo from '@expo/vector-icons/Entypo';

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
            <Entypo
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
            <Entypo
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
