import {
  Modal,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { Dispatch, SetStateAction, useState } from "react";
import Ionicons from "@expo/vector-icons/Ionicons";
import { guestQuery } from "@/src/utils/quries/guestQuery";
import Entypo from "@expo/vector-icons/Entypo";
import AllUserList from "./AllUserList";
import { useAuth } from "@/src/context/AuthProvider";
import InvitedGuests from "../flatLists/InvitedGuests";

interface GuestListProps {
  modalVisible: boolean;
  setModalVisible: Dispatch<SetStateAction<boolean>>;
  eventId?: number;
  eventCreaterId?: string;
}

const GuestList = ({
  modalVisible,
  setModalVisible,
  eventId,
  eventCreaterId,
}: GuestListProps) => {
  const [allUserListOpen, setAllUserListOpen] = useState(false);
  const [showUserListOpen, setShowUserListOpen] = useState("accepted");
  const { user } = useAuth();
  const { data, isLoading } = guestQuery(eventId);

  const inviteAcceptMembers = data?.filter(
    (guest) => guest.status === "accepted"
  );

  const requestsMembers = data?.filter((guest) => guest.status === "request");

  const renderSelectedSection = () => {
    if (showUserListOpen === "invited")
      return (
        <InvitedGuests
          data={data}
          eventCreaterId={eventCreaterId!}
          nameOfListIfEmpty="No Guets Invited yet!"
        />
      );

    if (showUserListOpen === "accepted")
      return (
        <InvitedGuests
          data={inviteAcceptMembers}
          eventCreaterId={eventCreaterId!}
          isLoading={isLoading}
          nameOfListIfEmpty="Nobody Accepts yet!"
        />
      );

    if (showUserListOpen === "request")
      return (
        <InvitedGuests
          data={requestsMembers}
          eventCreaterId={eventCreaterId!}
          nameOfListIfEmpty="No Requests comes yet!"
        />
      );
  };

  return (
    <Modal visible={modalVisible} animationType="slide">
      <View className="flex-1 bg-MainBackgroundColor p-4">
        <View className="flex-row items-center justify-between">
          <View className="flex-row gap-5 items-center">
            <Ionicons
              onPress={() => setModalVisible(false)}
              name="arrow-back-sharp"
              size={24}
              color="#fff"
            />
            <View className="flex-row items-end gap-3">
              <Text className="text-white text-3xl font-bold">Member</Text>
              <Text className="text-base text-white font-medium leading-7">
                {inviteAcceptMembers?.length}/{data?.length}
              </Text>
            </View>
          </View>

          {eventCreaterId === user?.id && (
            <TouchableOpacity
              onPress={() => setAllUserListOpen(true)}
              className="flex-row items-center"
            >
              <Entypo name="plus" size={20} color="#3b82f6" />
              <Text className="text-blue-500 text-sm font-medium">Guests</Text>
            </TouchableOpacity>
          )}
        </View>

        {eventCreaterId === user?.id && (
          <View className="flex-row gap-3 mt-4">
            <TouchableOpacity
              onPress={() => setShowUserListOpen("accepted")}
              className={`${
                showUserListOpen === "accepted" ? "bg-SecondaryTextColor" : ""
              } rounded-md p-1`}
            >
              <Text
                className={`${
                  showUserListOpen === "accepted"
                    ? "text-[#000]"
                    : "text-blue-500"
                }`}
              >
                Invite Accepte
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => setShowUserListOpen("invited")}
              className={`${
                showUserListOpen === "invited" ? "bg-SecondaryTextColor" : ""
              } rounded-md p-1`}
            >
              <Text
                className={`${
                  showUserListOpen === "invited"
                    ? "text-[#000]"
                    : "text-blue-500"
                }`}
              >
                Invited Guests
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => setShowUserListOpen("request")}
              className={`${
                showUserListOpen === "request" ? "bg-SecondaryTextColor" : ""
              } rounded-md p-1`}
            >
              <Text
                className={`${
                  showUserListOpen === "request"
                    ? "text-[#000]"
                    : "text-blue-500"
                }`}
              >
                Requests
              </Text>
            </TouchableOpacity>
          </View>
        )}

        {renderSelectedSection()}

        {allUserListOpen && (
          <AllUserList
            modalVisible={allUserListOpen}
            setModalVisible={setAllUserListOpen}
            eventId={eventId}
          />
        )}
      </View>
    </Modal>
  );
};

export default GuestList;
