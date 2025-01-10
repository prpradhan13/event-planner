import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { TaskCardProps } from "@/src/types/eventType";
import dayjs from "dayjs";

const TaskCard = ({ taskList }: TaskCardProps) => {
  
  return (
    <View className="bg-SecondaryBackgroundColor p-3 rounded-xl">
      <View className="flex-row justify-between items-center">
        <Text
          className={`${
            taskList.status === "completed"
              ? "bg-green-500"
              : taskList.status === "pending"
              ? "bg-yellow-500"
              : ""
          } text-black capitalize text-sm px-2 rounded-md text-center`}
        >
          {taskList.status}
        </Text>
        <Text className="text-blue-500">
          {dayjs(taskList.due_date).format("DD/MM/YYYY")}
        </Text>
      </View>
      <Text className="text-PrimaryTextColor font-medium text-xl mt-3">
        {taskList.task_name}
      </Text>
      <Text className="text-SecondaryTextColor font-medium text-base" numberOfLines={1}>
        {taskList.description}
      </Text>
    </View>
  );
};

export default TaskCard;
