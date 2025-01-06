import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { EventCardProps } from "@/src/types/eventType";
import dayjs from "dayjs";
import { LinearGradient } from "expo-linear-gradient";

const EventCard = ({ dataList }: EventCardProps) => {



  return (
    <View className="bg-SecondaryBackgroundColor p-3 rounded-xl flex-row gap-5">
      <View>
        <Text className="text-green-500">
          {dayjs(dataList.date).format("DD MMM YYYY")}
        </Text>

        <Text className="text-PrimaryTextColor text-xl font-medium" numberOfLines={1}>{dataList.name}</Text>
        <Text className="text-SecondaryTextColor text-lg" numberOfLines={2}>{dataList.description}</Text>
        <Text className="text-[#c6c6c6]" numberOfLines={1}>{dataList.location}</Text>
      </View>

      <View className="flex-1">
        <LinearGradient
          colors={["#333333", "#000000"]}
          className="rounded-xl h-32 justify-center items-center overflow-hidden">
          <Text className="font-semibold text-2xl tracking-widest text-white"> EV </Text>
        </LinearGradient>
      </View>
    </View>
  );
};

export default EventCard;
