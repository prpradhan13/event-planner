import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { EventCardProps } from "@/src/types/eventType";
import dayjs from "dayjs";

const EventCard = ({ dataList }: EventCardProps) => {
  return (
    <View className="bg-[#333] p-3 rounded-xl">
      <Text className="text-[#c6c6c6] text-xl">{dataList.name}</Text>
      <Text className="text-[#c6c6c6] text-xl">{dataList.description}</Text>
      <Text className="text-[#c6c6c6] text-xl">
        {dayjs(dataList.date).format("DD MMM YYYY")}
      </Text>
      <Text className="text-[#c6c6c6] text-xl">{dataList.location}</Text>
    </View>
  );
};

export default EventCard;
