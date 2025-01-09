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
  const { data } = guestQuery(eventId);

  const totalGuests = data?.length;

  return (
    <View>
        <TouchableOpacity 
            onPress={() => setModalVisible(true)}
            className="gap-2 flex-row items-center"
        >
            <FontAwesome5 name="users" size={16} color="#f97316" />
            <Text className="text-[#f97316] font-semibold text-lg">
                {totalGuests}
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
