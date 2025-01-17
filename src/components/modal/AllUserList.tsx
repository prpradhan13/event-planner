import { FlatList, Modal, StyleSheet, Text, View } from "react-native";
import React, { Dispatch, SetStateAction } from "react";
import Ionicons from "@expo/vector-icons/Ionicons";
import { allUsers } from "@/src/utils/quries/userQuery";
import GuestListLoading from "../loader/GuestListLoading";
import GuestListCard from "../smallHelping/GuestListCard";
import InviteGuests from "../smallHelping/InviteGuests";

interface AllUserListProps {
  modalVisible: boolean;
  setModalVisible: Dispatch<SetStateAction<boolean>>;
  eventId?: number;
}

const AllUserList = ({ modalVisible, setModalVisible, eventId }: AllUserListProps) => {
  const { data, isLoading } = allUsers();

  return (
    <Modal visible={modalVisible} animationType="slide" transparent>
      <View className="flex-1 bg-[#000000bd]">
        <View className="h-[80%] w-full absolute bottom-0 bg-MainBackgroundColor p-4 rounded-t-3xl">
          <View className="flex-row gap-5 items-center">
            <Ionicons
              onPress={() => setModalVisible(false)}
              name="arrow-back-sharp"
              size={24}
              color="#fff"
            />
          </View>

          {isLoading ? (
            <GuestListLoading />
          ) : (
            <FlatList
              data={data}
              keyExtractor={(item) => item.id.toString()}
              showsVerticalScrollIndicator={false}
              contentContainerStyle={{
                gap: 10,
                paddingVertical: 10,
              }}
              renderItem={({ item }) => <InviteGuests usersList={item} eventId={eventId} setModalVisible={setModalVisible} />}
              ListEmptyComponent={() => (
                <View className="h-[80vh] w-full justify-center items-center">
                  <Text className="text-[#8c8c8c] font-medium text-lg">
                    No Guesets Invited
                  </Text>
                </View>
              )}
            />
          )}
        </View>
      </View>
    </Modal>
  );
};

export default AllUserList;
