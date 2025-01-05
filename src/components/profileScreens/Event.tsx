import { Text, TouchableOpacity, View } from "react-native";
import React from "react";

const Event = () => {
  return (
    <View className="w-full justify-center items-center mt-10 bg-slate-400">
      <Text className="text-[#c6c6c6] text-xl">No Events</Text>
      <TouchableOpacity className="bg-[#000] p-2 rounded-xl mt-4">
        <Text className="text-[#c6c6c6] text-xl">Create Event</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Event;
