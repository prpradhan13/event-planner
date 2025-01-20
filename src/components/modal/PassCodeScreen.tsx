import { Modal, StyleSheet, Text, View } from "react-native";
import React, { Dispatch, SetStateAction } from "react";
import Ionicons from "@expo/vector-icons/Ionicons";
import QRCode from "react-native-qrcode-svg";

interface PassCodeScreenProps {
  passCode: string;
  modalVisibile: boolean;
  setModalVisibile: Dispatch<SetStateAction<boolean>>;
}

const PassCodeScreen = ({
  modalVisibile,
  setModalVisibile,
  passCode,
}: PassCodeScreenProps) => {
  return (
    <Modal visible={modalVisibile} animationType="slide">
      <View className="flex-1 bg-MainBackgroundColor p-4">
        <View className="flex-row gap-5 items-center">
          <Ionicons
            onPress={() => setModalVisibile(false)}
            name="arrow-back-sharp"
            size={24}
            color="#fff"
          />
          <Text className="text-white text-2xl font-bold">Code</Text>
        </View>

        <View className="flex-1 justify-center items-center">
          <View className="bg-[#898989] p-6 rounded-lg">
            <QRCode
              value={`${passCode}`}
              size={200}
              enableLinearGradient={true}
              linearGradient={["rgba(0,0,0,1)", "rgba(255,102,0,1)", "rgba(189,100,5,1)"]}
            />
          </View>

          <View className="my-5 flex-row items-center">
            <View className="bg-[#5e5e5e] h-[2px] w-[46%]"></View>
            <Text className="text-[#dfdfdf] text-xl"> Or </Text>
            <View className="bg-[#5e5e5e] h-[2px] w-[46%]"></View>
          </View>

          <Text className="text-white">Pass Code: {passCode}</Text>
        </View>
      </View>
    </Modal>
  );
};

export default PassCodeScreen;
