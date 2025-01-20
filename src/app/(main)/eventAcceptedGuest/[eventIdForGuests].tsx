import {
  AppState,
  FlatList,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React, { useEffect, useRef, useState } from "react";
import { useLocalSearchParams, useNavigation } from "expo-router";
import { getOnlyPassCodes } from "@/src/utils/quries/guestQuery";
import LoadData from "@/src/components/smallHelping/LoadData";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { CameraView, useCameraPermissions } from "expo-camera";
import { Overlay } from "@/src/components/smallHelping/Overlay";
import { StatusBar } from "expo-status-bar";
import AntDesign from "@expo/vector-icons/AntDesign";

const eventAcceptedGuest = () => {
  const [permission, requestPermission] = useCameraPermissions();
  const [showCamera, setShowCamera] = useState(false);
  const [scanResult, setScanResult] = useState<string>("");

  const { eventIdForGuests } = useLocalSearchParams();
  const singleId = Array.isArray(eventIdForGuests)
    ? eventIdForGuests[0]
    : eventIdForGuests;

  const qrLock = useRef(false);
  const appState = useRef(AppState.currentState);

  useEffect(() => {
    const subscription = AppState.addEventListener("change", (nextAppState) => {
      if (
        appState.current.match(/inactive|background/) &&
        nextAppState === "active"
      ) {
        qrLock.current = false;
      }
      appState.current = nextAppState;
    });

    return () => {
      subscription.remove();
    };
  }, []);

  const navigation = useNavigation();

  useEffect(() => {
    navigation.setOptions({
      headerShown: !showCamera,
    });
  }, [showCamera, navigation]);

  const { data, isLoading } = getOnlyPassCodes(Number(singleId));

  if (isLoading) return <LoadData />;

  // Filter out items with a null entry_pass_code
  const filteredData = data?.filter((item) => item.entry_pass_code !== null);

  const codeAuthentication = filteredData?.find(
    (item) => item.entry_pass_code === scanResult
  );

  const isPermissionGranted = Boolean(permission?.granted);

  const handleScanButtonPress = async () => {
    if (!isPermissionGranted) {
      // Request permission if it's not granted
      const { granted } = await requestPermission();
      if (granted) {
        setShowCamera(true); // Show camera if permission is granted
      }
    } else {
      // If permission is already granted, show the camera
      setShowCamera(true);
    }
  };

  return (
    <View className="flex-1 bg-MainBackgroundColor px-4">
      {scanResult ? (
        codeAuthentication ? (
          <View className="absolute w-[100vw] h-[60%] items-center justify-center z-50">
            <View className="bg-[#dcdcdc] justify-center items-center rounded-lg w-[80%] p-7">
              <AntDesign name="checkcircle" size={50} color="#22c55e" />
              <Text className="mt-2 text-xl font-semibold">
                Guest Authentorized
              </Text>
              <Pressable
                onPress={() => setScanResult("")}
                className="bg-black py-2 px-5 mt-5 rounded-lg"
              >
                <Text className="text-white font-medium">Done</Text>
              </Pressable>
            </View>
          </View>
        ) : (
          <View className="absolute w-[100vw] h-[60%] items-center justify-center z-50">
            <View className="bg-[#dcdcdc] justify-center items-center rounded-lg w-[80%] p-7">
              <AntDesign name="closecircle" size={50} color="#ef4444" />
              <Text className="mt-2 text-xl font-semibold">
                Guest Unauthorized
              </Text>
              <Pressable
                onPress={() => setScanResult("")}
                className="bg-black py-2 px-5 mt-5 rounded-lg"
              >
                <Text className="text-white font-medium">Close</Text>
              </Pressable>
            </View>
          </View>
        )
      ) : (
        <Pressable
          onPress={handleScanButtonPress}
          className="bg-SecondaryTextColor p-2 rounded-md self-start my-2"
        >
          <MaterialCommunityIcons name="line-scan" size={24} color="black" />
        </Pressable>
      )}

      {/* Show Camera if permission is granted */}
      {showCamera && isPermissionGranted && (
        <View style={StyleSheet.absoluteFillObject}>
          {Platform.OS === "android" ? <StatusBar hidden /> : null}
          <CameraView
            style={StyleSheet.absoluteFillObject}
            facing="back"
            onBarcodeScanned={({ data }) => {
              if (data && !qrLock.current) {
                qrLock.current = true;
                setTimeout(async () => {
                  setScanResult(data.trim());
                  setShowCamera(false);
                }, 500);
              }
            }}
          />
          <Overlay />
        </View>
      )}

      {!showCamera && (
        <FlatList
          data={filteredData}
          keyExtractor={(item, index) => item.entry_pass_code || String(index)}
          renderItem={({ item, index }) => (
            <Text className="text-PrimaryTextColor font-medium ">
              {index + 1}. {item.entry_pass_code}
            </Text>
          )}
        />
      )}
    </View>
  );
};

export default eventAcceptedGuest;
