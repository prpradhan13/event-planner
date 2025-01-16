import { FlatList, Text, View } from "react-native";
import React from "react";
import GuestListCard from "../smallHelping/GuestListCard";
import { GuestsType } from "@/src/types/eventType";
import GuestListLoading from "../loader/GuestListLoading";

const InvitedGuests = ({
  data,
  eventCreaterId,
  isLoading,
  nameOfListIfEmpty,
}: {
  data?: GuestsType[];
  eventCreaterId: string;
  isLoading?: boolean;
  nameOfListIfEmpty?: string;
}) => {
  return (
    <>
      {isLoading ? (
        <GuestListLoading />
      ) : (
        <FlatList
          data={data}
          keyExtractor={(item) => item.id.toString()}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{
            gap: 10,
            paddingTop: 10,
            paddingBottom: 100,
          }}
          renderItem={({ item }) => (
            <GuestListCard
              guestId={item.guest_id}
              eventCreaterId={eventCreaterId}
              invitationStatus={item.status}
              invitationId={item.id}
            />
          )}
          ListEmptyComponent={() => (
            <View className="h-[80vh] w-full justify-center items-center">
              <Text className="text-[#8c8c8c] font-medium text-lg">
                {nameOfListIfEmpty}
              </Text>
            </View>
          )}
        />
      )}
    </>
  );
};

export default InvitedGuests;
