import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import Entypo from '@expo/vector-icons/Entypo';
import { getUserDetatils } from "@/src/utils/quries/userQuery";
import { useAuth } from "@/src/context/AuthProvider";

interface UserNameBtnProps {
  userId: string;
}

const UserNameBtn = ({ userId }: UserNameBtnProps) => {
  const { data, isLoading } = getUserDetatils(userId);
  const { user } = useAuth();

  if (isLoading)
    return <Text className="text-PrimaryTextColor">Loading...</Text>;

  return (
    <TouchableOpacity className="flex-row items-center gap-2 bg-[#5d5d5d] self-start px-2 py-1 rounded-md">
      <Entypo name="user" size={16} color="#eee" />
      {data?.full_name === user?.user_metadata.full_name ? (
        <Text className="text-PrimaryTextColor capitalize font-medium text-sm">
          You
        </Text>
      ) : (
        <Text className="text-PrimaryTextColor capitalize font-medium text-sm">
          {data?.full_name}
        </Text>
      )}
    </TouchableOpacity>
  );
};

export default UserNameBtn;
