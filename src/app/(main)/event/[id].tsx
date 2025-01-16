import {
  ActivityIndicator,
  Image,
  Pressable,
  ScrollView,
  Text,
  View,
} from "react-native";
import React, { useEffect, useMemo, useState } from "react";
import { useLocalSearchParams } from "expo-router";
import getInitialLetter from "@/src/utils/initialLetter";
import LoadData from "@/src/components/smallHelping/LoadData";
import { LinearGradient } from "expo-linear-gradient";
import dayjs from "dayjs";
import Mapview, { Marker } from "react-native-maps";
import TotalGuests from "@/src/components/smallHelping/TotalGuests";
import {
  singleEventDetails,
  updateEventImage,
  updateEventPublicState,
} from "@/src/utils/quries/eventQurery";
import Entypo from "@expo/vector-icons/Entypo";
import { useAuth } from "@/src/context/AuthProvider";
import EventTaskBtn from "@/src/components/smallHelping/EventTaskBtn";
import { locationName } from "@/src/utils/services/locationName";
import * as ImagePicker from "expo-image-picker";
import { MAX_IMAGE_FILE_SIZE } from "@/src/utils/constants/constants";
import UpdateAlert from "@/src/components/smallHelping/UpdateAlert";
import RequestToEnterEvent from "@/src/components/smallHelping/RequestToEnterEvent";
import { guestQuery } from "@/src/utils/quries/guestQuery";
import EventPageBtn from "@/src/components/buttons/EventPageBtn";
import InvitationRejectAlert from "@/src/components/smallHelping/InvitationRejectAlert";

const SingleEvent = () => {
  const [selectedEventImage, setSelectedEventImage] = useState<string | null>(
    null
  );
  const [selectedEventToUpdatePublic, setSelectedEventToUpdatePublic] =
    useState<number | null>(null);

  const [requestToEnter, setRequestToEnter] = useState(false);
  const [requestReject, setrequestReject] = useState(false);

  const { user } = useAuth();
  const { id } = useLocalSearchParams();
  const singleId = Array.isArray(id) ? id[0] : id;

  if (!singleId) return null;
  const { data, isLoading } = singleEventDetails(singleId);
  const [placeName, setPlaceName] = useState<string | null>(null);

  const eventInitialLetter = useMemo(
    () => getInitialLetter(data?.name),
    [data?.name]
  );

  useEffect(() => {
    if (data?.latitude && data?.longitude) {
      const fetchLocationName = async () => {
        try {
          const name = await locationName({
            latitude: Number(data.latitude),
            longitude: Number(data.longitude),
          });
          setPlaceName(name || "Unknown Location");
        } catch (error) {
          console.error("Error fetching location name:", error);
          setPlaceName("Unknown Location");
        }
      };
      fetchLocationName();
    }
  }, [data?.latitude, data?.longitude]);

  const handleEventImagePick = async () => {
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

      setSelectedEventImage(result.assets[0].uri);
    }
  };

  const { mutate, isPending } = updateEventImage({
    eventId: singleId,
    userId: user?.id!,
    setSelectedEventImage,
  });

  const handleEventImageUpdate = () => {
    if (selectedEventImage === null) {
      return;
    }

    mutate({ imageUri: selectedEventImage });
  };

  const {
    mutate: updatePublicStateMutate,
    isPending: updatePublicStateIsPending,
  } = updateEventPublicState(
    selectedEventToUpdatePublic!,
    setSelectedEventToUpdatePublic
  );

  const handleEventPublicState = () => {
    const newPublicState = !data?.ispublic;
    updatePublicStateMutate({ publicState: newPublicState });
  };

  const { data: guestsList } = guestQuery(data?.id)
  const userInGuestList = guestsList?.find((guest) => guest.guest_id === user?.id)
  
  if (isLoading) return <LoadData />;

  const renderPublicBtn = () => {
    if (userInGuestList?.status === "invited") return <EventPageBtn onPress={handleRenderedBtnPress} btnName="invited"/>;
    if (userInGuestList?.status === "accepted") return <EventPageBtn onPress={handleRenderedBtnPress} btnName="request accepted"/>;
    if (userInGuestList?.status === "request") return <EventPageBtn onPress={handleRejectInvitation} btnName="request send"/>;
    if (!userInGuestList) return <EventPageBtn onPress={handleRenderedBtnPress} btnName="request"/>;
  }

  const handleRenderedBtnPress = () => {
    setRequestToEnter(true)
  }

  const handleRejectInvitation = () => {
    setrequestReject(true)
  };

  return (
    <View className="flex-1 bg-MainBackgroundColor px-4">
      <ScrollView showsVerticalScrollIndicator={false}>
        <View className="relative">
          {data?.image_url ? (
            <Image
              source={{ uri: data.image_url }}
              style={{
                width: "100%",
                height: 260,
                borderRadius: 10,
              }}
            />
          ) : (
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
          )}

          {data?.user_id === user?.id && (
            <Pressable
              onPress={handleEventImagePick}
              className="bg-[#f1f1f1] w-10 h-10 justify-center items-center rounded-full absolute top-1 right-1"
            >
              <Entypo name="camera" size={20} color="black" />
            </Pressable>
          )}
        </View>

        <View className="mt-5">
          {data?.user_id === user?.id && (
            <Pressable
              onPress={() => setSelectedEventToUpdatePublic(data?.id!)}
              className="border border-BorderColor rounded-md w-36 py-1"
            >
              <Text className="text-white text-center">
                {data?.ispublic ? "Public Event" : "Private Event"}
              </Text>
            </Pressable>
          )}

          <View className="flex-row items-start gap-3 mt-3">
            <Entypo name="calendar" size={18} color="#c8c8c8" />
            <View className="flex-row gap-2 items-center">
              {data?.event_time && (
                <Text className="text-SecondaryTextColor font-medium text-base leading-5">
                  {dayjs(`1970-01-01T${data?.event_time}`).format("hh:mm A")}
                </Text>
              )}
              <Text className="text-SecondaryTextColor font-medium text-base leading-5">
                {dayjs(data?.date).format("dddd, D MMM YYYY")}
              </Text>
            </View>
          </View>

          <View className="flex-row items-center gap-3 mt-2">
            <Entypo name="location-pin" size={18} color="#ef4444" />
            <Text className="text-SecondaryTextColor font-medium text-base leading-5">
              {placeName}
            </Text>
          </View>

          <Text className="text-PrimaryTextColor text-2xl font-semibold mt-3 capitalize">
            {data?.name}
          </Text>
          <Text className="text-SecondaryTextColor text-base leading-5">
            {data?.description}
          </Text>
        </View>

        <View className="flex-row gap-3 mt-4">
          <TotalGuests eventId={data?.id} eventCreaterId={data?.user_id} />

          {data?.user_id === user?.id && <EventTaskBtn eventId={data?.id} />}

          {data?.ispublic && renderPublicBtn()}
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
      </ScrollView>

      {selectedEventImage && (
        <View className="absolute h-screen w-[100vw] top-0 right-0 bg-[#000000a7] px-4 justify-center">
          <View className="bg-[#4a4a4a] p-5 rounded-md justify-center items-center">
            <Image
              source={{ uri: selectedEventImage }}
              style={{
                height: 260,
                width: "100%",
                borderRadius: 10,
              }}
              resizeMode="cover"
            />

            <Text className="text-[#fff] font-medium text-lg mt-5">
              Are you sure to update?
            </Text>
            <View className="flex-row gap-5">
              <Pressable
                onPress={() => setSelectedEventImage(null)}
                className="bg-red-500 w-24 py-2 rounded-md"
              >
                <Text className="text-[#000] font-medium text-center">
                  Cancle
                </Text>
              </Pressable>
              <Pressable
                onPress={handleEventImageUpdate}
                disabled={isPending}
                className="bg-[#fff] w-24 py-2 rounded-md"
              >
                {isPending ? (
                  <ActivityIndicator />
                ) : (
                  <Text className="text-[#000] font-medium text-center">
                    Update
                  </Text>
                )}
              </Pressable>
            </View>
          </View>
        </View>
      )}

      {selectedEventToUpdatePublic && (
        <UpdateAlert
          setSelectedToUpdate={setSelectedEventToUpdatePublic}
          isPending={updatePublicStateIsPending}
          onPress={handleEventPublicState}
        />
      )}

      {requestToEnter && (
        <RequestToEnterEvent
          setRequestToEnter={setRequestToEnter}
          eventCreaterId={data?.user_id!}
          eventId={data?.id!}
        />
      )}

      {userInGuestList?.guest_id === user?.id && (
        <>
          {requestReject && (
            <InvitationRejectAlert 
              setInvitationReject={setrequestReject}
              invitationId={userInGuestList?.id!}
            />
          )}
        </>
      )}
    </View>
  );
};

export default SingleEvent;
