import { ActivityIndicator, Pressable, StyleSheet, Text, View } from "react-native";
import React, { Dispatch, SetStateAction } from "react";
import { inviteStatusChange } from "@/src/utils/quries/invitesQurey";

interface RemoveGuestProps {
    inviteId: number;
    setSelectedGuestToRemove: Dispatch<SetStateAction<number | null>>
}

const RemoveGuest = ({ inviteId, setSelectedGuestToRemove }: RemoveGuestProps) => {
    const { mutate, isPending } = inviteStatusChange();

    const handleRemoveGuest = () => {
      mutate({ inviteId, newStatus: "declined" })
    }

  return (
    <View className="absolute top-0 right-0 bg-[#000000a7] justify-center items-center w-[100vw] h-full">
      <View className="items-center">
        <Text className="text-[#fff] font-medium text-xl">
          Are you sure to remove?
        </Text>
        <View className="flex-row gap-5 mt-5">
          <Pressable
            onPress={() => setSelectedGuestToRemove(null)}
            className="bg-red-500 w-24 py-2 rounded-md"
          >
            <Text className="text-[#000] font-medium text-center">Cancle</Text>
          </Pressable>
          <Pressable
            onPress={handleRemoveGuest}
            disabled={isPending}
            className="bg-[#fff] w-24 py-2 rounded-md"
          >
            {isPending ? (
              <ActivityIndicator />
            ) : (
              <Text className="text-[#000] font-medium text-center">
                Remove
              </Text>
            )}
          </Pressable>
        </View>
      </View>
    </View>
  );
};

export default RemoveGuest;
