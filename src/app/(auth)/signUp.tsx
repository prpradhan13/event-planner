import { Button, StyleSheet, Text, TextInput, View } from "react-native";
import React, { useState } from "react";
import { validateSignUp } from "@/src/validation/authValidation";
import { firebaseSignUp } from "@/src/utils/firebaseauth/auth";

const signUp = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSignUp = async () => {
    const validationErrors = validateSignUp({ email, password });

    if (Array.isArray(validationErrors) && validationErrors.length > 0) {
      // If validation errors exist, display the first error
      setError(validationErrors[0]?.message || "Unknown error");
      return;
    }

    try {
      const user = await firebaseSignUp({email, password})
      console.log("User signed up:", user);
    } catch (err: any) {
      setError(err.message);
    }
  };

  return (
    <View>
      <Text>Sign Up</Text>
      <TextInput
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        style={styles.input}
      />
      <TextInput
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        style={styles.input}
      />
      {error ? <Text style={styles.error}>{error}</Text> : null}
      <Button title="Sign Up" onPress={handleSignUp} />
    </View>
  );
};

export default signUp;

const styles = StyleSheet.create({
    input: { height: 40, borderColor: "gray", borderWidth: 1, marginBottom: 12, paddingHorizontal: 8 },
    error: { color: "red", marginBottom: 12 },
});