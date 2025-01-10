import { Animated, StyleSheet, Text, View } from "react-native";
import React, { useEffect, useRef } from "react";

const InvitesCardList = () => {
  const opacity = useRef(new Animated.Value(0.5)).current;

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(opacity, {
          toValue: 1,
          duration: 800,
          useNativeDriver: true,
        }),
        Animated.timing(opacity, {
          toValue: 0.5,
          duration: 800,
          useNativeDriver: true,
        }),
      ])
    ).start();
  }, [opacity]);

  return (
    <>
      {Array.from({ length: 4 }).map((_, i) => (
        <View
          key={i}
          className="bg-SecondaryBackgroundColor p-3 rounded-lg m-4"
        >
          <View className="flex-row gap-3 items-center">
            <Animated.View
              style={{
                height: 20,
                width: 80,
                backgroundColor: "#ccc",
                borderRadius: 10,
                opacity,
              }}
            />

            <Animated.View
              style={{
                height: 20,
                width: 80,
                backgroundColor: "#ccc",
                borderRadius: 10,
                opacity,
              }}
            />
          </View>
          <Animated.View
            style={{
              height: 30,
              width: "100%",
              borderRadius: 10,
              backgroundColor: "#ccc",
              marginTop: 5,
              opacity,
            }}
          />
        </View>
      ))}
    </>
  );
};

export default InvitesCardList;

const styles = StyleSheet.create({});
