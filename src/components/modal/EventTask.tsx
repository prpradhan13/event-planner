import { FlatList, Modal, Text, View } from "react-native";
import React, { Dispatch, SetStateAction } from "react";
import Ionicons from "@expo/vector-icons/Ionicons";
import { tasksForEvent } from "@/src/utils/quries/taskQuery";
import LoadData from "../smallHelping/LoadData";
import UserNameBtn from "../smallHelping/UserNameBtn";

interface EventTaskProps {
  taskModalVisible: boolean;
  setTaskModalVisible: Dispatch<SetStateAction<boolean>>;
  eventId?: number;
}

const EventTask = ({
  taskModalVisible,
  setTaskModalVisible,
  eventId,
}: EventTaskProps) => {
  const { data, isLoading } = tasksForEvent(eventId);

  return (
    <Modal visible={taskModalVisible} animationType="slide">
      <View className="flex-1 bg-MainBackgroundColor p-4">
        <View className="flex-row gap-5 items-center">
          <Ionicons
            onPress={() => setTaskModalVisible(false)}
            name="arrow-back-sharp"
            size={24}
            color="#fff"
          />
          <View className="flex-row items-end gap-3">
            <Text className="text-white text-3xl font-bold">Tasks</Text>
          </View>
        </View>
        
        <FlatList
          data={data}
          keyExtractor={(item) => item.id.toString()}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{
            paddingTop: 16,
            gap: 16,
          }}
          renderItem={({ item, index }) => {
            if (isLoading) return <LoadData />;

            return (
              <>
                <View className="flex-row items-start">
                  <Text className="text-PrimaryTextColor font-medium text-xl">
                    {index + 1}.{" "}
                  </Text>
                  <View>
                    <Text className="text-PrimaryTextColor font-medium text-xl">
                      {item.task_name}
                    </Text>
                    <Text className="text-SecondaryTextColor text-lg font-normal leading-5 mt-1">
                      {item.description}
                    </Text>

                    <View className="flex-row gap-5 mt-3">
                        <UserNameBtn userId={item.assigned_to}/>
                        <Text className="text-black capitalize bg-yellow-500 px-2 py-1 text-sm rounded-md">{item.status}</Text>
                    </View>
                  </View>
                </View>
              </>
            );
          }}
        />
      </View>
    </Modal>
  );
};

export default EventTask;
