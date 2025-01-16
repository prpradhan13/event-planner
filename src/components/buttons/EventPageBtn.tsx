import { Pressable, StyleSheet, Text, View } from "react-native";
import React, { Dispatch, SetStateAction } from "react";

const EventPageBtn = ({
  onPress,
  btnName,
}: {
  onPress: () => void;
  btnName: string;
}) => {
  return (
    <Pressable
      onPress={onPress}
      className={`py-1 px-3 rounded-md ${
        btnName === "request" ? "bg-[#ebebeb]" 
        : btnName === "request send" ? "bg-green-500"
        : btnName === "accepted" ? "bg-green-500"
        : btnName === "invited" ? "bg-blue-500"
        : ""
      }`}
    >
      <Text className="text-[#000] font-medium text-base capitalize">
        {btnName}
      </Text>
    </Pressable>
  );
};

export default EventPageBtn;
