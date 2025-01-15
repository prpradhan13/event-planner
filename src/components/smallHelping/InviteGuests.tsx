import {
  ActivityIndicator,
  Image,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { Dispatch, SetStateAction, useState } from "react";
import { getUserDetatils } from "@/src/utils/quries/userQuery";
import getInitialLetter from "@/src/utils/initialLetter";
import { addGuest } from "@/src/utils/quries/guestQuery";

const InviteGuests = ({
  usersList,
  eventId,
  setModalVisible,
}: {
  usersList: any;
  eventId?: number;
  setModalVisible: Dispatch<SetStateAction<boolean>>;
}) => {
  const guestNameInitialLetter = getInitialLetter(usersList?.full_name);

  const { mutate, isPending } = addGuest(
    usersList?.id!,
    eventId!,
    setModalVisible
  );
  const handleInviteBtn = () => {
    mutate();
  };

  return (
    <View className="bg-SecondaryBackgroundColor p-3 rounded-xl flex-row items-center justify-between">
      <View className="w-[70%]">
        <Text className="text-PrimaryTextColor text-lg font-medium">
          {usersList?.full_name}
        </Text>
        <Text className="text-PrimaryTextColor">{usersList?.username}</Text>

        <TouchableOpacity
          onPress={handleInviteBtn}
          disabled={isPending}
          className="bg-SecondaryTextColor w-[60px] rounded-md mt-2"
        >
          {isPending ? (
            <ActivityIndicator />
          ) : (
            <Text className="text-sm text-center">Invite</Text>
          )}
        </TouchableOpacity>
      </View>

      <View className="h-20 w-20 rounded-full bg-SecondaryTextColor items-center justify-center">
        {usersList?.avatar_url ? (
          <Image
            source={{ uri: usersList.avatar_url }}
            style={{
              width: 80,
              height: 80,
              borderRadius: 100,
            }}
            resizeMode="cover"
          />
        ) : (
          <Text className="font-semibold text-lg">
            {guestNameInitialLetter}
          </Text>
        )}
      </View>
    </View>
  );
};

export default InviteGuests;
