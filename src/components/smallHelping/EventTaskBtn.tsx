import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useState } from "react";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import EventTask from "../modal/EventTask";

interface EventTaskBtnProps {
  eventId?: number;
}

const EventTaskBtn = ({ eventId }: EventTaskBtnProps) => {
  const [taskModalVisible, setTaskModalVisible] = useState(false);

  return (
    <>
      <TouchableOpacity
        onPress={() => setTaskModalVisible(true)}
        className="gap-2 flex-row items-center border py-1 px-3 rounded-md bg-[#5d5d5d]"
      >
        <FontAwesome5 name="tasks" size={14} color="#c8c8c8" />
        <Text className="text-SecondaryTextColor font-medium text-base">
          Tasks
        </Text>
      </TouchableOpacity>

      {taskModalVisible && (
        <EventTask
          taskModalVisible={taskModalVisible}
          setTaskModalVisible={setTaskModalVisible}
          eventId={eventId}
        />
      )}
    </>
  );
};

export default EventTaskBtn;
