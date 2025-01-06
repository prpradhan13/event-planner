import { ActivityIndicator, FlatList, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { useAuth } from "@/src/context/AuthProvider";
import { inviteQuery } from "@/src/utils/quries/invitesQurey";
import LoadData from "../smallHelping/LoadData";
import InvitesListItem from "./InvitesListItem";


const Invites = () => {
  const { user } = useAuth();

  const { data, isLoading } = inviteQuery(user?.id);

  // console.log(data);

  if (isLoading) {
    return <LoadData />
  }

  if (!data || data.length === 0) {
    return (
      <View className="w-full justify-center items-center mt-10">
        <Text className="text-[#c6c6c6] text-xl">No Invites</Text>
      </View>
    )
  }

  return (
    <View className="px-4">
      <FlatList 
        data={data}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={{
          paddingVertical: 16,
          gap: 16
        }}
        renderItem={({ item }) => <InvitesListItem inviteList={item} />}
      />
    </View>
  );
};

export default Invites;
