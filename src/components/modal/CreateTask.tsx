import {
  ActivityIndicator,
  Modal,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import React, { Dispatch, SetStateAction, useMemo, useState } from "react";
import Ionicons from "@expo/vector-icons/Ionicons";
import { CreateEventTasksFormData } from "@/src/types/eventType";
import { useAuth } from "@/src/context/AuthProvider";
import DateTimePicker from "@react-native-community/datetimepicker";
import GuestListCard from "../smallHelping/GuestListCard";
import UserCardForTask from "../smallHelping/UserCardForTask";
import { Image } from "react-native";
import { getUserDetatils } from "@/src/utils/quries/userQuery";
import getInitialLetter from "@/src/utils/initialLetter";
import SingleUserDetailsCard from "../smallHelping/SingleUserDetailsCard";
import { addTask } from "@/src/utils/quries/taskQuery";
import { useQueryClient } from "@tanstack/react-query";

interface CreateTaskProps {
  modalVisible: boolean;
  setModalVisible: Dispatch<SetStateAction<boolean>>;
  eventId: number;
}

const CreateTask = ({
  modalVisible,
  setModalVisible,
  eventId,
}: CreateTaskProps) => {
  const { user } = useAuth();

  const [formData, setFormData] = useState<CreateEventTasksFormData>({
    task_name: "",
    description: "",
    due_date: null,
    event_id: eventId,
    assigned_to: "",
  });
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [openAllUsersList, setOpenAllUsersList] = useState(false);

  const queryClient = useQueryClient();

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleDateChange = (event: any, selectedDate?: Date) => {
    setShowDatePicker(false);
    if (event.type === "dismissed") {
      // User cancelled the date picker
      return;
    }

    if (selectedDate) {
      // Adjust to local timezone
      const localDate = new Date(
        selectedDate.getTime() - selectedDate.getTimezoneOffset() * 60000
      );
      const formattedDate = localDate.toISOString().split("T")[0]; // e.g., "2025-01-15"
      handleInputChange("due_date", formattedDate);
    }
  };

  const { mutate, isPending } = addTask(eventId, setModalVisible);

  const handleCreateTask = () => {
    mutate({ formData });
  };

  return (
    <Modal visible={modalVisible} animationType="slide">
      <View className="flex-1 bg-MainBackgroundColor p-4">
        <View className="flex-row gap-5 items-center">
          <Ionicons
            onPress={() => setModalVisible(false)}
            name="arrow-back-sharp"
            size={24}
            color="#fff"
          />
          <Text className="text-white text-2xl font-bold">Create Tasks</Text>
        </View>

        <View className="my-5 gap-4">
          <View>
            <Text className="text-SecondaryTextColor font-semibold text-xl">
              Task Name:
            </Text>
            <TextInput
              className="border border-[#fff] text-white p-3 rounded-lg"
              placeholderTextColor="#aaa"
              value={formData.task_name}
              onChangeText={(value) => handleInputChange("task_name", value)}
            />
          </View>
          <View>
            <Text className="text-SecondaryTextColor font-semibold text-xl">
              Description:
            </Text>
            <TextInput
              className="border border-[#fff] text-white p-3 rounded-lg"
              placeholderTextColor="#aaa"
              value={formData.description}
              onChangeText={(value) => handleInputChange("description", value)}
              multiline
            />
          </View>
          <Pressable onPress={() => setShowDatePicker(true)}>
            <Text className="text-SecondaryTextColor font-semibold text-xl">
              Due Date:
            </Text>
            <Text className="border border-[#fff] text-white p-3 rounded-lg">
              {formData.due_date ? formData.due_date : "Select Date"}
            </Text>
          </Pressable>

          <Pressable
            onPress={() => setOpenAllUsersList(true)}
            className="bg-[#fff] rounded-md py-2 w-24"
          >
            <Text className="text-center font-medium">Assign</Text>
          </Pressable>
        </View>

        {formData.assigned_to && (
          <SingleUserDetailsCard userId={formData.assigned_to} />
        )}

        {openAllUsersList && (
          <UserCardForTask
            modalVisible={openAllUsersList}
            setModalVisible={setOpenAllUsersList}
            setFormData={setFormData}
          />
        )}

        {showDatePicker && (
          <DateTimePicker
            value={formData.due_date ? new Date(formData.due_date) : new Date()}
            mode="date"
            display="default"
            onChange={handleDateChange}
          />
        )}

        <Pressable
          className={`${
            isPending ? "bg-blue-400" : "bg-blue-500"
          } p-3 rounded-md mt-2`}
          disabled={isPending}
          onPress={handleCreateTask}
        >
          {isPending ? (
            <ActivityIndicator color={"white"} />
          ) : (
            <Text className="text-white text-center font-bold">
              Create Event
            </Text>
          )}
        </Pressable>
      </View>
    </Modal>
  );
};

export default CreateTask;
