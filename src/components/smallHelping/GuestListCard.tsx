import {
  ActivityIndicator,
  Image,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { memo, useState } from "react";
import getInitialLetter from "@/src/utils/initialLetter";
import { getUserDetatils } from "@/src/utils/quries/userQuery";
import { useAuth } from "@/src/context/AuthProvider";
import { inviteStatusChange } from "@/src/utils/quries/invitesQurey";
import RemoveGuest from "./RemoveGuest";
import { sendRequestForEntryNotification } from "@/src/utils/notification";

interface GuestListCardProps {
  guestId: string;
  eventCreaterId?: string;
  invitationStatus?: string;
  invitationId: number;
}

const GuestListCard = memo(
  ({
    guestId,
    eventCreaterId,
    invitationStatus,
    invitationId,
  }: GuestListCardProps) => {
    const [selectedInviteId, setSelectedInviteId] = useState<number | null>(
      null
    );
    const { user } = useAuth();

    const { data, isLoading } = getUserDetatils(guestId);

    const guestNameInitialLetter = getInitialLetter(data?.full_name);

    const { mutate, isPending } = inviteStatusChange();

    const handleDeclinedInvitationGuest = () => {
      setSelectedInviteId(invitationId);
    };

    const handleAcceptInvitationGuest = () => {
      mutate({ inviteId: invitationId, newStatus: "accepted" });
    };

    return (
        <View className="bg-SecondaryBackgroundColor px-3 h-32 overflow-hidden rounded-xl flex-row items-center justify-between">
          <View className="w-[70%]">
            <Text className="text-PrimaryTextColor text-lg font-medium">
              {data?.full_name}
            </Text>
            <Text className="text-PrimaryTextColor">{data?.username}</Text>

            {eventCreaterId === user?.id && (
              <View className="flex-row gap-3">
                <TouchableOpacity
                  onPress={handleDeclinedInvitationGuest}
                  className="bg-red-500 w-[60px] rounded-md mt-2"
                >
                  <Text className="text-sm text-center">Remove</Text>
                </TouchableOpacity>
                {invitationStatus === "request" && (
                  <TouchableOpacity
                    onPress={handleAcceptInvitationGuest}
                    className="bg-SecondaryTextColor w-[60px] rounded-md mt-2"
                  >
                    {isPending ? (
                      <ActivityIndicator />
                    ) : (
                      <Text className="text-sm text-center">Accept</Text>
                    )}
                  </TouchableOpacity>
                )}
              </View>
            )}
          </View>

          <View className="h-20 w-20 rounded-full bg-SecondaryTextColor items-center justify-center">
            {data?.avatar_url ? (
              <Image
                source={{ uri: data.avatar_url }}
                style={{
                  width: 80,
                  height: 80,
                  borderRadius: 100,
                }}
                resizeMode="cover"
              />
            ) : (
              <Text className="font-semibold text-lg">
                {guestNameInitialLetter}
              </Text>
            )}
          </View>

          {selectedInviteId && (
            <RemoveGuest
              inviteId={selectedInviteId}
              setSelectedGuestToRemove={setSelectedInviteId}
            />
          )}
        </View>
    );
  }
);

export default GuestListCard;
