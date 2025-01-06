import { FlatList, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { useAuth } from "@/src/context/AuthProvider";
import { taskQuery } from "@/src/utils/quries/taskQuery";
import LoadData from "../smallHelping/LoadData";
import TaskCard from "./TaskCard";

const Task = () => {
  const { user } = useAuth();

  const { data, isLoading } = taskQuery(user?.id);
  
  if (isLoading) {
    return <LoadData />;
  }

  if (!data || data.length === 0) {
    return (
      <View className="w-full justify-center items-center mt-10">
        <Text className="text-[#c6c6c6] text-xl">No Tasks</Text>
      </View>
    );
  }

  return (
    <View className="px-4">
      <FlatList
        data={data}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={{
          paddingVertical: 16,
          gap: 16,
        }}
        renderItem={({ item }) => <TaskCard taskList={item} />}
      />
    </View>
  );
};

export default Task;
