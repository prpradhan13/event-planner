import { StyleSheet, Text, View } from "react-native";
import React, { memo } from "react";
import { guestDetails } from "@/src/utils/quries/guestQuery";
import getInitialLetter from "@/src/utils/initialLetter";

interface GuestListCardProps {
  guestId: string;
}

const GuestListCard = memo(({ guestId }: GuestListCardProps) => {
  const { data, isLoading } = guestDetails(guestId);

  const guestNameInitialLetter = getInitialLetter(data?.full_name)

  return (
    <View className="bg-SecondaryBackgroundColor p-3 rounded-xl flex-row items-center justify-between">
      <View className="w-[70%]">
        <Text className="text-PrimaryTextColor text-lg font-medium">
          {data?.full_name}
        </Text>
        <Text className="text-PrimaryTextColor">{data?.username}</Text>
      </View>

      <View className="h-20 w-20 rounded-full bg-SecondaryTextColor items-center justify-center">
        {!data?.avatar_url ? (
          <Text className="font-semibold text-lg">{guestNameInitialLetter}</Text>
        ) : ("")}
      </View>
    </View>
  );
});

export default GuestListCard;
