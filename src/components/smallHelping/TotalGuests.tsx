import { Text, TouchableOpacity, View } from "react-native";
import React, { useState } from "react";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import GuestList from "../modal/GuestList";

interface TotalGuestsProps {
  eventId?: number;
  eventCreaterId?: string;
}

const TotalGuests = ({ eventId, eventCreaterId }: TotalGuestsProps) => {
    const [modalVisible, setModalVisible] = useState(false)

  return (
    <View>
        <TouchableOpacity 
            onPress={() => setModalVisible(true)}
            className="gap-2 flex-row items-center py-1 px-2 rounded-md bg-[#ebebeb]"
        >
            <FontAwesome5 name="users" size={14} color="#000" />
            <Text className="text-[#000] font-medium text-base">
                Member
            </Text>
        </TouchableOpacity>

        {modalVisible && (
            <GuestList 
                modalVisible={modalVisible}
                setModalVisible={setModalVisible}
                eventId={eventId}
                eventCreaterId={eventCreaterId}
            />
        )}
    </View>
  );
};

export default TotalGuests;
