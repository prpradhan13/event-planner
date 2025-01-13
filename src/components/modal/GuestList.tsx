import { FlatList, Modal, StyleSheet, Text, View } from "react-native";
import React, { Dispatch, SetStateAction } from "react";
import Ionicons from "@expo/vector-icons/Ionicons";
import { guestDetails, guestQuery } from "@/src/utils/quries/guestQuery";
import GuestListCard from "../smallHelping/GuestListCard";
import GuestListLoading from "../loader/GuestListLoading";

interface GuestListProps {
  modalVisible: boolean;
  setModalVisible: Dispatch<SetStateAction<boolean>>;
  eventId?: number;
}

const GuestList = ({
  modalVisible,
  setModalVisible,
  eventId,
}: GuestListProps) => {
  const { data, isLoading } = guestQuery(eventId);

  const inviteAcceptMembers = data?.filter((guest) => guest.status === "accepted");
  
  return (
    <Modal visible={modalVisible} animationType="slide">
      <View className="flex-1 bg-MainBackgroundColor p-4">
        <View className="flex-row gap-5 items-center">
          <Ionicons onPress={() => setModalVisible(false)} name="arrow-back-sharp" size={24} color="#fff" />
          <View className="flex-row items-end gap-3">
            <Text className="text-white text-3xl font-bold">Member</Text>
            <Text className="text-base text-white font-medium leading-7">
              {inviteAcceptMembers?.length}/{data?.length}
            </Text>
          </View>
        </View>

        {isLoading ? (
          <GuestListLoading />
        ) : (
          <FlatList
            data={inviteAcceptMembers}
            keyExtractor={(item) => item.id.toString()}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{
              gap: 10,
              paddingVertical: 10,
            }}
            renderItem={({ item }) => <GuestListCard guestId={item.guest_id} />}
          />
        )}
      </View>
    </Modal>
  );
};

export default GuestList;