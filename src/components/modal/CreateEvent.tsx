import {
  ActivityIndicator,
  Image,
  Modal,
  Text,
  TextInput,
  TouchableOpacity,
  View
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

interface CreateEventProps {
  modalVisible: boolean;
  setModalVisible: Dispatch<SetStateAction<boolean>>;
}

const CreateEvent = ({ modalVisible, setModalVisible }: CreateEventProps) => {
  const [formData, setFormData] = useState<CreateEventFormData>({
    name: "",
    description: "",
    date: "",
    event_time: null,
    latitude: null,
    longitude: null,
    imageUri: null,
  });
  const [locationSearchModal, setLocationSearchModal] = useState(false);
  const [showDatePicker, setShowDatePicker] = useState(false);
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
      setFormData((prev) => ({ ...prev, imageUri: result.assets[0].uri }));
    }
  };

  const handleDateChange = (event: any, selectedDate?: Date) => {
    setShowDatePicker(false);
    if (selectedDate) {
      // Adjust to local timezone
      const localDate = new Date(selectedDate.getTime() - selectedDate.getTimezoneOffset() * 60000);
      const formattedDate = localDate.toISOString().split("T")[0]; // e.g., "2025-01-15"
      handleInputChange("date", formattedDate);
    }
  };

  const resetForm = () => {
    setFormData({
      name: "",
      description: "",
      date: "",
      event_time: null,
      latitude: 0,
      longitude: 0,
      imageUri: null,
    });
  };

  const { mutate, isPending } = createEvent({ formData, userId: user?.id, setModalVisible, resetForm })

  const handleCreateEvent = () => {
    mutate()
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
        <View className="mt-4">
          <TextInput
            className="bg-[#333] text-white p-3 mb-4 rounded"
            placeholder="Event Name"
            placeholderTextColor="#aaa"
            value={formData.name}
            onChangeText={(value) => handleInputChange("name", value)}
          />
          <TextInput
            className="bg-[#333] text-white p-3 mb-4 rounded"
            placeholder="Description"
            placeholderTextColor="#aaa"
            value={formData.description}
            onChangeText={(value) => handleInputChange("description", value)}
            multiline
          />
          <TouchableOpacity
            className="border border-gray-400 p-3 rounded-md"
            onPress={() => setShowDatePicker(true)}
          >
            <Text className="text-white">
              {formData.date ? formData.date : "Select Event Date"}
            </Text>
          </TouchableOpacity>
          {showDatePicker && (
            <DateTimePicker
              value={formData.date ? new Date(formData.date) : new Date()}
              mode="date"
              display="default"
              onChange={handleDateChange}
            />
          )}
        </View>

        <View className="flex-row items-center gap-4 mt-5">
          <TouchableOpacity
            onPress={() => setLocationSearchModal(true)}
            className="flex-row items-center gap-2 bg-[#dcdcdc] w-36 py-1 justify-center rounded-md"
          >
            <Entypo name="location-pin" size={24} color="#000" />
            <Text className="font-medium">Location</Text>
          </TouchableOpacity>

          <TouchableOpacity
            className="flex-row items-center gap-2 bg-[#dcdcdc] w-40 py-1 justify-center rounded-md"
            onPress={handleImagePick}
          >
            <Entypo name="images" size={22} color="#000" />
            <Text className="text-black font-medium">
              {formData.imageUri ? "Change Image" : "Add Image"}
            </Text>
          </TouchableOpacity>
        </View>

        {locationSearchModal && (
          <SearchLocation
            modalVisible={locationSearchModal}
            setModalVisible={setLocationSearchModal}
            setFormData={setFormData}
            setSelectedLocation={setSelectedLocation}
          />
        )}

        {selectedLocation && (
          <View className="flex-row gap-2 items-center mt-5">
            <Entypo name="location-pin" size={24} color="#ef4444" />
            <Text className="text-SecondaryTextColor leading-5 text-lg capitalize font-medium">{selectedLocation}</Text>
          </View>
        )}

        {/* Image Picker */}
        {formData.imageUri && (
          <Image
            source={{ uri: formData.imageUri }}
            className="w-full h-[200] rounded my-4"
            resizeMode="cover"
          />
        )}

        {/* Submit Button */}
        <TouchableOpacity
          className="bg-blue-500 p-3 rounded-md mt-4"
          onPress={handleCreateEvent}
        >
          {isPending ? (
            <ActivityIndicator color={"white"} />
          ) : (
            <Text className="text-white text-center font-bold">Create Event</Text>
          )}
        </TouchableOpacity>
      </View>
    </Modal>
  );
};

export default CreateEvent;
