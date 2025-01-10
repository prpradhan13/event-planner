import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import FontAwesome from "@expo/vector-icons/FontAwesome";
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
      <FontAwesome name="user" size={16} color="#eee" />
      {data?.full_name === user?.user_metadata.full_name ? (
        <Text className="text-PrimaryTextColor capitalize font-medium">
          You
        </Text>
      ) : (
        <Text className="text-PrimaryTextColor capitalize font-medium">
          {data?.full_name}
        </Text>
      )}
    </TouchableOpacity>
  );
};

export default UserNameBtn;

const styles = StyleSheet.create({});
