import { ActivityIndicator, Pressable, Text, View } from "react-native";
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

const profile = () => {
  const [selectedSection, setSelectedSection] = useState("event");
  const { user } = useAuth();

  const { data: userData, isLoading } = useQuery({
    queryKey: [`user_${user?.id}`],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("profiles")
        .select("full_name, username, email")
        .eq("id", user?.id)
        .single();
      return data;
    },
  });

  const userNameInitials = useMemo(
    () => getInitialLetter(userData?.full_name),
    [userData]
  );

  if (isLoading) {
    return (
      <View className="flex-1 justify-center items-center bg-MainBackgroundColor">
        <ActivityIndicator size="large" color="white" />
      </View>
    );
  }

  return (
    <SafeAreaView className="flex-1 bg-MainBackgroundColor justify-center items-center">
      <View className="justify-center items-center mt-5">
        {/* Rounded Box */}
        <View className="w-full justify-center items-center">
          <LinearGradient
            colors={["#333333", "#000000"]}
            className="h-28 w-28 rounded-full justify-center items-center overflow-hidden"
          >
            <Text className="font-semibold text-2xl tracking-widest text-white">
              {userNameInitials}
            </Text>
          </LinearGradient>
        </View>

        {/* User Detatils */}
        <View className="mt-3 items-center">
          <Text className="text-white font-medium text-xl">
            {userData?.full_name}
          </Text>
          <Text className="text-white font-medium text-xl">
            {userData?.username}
          </Text>
          <Text className="text-white font-medium text-xl">
            {userData?.email}
          </Text>
        </View>
      </View>

      <View className="flex-1 w-full mt-8 items-center">
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

        <View className="w-full">
          {selectedSection === "event" && <Event />}

          {selectedSection === "task" && <Task />}

          {selectedSection === "invite" && <Invites />}
        </View>
      </View>
    </SafeAreaView>
  );
};

export default profile;
