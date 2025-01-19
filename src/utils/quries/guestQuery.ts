import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { supabase } from "../supabase";
import { GuestDetailsType, GuestsType } from "@/src/types/eventType";
import { Dispatch, SetStateAction } from "react";
import { Alert } from "react-native";
import { sendRequestForEntryNotification } from "../notification";

export const guestQuery = (eventId?: number) => {
  return useQuery<GuestsType[]>({
    queryKey: ["guests"],
    queryFn: async () => {
      if (!eventId) {
        throw new Error("Event ID is required to fetch.");
      }

      const { data, error } = await supabase
        .from("event_guests")
        .select("*")
        .eq("event_id", eventId);

      if (error) throw new Error(error.message);

      return data || [];
    },
    enabled: !!eventId,
  });
};

export const guestDetails = (guestId: string) => {
  return useQuery<GuestDetailsType>({
    queryKey: ["guest_details", guestId],
    queryFn: async () => {
      if (!guestId) {
        throw new Error("Event ID is required to fetch.");
      }

      const { data, error } = await supabase
        .from("profiles")
        .select("id, username, full_name, email, avatar_url")
        .eq("id", guestId)
        .single();

      if (error) throw new Error(error.message);

      return data || {};
    },
    enabled: !!guestId,
  });
};

export const addGuest = (
  userId: string,
  eventId: number,
  setModalVisible: Dispatch<SetStateAction<boolean>>
) => {
  
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async ({ guestStatus }: {guestStatus?: string}) => {
      if (!userId) {
        throw new Error("User ID is required.");
      }
      if (!eventId) {
        throw new Error("Event ID is required.");
      }

      const { data, error } = await supabase
        .from("event_guests")
        .insert({ guest_id: userId, event_id: eventId, status: guestStatus })
        .select()

        if (error) {
          alert("Failed to add in guest list. Please try again.")
          throw error.message;
        }

      return data;
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: ["guests"],
      });

      setModalVisible(false);
      sendRequestForEntryNotification(data[0]);
    },
    onError: (error) => {
      console.error("Mutation error:", error);
      alert(`Error: ${error.message}`);
    },
  });
};

export const removeGuest = (setInvitationReject: Dispatch<SetStateAction<boolean>>) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ invitationId }: {invitationId: number}) => {
      const { error } = await supabase
        .from("event_guests")
        .delete()
        .eq("id", invitationId)

      if (error) {
        Alert.alert("Error", error.message)
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["guests"],
      });
      setInvitationReject(false);
      Alert.alert("Request Removed.")
    }
  })
}