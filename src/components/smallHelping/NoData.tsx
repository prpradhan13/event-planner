import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { NoDataProps } from "@/src/types/extraTypes";

const NoData = ({ title, onPressBtn }: NoDataProps) => {
  return (
    <View className="w-full justify-center items-center mt-10">
      <Text className="text-[#c6c6c6] text-xl">No {title}</Text>
      <TouchableOpacity
       onPress={onPressBtn}
       className="bg-[#000] p-2 rounded-xl mt-4">
        <Text className="text-[#c6c6c6] text-xl">Create {title}</Text>
      </TouchableOpacity>
    </View>
  );
};

export default NoData;
