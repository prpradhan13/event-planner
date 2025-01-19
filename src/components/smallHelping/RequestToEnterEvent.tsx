import { ActivityIndicator, Alert, Pressable, Text, View } from "react-native";
import React, { Dispatch, SetStateAction, useEffect } from "react";
import { useAuth } from "@/src/context/AuthProvider";
import { addGuest } from "@/src/utils/quries/guestQuery";
import { sendRequestForEntryNotification } from "@/src/utils/notification";

interface RequestToEnterEventProps {
  setRequestToEnter: Dispatch<SetStateAction<boolean>>;
  eventCreaterId: string;
  eventId: number;
  price?: number;
}

const RequestToEnterEvent = ({
  setRequestToEnter,
  eventCreaterId,
  eventId,
}: RequestToEnterEventProps) => {
  const { user } = useAuth();
  const userId = user?.id;

  useEffect(() => {
    if (eventCreaterId === user?.id) {
      Alert.alert("Notice", "You are the creator of this event.");
      setRequestToEnter(false);
    }
  }, [eventCreaterId, user?.id, setRequestToEnter]);

  const { mutate, isPending } = addGuest(userId!, eventId, setRequestToEnter);

  const handlePressOnYes = () => {
    mutate({ guestStatus: "request" });
  };

  return (
    <View className="absolute h-screen w-[100vw] top-0 right-0 bg-[#000000a7] px-4 justify-center">
      <View className="bg-[#4a4a4a] p-5 h-40 rounded-md justify-center items-center">
        <Text className="text-[#fff] font-medium text-xl">
          Are you want to go in this event?
        </Text>
        <View className="flex-row gap-5 mt-5">
          <Pressable
            onPress={() => setRequestToEnter(false)}
            className="bg-red-500 w-24 py-2 rounded-md"
          >
            <Text className="text-[#000] font-medium text-center">No</Text>
          </Pressable>
            <Pressable
              onPress={handlePressOnYes}
              disabled={isPending}
              className="bg-[#fff] w-24 py-2 rounded-md"
            >
              {isPending ? (
                <ActivityIndicator />
              ) : (
                <Text className="text-[#000] font-medium text-center">Yes</Text>
              )}
            </Pressable>
        </View>
      </View>
    </View>
  );
};

export default RequestToEnterEvent;
