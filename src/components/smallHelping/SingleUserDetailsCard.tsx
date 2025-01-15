import { Image, StyleSheet, Text, View } from "react-native";
import React, { useMemo } from "react";
import { getUserDetatils } from "@/src/utils/quries/userQuery";
import getInitialLetter from "@/src/utils/initialLetter";

const SingleUserDetailsCard = ({userId}: {userId: string}) => {
  const { data } = getUserDetatils(userId);

  const eventInitialLetter = useMemo(
    () => getInitialLetter(data?.full_name),
    [data?.full_name]
  );

  return (
    <View className="bg-SecondaryBackgroundColor p-3 rounded-xl flex-row items-center justify-between">
      <View className="w-[70%]">
        <Text className="text-PrimaryTextColor text-lg font-medium">
          {data?.full_name}
        </Text>
        <Text className="text-PrimaryTextColor">{data?.username}</Text>
      </View>

      <View className="h-20 w-20 rounded-full bg-SecondaryTextColor items-center justify-center">
        {data?.avatar_url ? (
          <Image
            source={{ uri: data.avatar_url }}
            style={{
              width: 80,
              height: 80,
              borderRadius: 100,
            }}
            resizeMode="cover"
          />
        ) : (
          <Text className="font-semibold text-lg">{eventInitialLetter}</Text>
        )}
      </View>
    </View>
  );
};

export default SingleUserDetailsCard;

const styles = StyleSheet.create({});
