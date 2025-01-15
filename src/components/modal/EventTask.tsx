import { FlatList, Modal, Pressable, Text, View } from "react-native";
import React, { Dispatch, SetStateAction, useState } from "react";
import Ionicons from "@expo/vector-icons/Ionicons";
import { tasksForEvent } from "@/src/utils/quries/taskQuery";
import LoadData from "../smallHelping/LoadData";
import UserNameBtn from "../smallHelping/UserNameBtn";
import AntDesign from '@expo/vector-icons/AntDesign';
import CreateTask from "./CreateTask";

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
  const [createTaskOpen, setCreateTaskOpen] = useState(false);
  const { data, isLoading } = tasksForEvent(eventId);

  return (
    <Modal visible={taskModalVisible} animationType="slide">
      <View className="flex-1 bg-MainBackgroundColor p-4">
        <View className="flex-row items-center justify-between">
          <View className="flex-row gap-5 items-center">
            <Ionicons
              onPress={() => setTaskModalVisible(false)}
              name="arrow-back-sharp"
              size={24}
              color="#fff"
            />
            <Text className="text-white text-3xl font-bold">Tasks</Text>
          </View>

            <Pressable
              onPress={() => setCreateTaskOpen(true)}
              className="bg-white rounded-md px-2 flex-row items-center gap-1"
            >
              <AntDesign name="plus" size={18} color="black" />
              <Text className="font-medium">Add</Text>
            </Pressable>
        </View>

        {createTaskOpen && (
          <CreateTask 
            modalVisible={createTaskOpen}
            setModalVisible={setCreateTaskOpen}
            eventId={eventId!}
          />
        )}
        
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
          ListEmptyComponent={() => (
            <View className="h-[80vh] justify-center items-center">
              <Text className="text-[#c5c5c5] text-xl font-medium ">No Tasks</Text>
            </View>
          )}
        />
      </View>
    </Modal>
  );
};

export default EventTask;
