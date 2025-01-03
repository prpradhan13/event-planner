import { Text, TextInput, TouchableOpacity, View } from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import Feather from '@expo/vector-icons/Feather';
import { router } from "expo-router";

const AuthHomeScreen = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  return (
    <SafeAreaView className="flex-1 bg-[#1e1e1e] justify-center items-center px-8">
      <Text className="text-2xl text-white font-semibold">
        Login to your Account
      </Text>
      <Text className="text-sm text-[#dadada] font-semibold text-center mt-6">
        Get started with our app, just create an account and enjoy the
        experience.
      </Text>

      <View className="w-full mt-10 p- rounded-lg">
        {/* Email Box */}
        <View>
          <Text className="text-[#dfdfdf] mb-2">Email</Text>
          <View className="flex-row items-center gap-2 border border-[#5e5e5e] rounded-lg py-2 px-3">
            <Feather name="mail" size={24} color="#dfdfdf" />
            <TextInput 
              placeholder="name@mail.com"
              placeholderTextColor="#dfdfdf"
            />
          </View>
        </View>

        {/* Password Box */}
        <View className="mt-3">
          <Text className="text-[#dfdfdf] mb-2">Password</Text>
          <View className="flex-row items-center gap-2 border border-[#5e5e5e] rounded-lg py-2 px-3">
            <Feather name="lock" size={24} color="#dfdfdf" />
            <TextInput 
              placeholder="Password"
              placeholderTextColor="#dfdfdf"
            />
          </View>
        </View>

        <TouchableOpacity className="bg-blue-500 p-3 rounded-lg mt-5">
          <Text className="text-center font-medium text-white text-lg"> Sign In </Text>
        </TouchableOpacity>

      </View>

      <View className="my-5 flex-row items-center">
        <View className="bg-[#5e5e5e] h-[2px] w-[46%]"></View>
        <Text className="text-[#dfdfdf] text-xl"> Or </Text>
        <View className="bg-[#5e5e5e] h-[2px] w-[46%]"></View>
      </View>

      <TouchableOpacity className="border border-[#e8e8e8] w-full p-3 rounded-lg">
        <Text className="text-[#e8e8e8] text-center font-medium">Sign In with Google</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default AuthHomeScreen;
