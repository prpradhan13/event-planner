import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { singleEventDetails } from "@/src/utils/quries/eventQurery";
import dayjs from "dayjs";
import { router } from "expo-router";
import InvitesCardList from "../loader/InvitesCardList";

interface InvitesListItemProps {
  eventId: number;
  guestStatus: string;
}

const InvitesListItem = ({ eventId, guestStatus }: InvitesListItemProps) => {
  const { data, isLoading } = singleEventDetails(eventId.toString());

  const handlePress = () => {
    router.push(`/event/${eventId}`);
  };

  return (
    <TouchableOpacity
      onPress={handlePress}
      disabled={isLoading}
      className="bg-SecondaryBackgroundColor p-3 rounded-lg"
    >
      <View className="flex-row gap-3 items-center">
        <Text className="text-sm bg-[#dadada] px-1 text-center rounded-md capitalize">
          {guestStatus}
        </Text>

        <Text className="text-SecondaryTextColor text-sm">
          {dayjs(data?.date).format("DD/MM/YYYY")}
        </Text>
      </View>
      <Text className="text-PrimaryTextColor font-medium text-xl mt-1">
        {data?.name}
      </Text>
    </TouchableOpacity>
  );
};

export default InvitesListItem;
