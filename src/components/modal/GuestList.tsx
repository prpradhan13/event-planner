import { FlatList, Modal, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { Dispatch, SetStateAction, useState } from "react";
import Ionicons from "@expo/vector-icons/Ionicons";
import { guestDetails, guestQuery } from "@/src/utils/quries/guestQuery";
import GuestListCard from "../smallHelping/GuestListCard";
import GuestListLoading from "../loader/GuestListLoading";
import Entypo from "@expo/vector-icons/Entypo";
import AllUserList from "./AllUserList";

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
  const [allUserListOpen, setAllUserListOpen] = useState(false);
  const { data, isLoading } = guestQuery(eventId);

  const inviteAcceptMembers = data?.filter(
    (guest) => guest.status === "accepted"
  );

  return (
    <Modal visible={modalVisible} animationType="slide">
      <View className="flex-1 bg-MainBackgroundColor p-4">
        <View className="flex-row items-center justify-between">
          <View className="flex-row gap-5 items-center">
            <Ionicons
              onPress={() => setModalVisible(false)}
              name="arrow-back-sharp"
              size={24}
              color="#fff"
            />
            <View className="flex-row items-end gap-3">
              <Text className="text-white text-3xl font-bold">Member</Text>
              <Text className="text-base text-white font-medium leading-7">
                {inviteAcceptMembers?.length}/{data?.length}
              </Text>
            </View>
          </View>

          <TouchableOpacity
            onPress={() => setAllUserListOpen(true)}
            className="flex-row items-center"
          >
            <Entypo name="plus" size={20} color="#3b82f6" />
            <Text className="text-blue-500 text-sm font-medium">Guests</Text>
          </TouchableOpacity>
        </View>

        {allUserListOpen && (
          <AllUserList modalVisible={allUserListOpen} setModalVisible={setAllUserListOpen} eventId={eventId} />
        )}

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
            ListEmptyComponent={() => (
              <View className="h-[80vh] w-full justify-center items-center">
                <Text className="text-[#8c8c8c] font-medium text-lg">No Guesets Invited</Text>
              </View>
            )}
          />
        )}
      </View>
    </Modal>
  );
};

export default GuestList;
