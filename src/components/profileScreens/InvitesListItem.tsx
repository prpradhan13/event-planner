import { ActivityIndicator, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { singleEventDetails } from "@/src/utils/quries/eventQurery";
import dayjs from "dayjs";
import { router } from "expo-router";
import InvitesCardList from "../loader/InvitesCardList";
import UserNameBtn from "../smallHelping/UserNameBtn";
import { GuestsType } from "@/src/types/eventType";
import { inviteStatusChange } from "@/src/utils/quries/invitesQurey";

const InvitesListItem = ({ inviteId, eventId, inviteStatus }: {inviteId: number, eventId: number, inviteStatus: string}) => {
  const { data, isLoading } = singleEventDetails(eventId.toString());

  const handlePress = () => {
    router.push(`/event/${eventId}`);
  };
  
  
  const { mutate, isPending } = inviteStatusChange();
  
  const handleInviteBtnClick = () => {
    const newStatus = inviteStatus === "invited" ? "accepted" : "invited";
    mutate({inviteId, newStatus});
  }

  return (
    <TouchableOpacity
      onPress={handlePress}
      disabled={isLoading}
      className="bg-SecondaryBackgroundColor p-3 rounded-lg"
    >
      <View className="flex-row gap-3 items-center">
        <TouchableOpacity
          onPress={handleInviteBtnClick}
          className="bg-[#dadada] px-1 rounded-md"
        >
          {isPending ? (
            <ActivityIndicator />
          ) : (
            <Text className="text-sm text-center capitalize">
              {inviteStatus}
            </Text>
          )}
        </TouchableOpacity>

        <Text className="text-SecondaryTextColor text-sm">
          {dayjs(data?.date).format("DD/MM/YYYY")}
        </Text>
      </View>
      <Text className="text-PrimaryTextColor font-medium text-xl mt-1 mb-2">
        {data?.name}
      </Text>

      <UserNameBtn userId={data?.user_id!} />
    </TouchableOpacity>
  );
};

export default InvitesListItem;
