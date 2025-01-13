import {
  Modal,
  Text,
  View,
} from "react-native";
import React, { Dispatch, SetStateAction } from "react";
import Ionicons from "@expo/vector-icons/Ionicons";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";

interface SearchLocationProps {
  modalVisible: boolean;
  setModalVisible: Dispatch<SetStateAction<boolean>>;
  setFormData: any;
  setSelectedLocation: any;
}

const SearchLocation = ({
  modalVisible,
  setModalVisible,
  setFormData,
  setSelectedLocation,
}: SearchLocationProps) => {

  const handleSelectPlace = (data: any, details: any) => {
    const { lat, lng } = details.geometry.location;
    setFormData((prev) => ({
      ...prev,
      latitude: lat.toString(),
      longitude: lng.toString(),
    }));
    setSelectedLocation({ latitude: lat, longitude: lng });
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
          <Text className="text-white text-2xl font-bold">Search</Text>
        </View>

        <View style={{zIndex: 1, flex: 0.5}}>
          <GooglePlacesAutocomplete
            placeholder="Search"
            fetchDetails={true}
            onPress={handleSelectPlace}
            query={{
              key: "AIzaSyDThNzlwIPI2u6XUh3_I-H3ztzg5h9u9dQ",
              language: "en",
            }}
            onFail={(error) => console.log('error' + error)}
          />
        </View>
      </View>
    </Modal>
  );
};

export default SearchLocation;
