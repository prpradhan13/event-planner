import { Pressable, Text, View } from "react-native";
import React, { useMemo } from "react";
import { EventCardProps } from "@/src/types/eventType";
import dayjs from "dayjs";
import { LinearGradient } from "expo-linear-gradient";
import { router } from "expo-router";
import getInitialLetter from "@/src/utils/initialLetter";
import UserNameBtn from "../smallHelping/UserNameBtn";

const EventCard = ({ dataList }: EventCardProps) => {
  const handlePress = (eventId: number) => {
    router.push(`/event/${eventId}`);
  };

  const eventInitialLetter = useMemo(
    () => getInitialLetter(dataList.name),
    [dataList.name]
  );

  return (
    <Pressable
      onPress={() => handlePress(dataList.id)}
      className="bg-SecondaryBackgroundColor p-3 rounded-xl flex-row gap-5 items-center"
    >
      <View className="w-[55%]">
        <Text className="text-green-500 text-sm">
          {dayjs(dataList.date).format("DD/MM/YYYY")}
        </Text>

        <Text
          className="text-PrimaryTextColor text-xl font-medium"
          numberOfLines={1}
        >
          {dataList.name}
        </Text>
        <Text
          className="text-SecondaryTextColor text-base leading-5 my-2"
          numberOfLines={2}
        >
          {dataList.description}
        </Text>

        <UserNameBtn userId={dataList.user_id} />
      </View>

      <View className="w-[40%]">
        <LinearGradient
          colors={["#333333", "#000000"]}
          className="rounded-xl w-full h-32 justify-center items-center overflow-hidden"
        >
          <Text className="font-semibold text-2xl tracking-widest text-white">
            {" "}
            {eventInitialLetter}{" "}
          </Text>
        </LinearGradient>
      </View>
    </Pressable>
  );
};

export default EventCard;
