import {
  ActivityIndicator,
  Image,
  Modal,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import React, { Dispatch, SetStateAction, useState } from "react";
import Ionicons from "@expo/vector-icons/Ionicons";
import * as ImagePicker from "expo-image-picker";
import Entypo from "@expo/vector-icons/Entypo";
import SearchLocation from "./SearchLocation";
import { useAuth } from "@/src/context/AuthProvider";
import DateTimePicker from "@react-native-community/datetimepicker";
import { CreateEventFormData } from "@/src/types/eventType";
import { createEvent } from "@/src/utils/quries/eventQurery";
import { MAX_IMAGE_FILE_SIZE } from "@/src/utils/constants/constants";
import { CreateEventModalButton } from "../buttons/CreateEventModal";
import dayjs from "dayjs";

interface CreateEventProps {
  modalVisible: boolean;
  setModalVisible: Dispatch<SetStateAction<boolean>>;
}

const CreateEvent = ({ modalVisible, setModalVisible }: CreateEventProps) => {
  const [formData, setFormData] = useState<CreateEventFormData>({
    name: "",
    description: "",
    date: null,
    event_time: null,
    latitude: null,
    longitude: null,
    imageUri: null,
  });
  const [locationSearchModal, setLocationSearchModal] = useState(false);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showTimePicker, setShowTimePicker] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState("");

  const { user } = useAuth();

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleImagePick = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images"],
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled) {
      const assets = result.assets[0];

      if (assets.fileSize && assets.fileSize > MAX_IMAGE_FILE_SIZE) {
        alert(
          "The selected image is too large. Please choose an image smaller than 5 MB."
        );
        return;
      }

      setFormData((prev) => ({ ...prev, imageUri: result.assets[0].uri }));
    }
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
      handleInputChange("date", formattedDate);
    }
  };

  const handleTimeChange = (event: any, selectedTime?: Date) => {
    setShowTimePicker(false);
    if (event.type === "dismissed") {
      // User cancelled the time picker
      return;
    }

    if (selectedTime) {
      const localTime = new Date(
        selectedTime.getTime() - selectedTime.getTimezoneOffset() * 60000
      );
      const formattedTime = localTime.toISOString().split("T")[1].slice(0, 5); // e.g., "14:30"
      handleInputChange("event_time", formattedTime);
    }
  };

  const resetForm = () => {
    setFormData({
      name: "",
      description: "",
      date: null,
      event_time: null,
      latitude: 0,
      longitude: 0,
      imageUri: null,
    });
  };

  const { mutate, isPending } = createEvent({
    formData,
    userId: user?.id,
    setModalVisible,
    resetForm,
  });

  const handleCreateEvent = () => {
    mutate();
  };

  return (
    <Modal visible={modalVisible} animationType="slide" transparent>
      <View className="flex-1 bg-MainBackgroundColor p-4">
        <View className="flex-row gap-5 items-center">
          <Ionicons
            onPress={() => setModalVisible(false)}
            name="arrow-back-sharp"
            size={24}
            color="#fff"
          />
          <Text className="text-white text-2xl font-bold">Create Event</Text>
        </View>

        {/* Input Fields */}
        <View className="mt-4 gap-3">
          <View className="">
            <Text className="text-SecondaryTextColor font-semibold text-xl">Event Name:</Text>
            <TextInput
              className="border border-[#fff] text-white p-3 rounded-lg"
              placeholderTextColor="#aaa"
              value={formData.name}
              onChangeText={(value) => handleInputChange("name", value)}
            />
          </View>

          <View className="">
            <Text className="text-SecondaryTextColor font-semibold text-xl">Description:</Text>
            <TextInput
              className="border border-[#fff] text-white p-3 rounded-lg"
              placeholderTextColor="#aaa"
              value={formData.description}
              onChangeText={(value) => handleInputChange("description", value)}
              multiline
            />
          </View>
        </View>

        <View className="flex-row justify-center gap-4 mt-5">
          <CreateEventModalButton
            onPress={() => setShowDatePicker(true)}
            btnIconName="calendar"
            btnColor="#01b7ff"
          />

          <CreateEventModalButton
            onPress={() => setShowTimePicker(true)}
            btnIconName="clock"
            btnColor="#00f104"
          />

          <CreateEventModalButton
            onPress={() => setLocationSearchModal(true)}
            btnIconName="location-pin"
            btnColor="#ef4444"
            btnSize={26}
          />

          <CreateEventModalButton
            onPress={handleImagePick}
            btnIconName="images"
            btnColor="#f80"
          />
        </View>

        <View className="mt-5 gap-y-3">
          {/* Selected Date Show */}
          {formData.date && (
            <View className="flex-row gap-2 items-center">
              <Entypo name="calendar" size={20} color="#01b7ff" />
              <Text className="text-[#fff] text-base">
                {dayjs(formData.date).format("dddd, D MMM YYYY")}
              </Text>
            </View>
          )}

          {/* Selected Time Show */}
          {formData.event_time && (
            <View className="flex-row gap-2 items-center">
              <Entypo name="clock" size={20} color="#00f104" />
              <Text className="text-[#fff] text-base">
                {dayjs(`1970-01-01T${formData.event_time}:00`).format(
                  "hh:mm A"
                )}
              </Text>
            </View>
          )}

          {/* Selected Location Show */}
          {selectedLocation && (
            <View className="flex-row gap-2 items-center">
              <Entypo name="location-pin" size={24} color="#ef4444" />
              <Text className="text-[#fff] leading-5 text-base">
                {selectedLocation}
              </Text>
            </View>
          )}

          {/* Selected Image Show */}
          {formData.imageUri && (
            <Image
              source={{ uri: formData.imageUri }}
              style={{
                width: "100%",
                height: 260,
                borderRadius: 10,
              }}
              resizeMode="cover"
            />
          )}
        </View>

        {showDatePicker && (
          <DateTimePicker
            value={formData.date ? new Date(formData.date) : new Date()}
            mode="date"
            display="default"
            onChange={handleDateChange}
          />
        )}

        {showTimePicker && (
          <DateTimePicker
            value={
              formData.event_time
                ? new Date(`1970-01-01T${formData.event_time}:00`)
                : new Date()
            }
            mode="time"
            display="default"
            onChange={handleTimeChange}
          />
        )}

        {locationSearchModal && (
          <SearchLocation
            modalVisible={locationSearchModal}
            setModalVisible={setLocationSearchModal}
            setFormData={setFormData}
            setSelectedLocation={setSelectedLocation}
          />
        )}

        <View className="absolute bottom-6 left-0 right-0 px-4">
          <Text className="text-sm text-SecondaryTextColor mt-2">
            *Maximum size of image is 5mb and file type (.jpg)
          </Text>

          {/* Submit Button */}
          <TouchableOpacity
            className={`${
              isPending ? "bg-blue-400" : "bg-blue-500"
            } p-3 rounded-md mt-2`}
            disabled={isPending}
            onPress={handleCreateEvent}
          >
            {isPending ? (
              <ActivityIndicator color={"white"} />
            ) : (
              <Text className="text-white text-center font-bold">
                Create Event
              </Text>
            )}
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

export default CreateEvent;
