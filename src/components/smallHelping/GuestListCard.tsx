import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { memo } from "react";
import { guestDetails, guestQuery } from "@/src/utils/quries/guestQuery";
import getInitialLetter from "@/src/utils/initialLetter";
import { getUserDetatils } from "@/src/utils/quries/userQuery";
import { useAuth } from "@/src/context/AuthProvider";

interface GuestListCardProps {
  guestId: string;
  eventCreaterId?: string;
}

const GuestListCard = memo(({ guestId, eventCreaterId }: GuestListCardProps) => {
  const { user } = useAuth();

  const { data, isLoading } = getUserDetatils(guestId);

  const guestNameInitialLetter = getInitialLetter(data?.full_name)

  return (
    <View className="bg-SecondaryBackgroundColor p-3 rounded-xl flex-row items-center justify-between">
      <View className="w-[70%]">
        <Text className="text-PrimaryTextColor text-lg font-medium">
          {data?.full_name}
        </Text>
        <Text className="text-PrimaryTextColor">{data?.username}</Text>

        {eventCreaterId === user?.id && (
          <TouchableOpacity
            className="bg-SecondaryTextColor w-[60px] rounded-md mt-2"
          >
            <Text className="text-sm text-center">Remove</Text>
          </TouchableOpacity>
        )}
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
