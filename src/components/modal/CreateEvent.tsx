import {
  Image,
  KeyboardAvoidingView,
  Modal,
  Platform,
  ScrollView,
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
import { supabase } from "@/src/utils/supabase";
import { useAuth } from "@/src/context/AuthProvider";
import DateTimePicker from "@react-native-community/datetimepicker";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import * as FileSystem from 'expo-file-system';
import { decode } from 'base64-arraybuffer';

interface CreateEventProps {
  modalVisible: boolean;
  setModalVisible: Dispatch<SetStateAction<boolean>>;
}

const CreateEvent = ({ modalVisible, setModalVisible }: CreateEventProps) => {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    date: "",
    time: null,
    latitude: "",
    longitude: "",
    imageUri: null as string | null,
  });
  const [mapVisible, setMapVisible] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState<{
    latitude: number;
    longitude: number;
  } | null>(null);
  const [locationSearchModal, setLocationSearchModal] = useState(false);
  const [showDatePicker, setShowDatePicker] = useState(false);

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

  const handleMapSelect = (event: any) => {
    const { latitude, longitude } = event.nativeEvent.coordinate;
    setFormData((prev) => ({
      ...prev,
      latitude: latitude.toString(),
      longitude: longitude.toString(),
    }));
    setSelectedLocation({ latitude, longitude });
    setMapVisible(false);
  };

  const handleDateChange = (event: any, selectedDate?: Date) => {
    setShowDatePicker(false);
    if (selectedDate) {
      // Convert selectedDate to a string
      const formattedDate = selectedDate.toISOString().split("T")[0]; // e.g., "2025-01-15"
      handleInputChange("date", formattedDate);
    }
  };

  const { user } = useAuth();

  const handleCreateEvent = async () => {
    const { name, description, date, time, latitude, longitude, imageUri } =
      formData;
      
    try {
      // Upload Image
      const base64 = await FileSystem.readAsStringAsync(imageUri!, { encoding: 'base64' });
      const fileName = `${user?.id}/${new Date().getTime()}.jpeg`;

      const { data: uploadData, error: uploadError } = await supabase.storage
        .from("event-images")
        .upload(fileName, decode(base64), {
          contentType: "image/jpeg",
        });

      if (uploadError) {
        // console.log(uploadError);
        throw new Error(uploadError.message);
      }

      const imageUrl = supabase.storage
        .from("event-images")
        .getPublicUrl(fileName).data.publicUrl;

      // Insert Event Data
      const { data, error } = await supabase.from("events").insert([
        {
          name,
          description,
          date,
          event_time: time,
          image_url: imageUrl,
          user_id: user?.id,
          latitude: latitude || null,
          longitude: longitude || null,
        },
      ]);

      if (error) {
        throw new Error(error.message);
      }

      alert("Success" + "Event created successfully!");
      setModalVisible(false);
      resetForm();
    } catch (error: any) {
      alert("Error" + error.message);
    }
  };

  const resetForm = () => {
    setFormData({
      name: "",
      description: "",
      date: "",
      time: null,
      latitude: "",
      longitude: "",
      imageUri: null,
    });
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

        {/* Image Picker */}
        {formData.imageUri && (
          <Image
            source={{ uri: formData.imageUri }}
            className="w-full h-40 rounded my-4"
            resizeMode="cover"
          />
        )}

        {/* Submit Button */}
        <TouchableOpacity
          className="bg-PrimaryColor p-3 rounded"
          onPress={handleCreateEvent}
        >
          <Text className="text-white text-center font-bold">Create Event</Text>
        </TouchableOpacity>
      </View>
    </Modal>
  );
};

export default CreateEvent;
