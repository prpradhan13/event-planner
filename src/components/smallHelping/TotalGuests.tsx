import { Text, TouchableOpacity, View } from "react-native";
import React, { useState } from "react";
import { guestQuery } from "@/src/utils/quries/guestQuery";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import GuestList from "../modal/GuestList";

interface TotalGuestsProps {
  eventId?: number;
}

const TotalGuests = ({ eventId }: TotalGuestsProps) => {
    const [modalVisible, setModalVisible] = useState(false)

  return (
    <View>
        <TouchableOpacity 
            onPress={() => setModalVisible(true)}
            className="gap-2 flex-row items-center border py-1 px-2 rounded-md border-BorderColor"
        >
            <FontAwesome5 name="users" size={14} color="#c8c8c8" />
            <Text className="text-SecondaryTextColor font-medium text-base">
                Member
            </Text>
        </TouchableOpacity>

        {modalVisible && (
            <GuestList 
                modalVisible={modalVisible}
                setModalVisible={setModalVisible}
                eventId={eventId}
            />
        )}
    </View>
  );
};

export default TotalGuests;
