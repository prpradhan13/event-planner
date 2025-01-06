import { ActivityIndicator, FlatList, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { useAuth } from "@/src/context/AuthProvider";
import { getUserEvents } from "@/src/utils/quries/eventQurery";
import EventCard from "@/src/components/profileScreens/EventCard";

const Event = () => {
  const {user} = useAuth();

  const { data, isLoading } = getUserEvents(user?.id);

  if (isLoading) {
    return (
      <View className="flex-1 justify-center items-center bg-MainBackgroundColor">
        <ActivityIndicator size="large" color="white" />
      </View>
    );
  }

  if (!data || data.length === 0) {
    <View className="w-full justify-center items-center mt-10">
      <Text className="text-[#c6c6c6] text-xl">No Events</Text>
      <TouchableOpacity className="bg-[#000] p-2 rounded-xl mt-4">
        <Text className="text-[#c6c6c6] text-xl">Create Event</Text>
      </TouchableOpacity>
    </View>
  }

  return (
    <FlatList
      data={data}
      keyExtractor={(item) => item.id.toString()}
      renderItem={({ item }) => (
        <EventCard dataList={item} />
      )}
    />
  );
};

export default Event;
