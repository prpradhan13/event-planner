import {
  ActivityIndicator,
  FlatList,
  Image,
  Pressable,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useMemo, useState } from "react";
import { supabase } from "@/src/utils/supabase";
import { SafeAreaView } from "react-native-safe-area-context";
import { useAuth } from "@/src/context/AuthProvider";
import { useQuery } from "@tanstack/react-query";
import Event from "@/src/components/profileScreens/Event";
import Task from "@/src/components/profileScreens/Task";
import Invites from "@/src/components/profileScreens/Invites";
import getInitialLetter from "@/src/utils/initialLetter";
import { LinearGradient } from "expo-linear-gradient";
import Ionicons from "@expo/vector-icons/Ionicons";
import LoadData from "@/src/components/smallHelping/LoadData";
import CreateEvent from "@/src/components/modal/CreateEvent";
import { getUserDetatils } from "@/src/utils/quries/userQuery";

const profile = () => {
  const [selectedSection, setSelectedSection] = useState("event");
  const [modalVisible, setModalVisible] = useState(false);
  const { user } = useAuth();

  const { data: userData, isLoading } = getUserDetatils(user?.id!);

  const userNameInitials = useMemo(
    () => getInitialLetter(userData?.full_name),
    [userData]
  );

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
        <View>
          {userData?.avatar_url ? (
            <Image 
              source={{ uri: userData.avatar_url }}
              style={{
                height: 112,
                width: 112,
                borderRadius: 100
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
