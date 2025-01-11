import {
  ActivityIndicator,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { Dispatch, SetStateAction } from "react";
import { taskStatusChange } from "@/src/utils/quries/taskQuery";

interface AlertScreenProps {
  setAlertOpen: Dispatch<SetStateAction<boolean>>;
  taskId: number;
  taskStatus?: string;
  userId: string;
}

const AlertScreen = ({
  setAlertOpen,
  taskId,
  taskStatus,
  userId,
}: AlertScreenProps) => {
  const newStatus = taskStatus === "complete" ? "pending" : "complete";

  const { mutate, isPending } = taskStatusChange({ taskId, newStatus, userId, setAlertOpen });

  const handleUpdateBtn = () => {
    mutate();
  };

  return (
    <View className="absolute left-0 right-0 flex-1 p-3 min-h-full justify-center items-center bg-[#000000cd]">
      <Text className="text-PrimaryTextColor text-xl font-medium">
        {" "}
        Are you want to update this ?{" "}
      </Text>
      <View className="flex-row justify-center gap-5">
        <TouchableOpacity
          onPress={handleUpdateBtn}
          className="bg-[#d6d6d6] rounded-md py-2 w-20 mt-3 items-center"
        >
          {isPending ? <ActivityIndicator /> : <Text>Update</Text>}
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => setAlertOpen(false)}
          className="bg-red-500 rounded-md py-2 w-20 mt-3 items-center"
        >
          <Text>Cancle</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default AlertScreen;
