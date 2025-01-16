import {
  ActivityIndicator,
  Alert,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React, { Dispatch, SetStateAction } from "react";
import { removeGuest } from "@/src/utils/quries/guestQuery";

interface InvitationRejectAlertProps {
  setInvitationReject: Dispatch<SetStateAction<boolean>>;
  invitationId: number;
}

const InvitationRejectAlert = ({
  setInvitationReject,
  invitationId,
}: InvitationRejectAlertProps) => {
  const { mutate, isPending } = removeGuest(setInvitationReject);

  const handlePressOnYes = () => {
    mutate({ invitationId })
  };

  return (
    <View className="absolute h-screen w-[100vw] top-0 right-0 bg-[#000000a7] px-4 justify-center">
      <View className="bg-[#4a4a4a] p-5 h-40 rounded-md justify-center items-center">
        <Text className="text-[#fff] font-medium text-xl">
          Are you want to take back request?
        </Text>
        <View className="flex-row gap-5 mt-5">
          <Pressable
            onPress={() => setInvitationReject(false)}
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

export default InvitationRejectAlert;
