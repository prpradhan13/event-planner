import { Text, View } from "react-native";
import React, { useMemo } from "react";
import { useLocalSearchParams } from "expo-router";
import getInitialLetter from "@/src/utils/initialLetter";
import LoadData from "@/src/components/smallHelping/LoadData";
import { LinearGradient } from "expo-linear-gradient";
import dayjs from "dayjs";
import Mapview, { Marker } from "react-native-maps";
import TotalGuests from "@/src/components/smallHelping/TotalGuests";
import { singleEventDetails } from "@/src/utils/quries/eventQurery";
import Entypo from "@expo/vector-icons/Entypo";

const SingleEvent = () => {
  const { id } = useLocalSearchParams();
  const singleId = Array.isArray(id) ? id[0] : id;

  const { data, isLoading } = singleEventDetails(singleId);

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
        <View className="flex-row items-start gap-3">
          <Entypo name="calendar" size={18} color="#c8c8c8" />
          <View>
            <Text className="text-SecondaryTextColor font-medium text-base leading-5">
              {dayjs(data?.date).format("dddd, D MMM YYYY")}
            </Text>
            <Text className="text-SecondaryTextColor font-medium text-base">
              {dayjs(`1970-01-01T${data?.event_time}`).format("hh:mm A")}
            </Text>
          </View>
        </View>
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
