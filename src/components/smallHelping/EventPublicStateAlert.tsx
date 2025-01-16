import { ActivityIndicator, Pressable, Text, View } from "react-native";
import React, { Dispatch, SetStateAction } from "react";
import { updateEventPublicState } from "@/src/utils/quries/eventQurery";

const EventPublicStateAlert = ({
  selectedEventToUpdatePublic,
  setSelectedEventToUpdatePublic,
  publicState,
}: {
  selectedEventToUpdatePublic: number;
  setSelectedEventToUpdatePublic: Dispatch<SetStateAction<number | null>>;
  publicState: boolean;
}) => {
  const newPublicState = !publicState;

  const { mutate, isPending } = updateEventPublicState(
    selectedEventToUpdatePublic,
    setSelectedEventToUpdatePublic
  );
  const handleEventPublicStateUpdate = () => {
    mutate({ publicState: newPublicState });
  };

  return (
    <View className="absolute h-screen w-[100vw] top-0 right-0 bg-[#000000a7] px-4 justify-center">
      <View className="bg-[#4a4a4a] p-5 h-40 rounded-md justify-center items-center">
        <Text className="text-[#fff] font-medium text-xl">
          Are you sure to update?
        </Text>
        <View className="flex-row gap-5 mt-5">
          <Pressable
            onPress={() => setSelectedEventToUpdatePublic(null)}
            className="bg-red-500 w-24 py-2 rounded-md"
          >
            <Text className="text-[#000] font-medium text-center">Cancle</Text>
          </Pressable>
          <Pressable
            onPress={handleEventPublicStateUpdate}
            disabled={isPending}
            className="bg-[#fff] w-24 py-2 rounded-md"
          >
            {isPending ? (
              <ActivityIndicator />
            ) : (
              <Text className="text-[#000] font-medium text-center">
                Update
              </Text>
            )}
          </Pressable>
        </View>
      </View>
    </View>
  );
};

export default EventPublicStateAlert;
