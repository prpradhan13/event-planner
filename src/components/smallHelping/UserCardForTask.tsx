import {
  FlatList,
  Image,
  Modal,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React, { Dispatch, memo, SetStateAction } from "react";
import { allUsers, getUserDetatils } from "@/src/utils/quries/userQuery";
import getInitialLetter from "@/src/utils/initialLetter";
import Ionicons from "@expo/vector-icons/Ionicons";
import { CreateEventTasksFormData } from "@/src/types/eventType";

interface UserCardForTaskProps {
  modalVisible: boolean;
  setModalVisible: Dispatch<SetStateAction<boolean>>;
  setFormData: Dispatch<SetStateAction<CreateEventTasksFormData>>
}

const UserCardForTask = ({
  modalVisible,
  setModalVisible,
  setFormData
}: UserCardForTaskProps) => {
  const { data, isLoading } = allUsers();

  const handleAssignTo = (userId: string) => {
    setFormData((prev) => ({
        ...prev,
        assigned_to: userId
    }))
    setModalVisible(false);
  };

  return (
    <Modal visible={modalVisible} animationType="fade">
      <View className="flex-1 bg-MainBackgroundColor p-4">
        <View className="flex-row gap-5 items-center">
          <Ionicons
            onPress={() => setModalVisible(false)}
            name="arrow-back-sharp"
            size={24}
            color="#fff"
          />
          <Text className="text-white text-2xl font-bold">Create Tasks</Text>
        </View>
        <FlatList
          data={data}
          keyExtractor={(item) => item.id}
          contentContainerStyle={{
            gap: 16,
            paddingTop: 16,
          }}
          renderItem={({ item }) => {
            const guestNameInitialLetter = getInitialLetter(item?.full_name);

            return (
              <Pressable
                onPress={() => handleAssignTo(item.id)}
                className="bg-SecondaryBackgroundColor p-3 rounded-xl flex-row items-center justify-between"
              >
                <View className="w-[70%]">
                  <Text className="text-PrimaryTextColor text-lg font-medium">
                    {item?.full_name}
                  </Text>
                  <Text className="text-PrimaryTextColor">
                    {item?.username}
                  </Text>
                </View>

                <View className="h-20 w-20 rounded-full bg-SecondaryTextColor items-center justify-center">
                  {item?.avatar_url ? (
                    <Image
                      source={{ uri: item.avatar_url }}
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
              </Pressable>
            );
          }}
        />
      </View>
    </Modal>
  );
};

export default UserCardForTask;
