import { Text, View, StyleSheet } from "react-native";
import React, { useMemo } from "react";
import { useLocalSearchParams } from "expo-router";
import getInitialLetter from "@/src/utils/initialLetter";
import { useQuery } from "@tanstack/react-query";
import { useAuth } from "@/src/context/AuthProvider";
import LoadData from "@/src/components/smallHelping/LoadData";
import { EventsType } from "@/src/types/eventType";
import { LinearGradient } from "expo-linear-gradient";
import dayjs from "dayjs";
import Entypo from "@expo/vector-icons/Entypo";
import Mapview, { Marker } from "react-native-maps";
import TotalGuests from "@/src/components/smallHelping/TotalGuests";
import { singleEventDetails } from "@/src/utils/quries/eventQurery";

const SingleEvent = () => {
  const { id } = useLocalSearchParams();
  const singleId = Array.isArray(id) ? id[0] : id;

  const { data, isLoading } = singleEventDetails(singleId)

  const eventInitialLetter = useMemo(
    () => getInitialLetter(data?.name),
    [data?.name]
  );

  if (isLoading) return <LoadData />;

  return (
    <View className="flex-1 bg-MainBackgroundColor px-4">
      <LinearGradient
        colors={["#333333", "#000000"]}
        style={{
          borderRadius: 10,
          height: 200,
          justifyContent: "center",
          alignItems: "center",
          overflow: "hidden",
        }}
      >
        <Text className="text-PrimaryTextColor text-2xl font-semibold tracking-widest">
          {eventInitialLetter}
        </Text>
      </LinearGradient>

      <View className="mt-5">
        <Text className="text-SecondaryTextColor">
          {dayjs(data?.date).format("DD MMM YYYY")}
        </Text>
        <Text className="text-PrimaryTextColor text-3xl font-semibold">
          {data?.name}
        </Text>
        <Text className="text-SecondaryTextColor text-lg">
          {data?.description}
        </Text>

        <TotalGuests eventId={data?.id} />
      </View>

      <View className="rounded-xl mt-5">
        <Mapview
          style={{
            height: 200,
          }}
          initialRegion={{
            latitude: Number(data?.latitude),
            longitude: Number(data?.longitude),
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}
        >
          <Marker
            coordinate={{
              latitude: Number(data?.latitude),
              longitude: Number(data?.longitude),
            }}
            pinColor="red"
          />
        </Mapview>
      </View>
    </View>
  );
};

export default SingleEvent;
