import {
  ActivityIndicator,
  Pressable,
  Text,
  TextInput,
  View,
} from "react-native";
import React, { Dispatch, SetStateAction, useState } from "react";
import { updateEventPrice } from "@/src/utils/quries/eventQurery";

const PriceSetForm = ({
  eventId,
  setModalVisible,
}: {
  eventId: number;
  setModalVisible: Dispatch<SetStateAction<boolean>>;
}) => {
  const [price, setPrice] = useState<number>(0);
  const { mutate, isPending } = updateEventPrice(eventId, setModalVisible);

  const handleSubmit = () => {
    if (price <= 0) {
        alert("Please enter a valid price")
        return;
    }
    mutate({ newPrice: price })
  }

  return (
    <View className="h-screen w-[100vw] bg-[#000000a3] justify-center items-center px-4 absolute top-0 right-0">
      <View className="bg-SecondaryBackgroundColor rounded-lg w-full p-5">
        <Text className="text-[#fff] font-medium text-lg">Set Entry Fee:</Text>
        <TextInput
          value={price.toString()}
          onChangeText={(value) => setPrice(Number(value) || 0)}
          className="border border-white text-white rounded-lg p-2 mt-1"
          keyboardType="numeric"
        />

        <View className="flex-row gap-5 mt-6 justify-center">
          <Pressable
            onPress={() => setModalVisible(false)}
            disabled={isPending}
            className="bg-red-500 rounded-lg py-2 w-24"
          >
            <Text className="font-medium text-lg text-center">Cancel</Text>
          </Pressable>

          <Pressable
            onPress={handleSubmit}
            disabled={isPending}
            className={`${
              isPending ? "bg-blue-400" : "bg-blue-500"
            } rounded-lg py-2 w-24`}
          >
            {isPending ? (
              <ActivityIndicator />
            ) : (
              <Text className="text-white font-medium text-lg text-center">
                Submit
              </Text>
            )}
          </Pressable>
        </View>
      </View>
    </View>
  );
};

export default PriceSetForm;
