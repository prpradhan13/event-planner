import { StyleSheet, Text, View, Animated } from "react-native";
import React, { useEffect, useRef } from "react";

const GuestListLoading = () => {
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
      {Array.from({ length: 7 }).map((_, i) => (
        <View key={i} className="bg-SecondaryBackgroundColor p-3 rounded-xl flex-row items-center justify-between mt-5">
        <View className="gap-2 w-[70%]">
          <Animated.View
            style={{ backgroundColor: '#ccc', borderRadius: 10, height: 20, opacity }}
          />
          <Animated.View
            style={{ backgroundColor: '#ccc', borderRadius: 10, height: 20, marginTop: 8, opacity }}
          />
        </View>
  
        <Animated.View
          style={{
            height: 80,
            width: 80,
            borderRadius: 40,
            backgroundColor: '#ccc',
            opacity,
          }}
        />
      </View>
      ))}
    </>
  );
};

export default GuestListLoading;
