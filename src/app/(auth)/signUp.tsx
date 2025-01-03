import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useState } from "react";
import Feather from "@expo/vector-icons/Feather";
import { SafeAreaView } from "react-native-safe-area-context";
import { z } from "zod";
import { validateSignIn } from "@/src/validation/authValidation";
import { supabase } from "@/src/utils/supabase";

const signUp = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSignUp = async () => {
    setLoading(true);

    try {
      validateSignIn({ email, password });
      const {
        data: { session },
        error,
      } = await supabase.auth.signUp({
        email: email,
        password: password,
      });

      if (error) {
        console.log("Error during sign-up:", error.message);
        alert("Error" + error.message);
      } else if (!session) {
        alert("Please check your inbox for email verification!");
      } else {
        console.log("Sign-in successful");
      }
      
    } catch (error: any) {
      if (error instanceof z.ZodError) {
        alert("Validation Error: " + error.errors[0].message);
      } else {
        console.log("Unexpected error:", error.message);
        alert("An unexpected error occurred. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

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
              value={email}
              onChangeText={(value) => setEmail(value)}
              autoCapitalize="none"
              className="text-white"
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
              value={password}
              onChangeText={(value) => setPassword(value)}
              autoCapitalize="none"
              secureTextEntry={true}
              className="text-white"
            />
          </View>
        </View>

        <TouchableOpacity
          onPress={handleSignUp}
          className="bg-blue-500 p-3 rounded-lg mt-5"
        >
          <Text className="text-center font-medium text-white text-lg">
            Sign Up
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default signUp;
