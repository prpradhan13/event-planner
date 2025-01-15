import {
  ActivityIndicator,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { Dispatch, SetStateAction } from "react";
import { deleteTask } from "@/src/utils/quries/taskQuery";

interface DeleteAlertProps {
  deleteAlertOpen: number | null;
  setDeleteAlertOpen: Dispatch<SetStateAction<number | null>>;
  eventId: number;
}

const DeleteAlert = ({
  deleteAlertOpen,
  setDeleteAlertOpen,
  eventId
}: DeleteAlertProps) => {
  const { mutate, isPending } = deleteTask(deleteAlertOpen!, eventId);

  const handleRemoveTask = () => {
    mutate();
    setDeleteAlertOpen(null);
  };

  return (
    <View className="absolute h-screen w-[100vw] top-0 right-0 bg-[#000000a7] px-4 justify-center">
      <View className="bg-[#4a4a4a] p-5 rounded-md justify-center items-center">
        <Text className="text-PrimaryTextColor text-xl font-medium">
          {" "}
          Are you want to Delete this ?{" "}
        </Text>
        <View className="flex-row justify-center gap-5">
          <TouchableOpacity
            onPress={() => setDeleteAlertOpen(null)}
            className="bg-red-500 rounded-md py-2 w-20 mt-3 items-center"
          >
            <Text>Cancle</Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={handleRemoveTask}
            disabled={isPending}
            className="bg-[#d6d6d6] rounded-md py-2 w-20 mt-3 items-center"
          >
            {isPending ? <ActivityIndicator /> : <Text>Update</Text>}
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default DeleteAlert;
