import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useState } from "react";
import { TaskCardProps } from "@/src/types/eventType";
import dayjs from "dayjs";
import AlertScreen from "../smallHelping/AlertScreen";

const TaskCard = ({ taskList }: TaskCardProps) => {
  const [alertOpen, setAlertOpen] = useState(false)

  const handlePress = () => {
    setAlertOpen(true);
  }
  
  return (
    <View className="bg-SecondaryBackgroundColor p-3 rounded-xl overflow-hidden">
      <View className="flex-row justify-between items-center">
        <TouchableOpacity
          onPress={handlePress}
        >
          <Text
            className={`${
              taskList.status === "complete"
                ? "bg-green-500"
                : taskList.status === "pending"
                ? "bg-yellow-500"
                : ""
            } text-black capitalize px-2 text-sm rounded-md text-center`}
          >
            {taskList.status}
          </Text>
        </TouchableOpacity>
        <Text className="text-blue-500">
          {dayjs(taskList.due_date).format("DD/MM/YYYY")}
        </Text>
      </View>
      <Text className="text-PrimaryTextColor font-medium text-xl mt-3">
        {taskList.task_name}
      </Text>
      <Text className="text-SecondaryTextColor font-medium text-base">
        {taskList.description}
      </Text>

      {alertOpen && (
        <AlertScreen
          setAlertOpen={setAlertOpen}
          taskId={taskList.id}
          taskStatus={taskList.status}
          userId={taskList.assigned_to}
        />
      )}
    </View>
  );
};

export default TaskCard;
