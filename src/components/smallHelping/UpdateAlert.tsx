import { ActivityIndicator, Pressable, StyleSheet, Text, View } from "react-native";
import React, { Dispatch, SetStateAction } from "react";

interface UpdateAlertProps {
    onPress?: () => void;
    isPending?: boolean;
    setSelectedToUpdate: Dispatch<SetStateAction<any>>
    btnName?: string;
}

const UpdateAlert = ({ setSelectedToUpdate, isPending, onPress, btnName="Update" }: UpdateAlertProps) => {
  return (
    <View className="absolute h-screen w-[100vw] top-0 right-0 bg-[#000000a7] px-4 justify-center">
      <View className="bg-[#4a4a4a] p-5 h-40 rounded-md justify-center items-center">
        <Text className="text-[#fff] font-medium text-xl">
          Are you sure to {btnName}?
        </Text>
        <View className="flex-row gap-5 mt-5">
          <Pressable
            onPress={() => setSelectedToUpdate(null)}
            className="bg-red-500 w-24 py-2 rounded-md"
          >
            <Text className="text-[#000] font-medium text-center">Cancle</Text>
          </Pressable>
          <Pressable
            onPress={onPress}
            disabled={isPending}
            className="bg-[#fff] w-28 py-2 rounded-md"
          >
            {isPending ? (
              <ActivityIndicator />
            ) : (
              <Text className="text-[#000] font-medium text-center">
                {btnName}
              </Text>
            )}
          </Pressable>
        </View>
      </View>
    </View>
  );
};

export default UpdateAlert;

const styles = StyleSheet.create({});
