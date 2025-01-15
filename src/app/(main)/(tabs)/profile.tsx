import {
  ActivityIndicator,
  Image,
  Pressable,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useMemo, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { useAuth } from "@/src/context/AuthProvider";
import Event from "@/src/components/profileScreens/Event";
import Task from "@/src/components/profileScreens/Task";
import Invites from "@/src/components/profileScreens/Invites";
import getInitialLetter from "@/src/utils/initialLetter";
import { LinearGradient } from "expo-linear-gradient";
import LoadData from "@/src/components/smallHelping/LoadData";
import CreateEvent from "@/src/components/modal/CreateEvent";
import { getUserDetatils, updateUserProfile } from "@/src/utils/quries/userQuery";
import Entypo from "@expo/vector-icons/Entypo";
import * as ImagePicker from "expo-image-picker";
import { MAX_IMAGE_FILE_SIZE } from "@/src/utils/constants/constants";

const profile = () => {
  const [selectedSection, setSelectedSection] = useState("event");
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedProfileImage, setSelectedProfileImage] = useState<
    string | null
  >(null);

  const { user } = useAuth();
  const { data: userData, isLoading } = getUserDetatils(user?.id!);
  const { mutate, isPending } = updateUserProfile({ userId: user?.id!, setSelectedProfileImage });

  const userNameInitials = useMemo(
    () => getInitialLetter(userData?.full_name),
    [userData]
  );

  const handleProfileImagePick = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images"],
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled) {
      const assets = result.assets[0];
      if (assets.fileSize && assets.fileSize > MAX_IMAGE_FILE_SIZE) {
        alert(
          "The selected image is too large. Please choose an image smaller than 5 MB."
        );
        return;
      }

      setSelectedProfileImage(result.assets[0].uri);
    }
  };

  const handleProileImageUpdate = () => {
    if (selectedProfileImage === null) {
      return;
    }
    mutate({ profileImage: selectedProfileImage });
  };

  const handleCancleUpdateImage = () => {
    setSelectedProfileImage(null);
  };

  if (isLoading) return <LoadData />;

  const renderSelectedSection = () => {
    if (selectedSection === "event") return <Event />;
    if (selectedSection === "task") return <Task />;
    if (selectedSection === "invite") return <Invites />;
  };

  return (
    <SafeAreaView className="flex-1 bg-MainBackgroundColor px-4 pt-5">
      <View className="flex-row justify-between ">
        {/* User Detatils */}
        <View className="w-[70%]">
          <Text className="text-white font-semibold text-2xl" numberOfLines={2}>
            Hii, {userData?.full_name}
          </Text>
          <Text className="text-white font-medium leading-5">
            {userData?.username}
          </Text>
          <Text className="text-white font-medium leading-5">
            {userData?.email}
          </Text>

          <TouchableOpacity
            onPress={() => setModalVisible(true)}
            className="bg-[#e6e6e6] self-start justify-center items-center rounded-md px-2 py-1 mt-2"
          >
            <Text>Create Event</Text>
          </TouchableOpacity>
        </View>

        {/* Profile Image */}
        <View className="relative">
          {userData?.avatar_url ? (
            <Image
              source={{ uri: userData.avatar_url }}
              style={{
                height: 112,
                width: 112,
                borderRadius: 100,
              }}
              resizeMode="cover"
            />
          ) : (
            <LinearGradient
              colors={["#333333", "#000000"]}
              className="h-28 w-28 rounded-full justify-center items-center overflow-hidden"
            >
              <Text className="font-semibold text-2xl tracking-widest text-white">
                {userNameInitials}
              </Text>
            </LinearGradient>
          )}

          <Pressable
            onPress={handleProfileImagePick}
            className="bg-[#f1f1f1] w-9 h-9 border-2 border-MainBackgroundColor justify-center items-center rounded-full absolute bottom-0 right-1"
          >
            <Entypo name="camera" size={20} color="black" />
          </Pressable>
        </View>
      </View>

      {/* Selected Section Button */}
      <View className="flex-1 w-full mt-4 items-center">
        <View className="p-2 rounded-xl space-x-2 flex-row bg-[#000]">
          <Pressable
            onPress={() => setSelectedSection("event")}
            className={`${
              selectedSection === "event" ? "bg-[#fff]" : ""
            } rounded-xl px-5 py-2`}
          >
            <Text
              className={`${
                selectedSection === "event" ? "text-black" : "text-white"
              } font-medium`}
            >
              Events
            </Text>
          </Pressable>

          <Pressable
            onPress={() => setSelectedSection("task")}
            className={`${
              selectedSection === "task" ? "bg-[#fff]" : ""
            } rounded-xl px-5 py-2`}
          >
            <Text
              className={`${
                selectedSection === "task" ? "text-black" : "text-white"
              } font-medium`}
            >
              Tasks
            </Text>
          </Pressable>

          <Pressable
            onPress={() => setSelectedSection("invite")}
            className={`${
              selectedSection === "invite" ? "bg-[#fff]" : ""
            } rounded-xl px-5 py-2`}
          >
            <Text
              className={`${
                selectedSection === "invite" ? "text-black" : "text-white"
              } font-medium`}
            >
              Invites
            </Text>
          </Pressable>
        </View>

        <View className="w-full">{renderSelectedSection()}</View>
      </View>

      {selectedProfileImage && (
        <View className="absolute h-screen w-[100vw] top-0 right-0 bg-[#000000a7] px-4 justify-center">
          <View className="bg-[#4a4a4a] p-5 rounded-md justify-center items-center">
            <Image
              source={{ uri: selectedProfileImage }}
              style={{
                height: 112,
                width: 112,
                borderRadius: 100,
              }}
              resizeMode="cover"
            />

            <Text className="text-[#fff] font-medium text-lg mt-5">
              Are you sure to update?
            </Text>
            <View className="flex-row gap-5">
              <Pressable
                onPress={handleCancleUpdateImage}
                className="bg-red-500 px-4 py-2 rounded-md"
              >
                <Text className="text-[#000] font-medium">Cancle</Text>
              </Pressable>
              <Pressable
                onPress={handleProileImageUpdate}
                className="bg-[#fff] px-4 py-2 rounded-md"
              >
                {isPending ? (
                  <ActivityIndicator />
                ) : (
                  <Text className="text-[#000] font-medium">Update</Text>
                )}
              </Pressable>
            </View>
          </View>
        </View>
      )}

      {modalVisible && (
        <CreateEvent
          modalVisible={modalVisible}
          setModalVisible={setModalVisible}
        />
      )}
    </SafeAreaView>
  );
};

export default profile;
