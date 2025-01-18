import { Modal, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { Dispatch, SetStateAction, useState } from "react";
import Ionicons from "@expo/vector-icons/Ionicons";
import EntryStatusUpdateAlert from "../smallHelping/EntryStatusUpdateAlert";
import PriceSetForm from "../smallHelping/PriceSetForm";
import UpdateAlert from "../smallHelping/UpdateAlert";
import { updateEventPrice } from "@/src/utils/quries/eventQurery";

interface EntryModalProps {
  eventId: number;
  entryStatus: boolean;
  eventPrice: number;
  isPaid: boolean;
  modalVisible: boolean;
  setModalVisible: Dispatch<SetStateAction<boolean>>;
}

const EntryModal = ({
  eventId,
  entryStatus,
  eventPrice,
  modalVisible,
  setModalVisible,
}: EntryModalProps) => {
  const [selectedEventToUpdateEntry, setSelectedEventToUpdateEntry] =
    useState(false);

  const [priceSetAlert, setPriceSetAlert] = useState(false);

  const [priceSetFree, setPriceSetFree] = useState(false);

  const { mutate, isPending } = updateEventPrice(eventId, setPriceSetFree);

  const handlePressOnFreeBtn = () => {
    mutate({ newPrice: 0.0 });
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
          <Text className="text-white text-2xl font-bold">Event Entry</Text>
        </View>

        <TouchableOpacity
          onPress={() => setSelectedEventToUpdateEntry(true)}
          className={`px-4 py-2 rounded-md self-start mt-4 ${
            entryStatus ? "bg-red-500" : "bg-green-500"
          }`}
        >
          <Text className="text-[#000] font-medium text-sm capitalize">
            {entryStatus ? "Close Entry" : "Open Entry"}
          </Text>
        </TouchableOpacity>

          <Text className="text-PrimaryTextColor font-medium text-lg mt-2">
            Entry Fee:{" "}
            <Text
              className={`${
                eventPrice ? "text-PrimaryTextColor" : "text-green-500"
              } font-medium text-lg`}
            >
              {eventPrice ? eventPrice : "Free"}
            </Text>
          </Text>

        <View className="mt-2">
          <TouchableOpacity
            onPress={() => setPriceSetAlert(true)}
            className="px-4 py-2 rounded-md self-start mt-2 bg-white"
          >
            <Text className="text-blue-500 font-medium">Set Price</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => setPriceSetFree(true)}
            disabled={isPending}
            className="px-4 py-2 rounded-md self-start mt-2 bg-white"
          >
            <Text className="text-green-500 font-medium">Make Free</Text>
          </TouchableOpacity>
        </View>

        {selectedEventToUpdateEntry && (
          <EntryStatusUpdateAlert
            selectedEventId={eventId}
            setSelectedEventToUpdateEntry={setSelectedEventToUpdateEntry}
            entryStatus={entryStatus}
          />
        )}

        {priceSetAlert && (
          <PriceSetForm setModalVisible={setPriceSetAlert} eventId={eventId} />
        )}

        {priceSetFree && (
          <UpdateAlert
            setSelectedToUpdate={setPriceSetFree}
            onPress={handlePressOnFreeBtn}
            isPending={isPending}
            btnName="Free"
          />
        )}
      </View>
    </Modal>
  );
};

export default EntryModal;
