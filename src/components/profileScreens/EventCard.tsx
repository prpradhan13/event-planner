import { StyleSheet, Text, View } from "react-native";
import React from "react";

const EventCard = ({ dataList }) => {
  return (
    <View className="bg-[#333] p-2 rounded-xl mt-4">
      <Text className="text-[#c6c6c6] text-xl">{dataList.name}</Text>
    </View>
  );
};

export default EventCard;

const styles = StyleSheet.create({});
