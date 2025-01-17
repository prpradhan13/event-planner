import { ActivityIndicator, FlatList, View } from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { allPublicEvents } from "@/src/utils/quries/eventQurery";
import EventCard from "@/src/components/profileScreens/EventCard";

const index = () => {
  const [isRefreshing, setIsRefreshing] = useState(false);
  const { data, isLoading, refetch } = allPublicEvents();

  const onRefresh = async () => {
    setIsRefreshing(true);
    try {
      await refetch();
    } finally {
      setIsRefreshing(false);
    }
  };

  if (isLoading) {
    return (
      <View className="flex-1 bg-MainBackgroundColor justify-center items-center">
        <ActivityIndicator size={"large"} color={"#fff"} />
      </View>
    );
  }

  return (
    <SafeAreaView className="flex-1 bg-MainBackgroundColor p-4">
      <FlatList
        data={data}
        keyExtractor={(item) => item.id.toString()}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          gap: 10,
          paddingBottom: 100,
        }}
        renderItem={({ item }) => <EventCard dataList={item} />}
        refreshing={isRefreshing}
        onRefresh={onRefresh}
      />
    </SafeAreaView>
  );
};

export default index;
