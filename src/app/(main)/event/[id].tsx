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

const SingleEvent = () => {
  const { id } = useLocalSearchParams();

  const { user } = useAuth();

  const { data: eventData, isLoading } = useQuery<EventsType[]>({
    queryKey: user?.id ? [`events_${user.id}`] : ["events"],
  });

  const singleEventData = useMemo(() => {
    return eventData?.find((event) => event.id.toString() === id);
  }, [eventData, id]);

  const eventInitialLetter = useMemo(
    () => getInitialLetter(singleEventData?.name),
    [singleEventData?.name]
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
          {dayjs(singleEventData?.date).format("DD MMM YYYY")}
        </Text>
        <Text className="text-PrimaryTextColor text-3xl font-semibold">
          {singleEventData?.name}
        </Text>
        <Text className="text-SecondaryTextColor text-lg">
          {singleEventData?.description}
        </Text>

        <View className="rounded-xl">
          <Mapview
            style={{
              height: 200,
              marginTop: 20,
            }}
            initialRegion={{
              latitude: Number(singleEventData?.latitude),
              longitude: Number(singleEventData?.longitude),
              latitudeDelta: 0.0922,
              longitudeDelta: 0.0421,
            }}
          >
            <Marker
              coordinate={{
                latitude: Number(singleEventData?.latitude),
                longitude: Number(singleEventData?.longitude),
              }}
              pinColor="red"
            />
          </Mapview>
        </View>
      </View>
    </View>
  );
};

export default SingleEvent;
