import { CreateEventFormData, EventsType } from "@/src/types/eventType";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { supabase } from "../supabase";
import * as FileSystem from "expo-file-system";
import { decode } from "base64-arraybuffer";
import { Dispatch, SetStateAction } from "react";
import { useAuth } from "@/src/context/AuthProvider";

export const getUserEvents = (userId?: string) => {
  return useQuery<EventsType[]>({
    queryKey: userId ? [`events_${userId}`] : ["events"],
    queryFn: async () => {
      if (!userId) {
        throw new Error("User ID is required to fetch events.");
      }

      const { data, error } = await supabase
        .from("events")
        .select("*")
        .eq("user_id", userId);

      if (error) {
        throw new Error(error.message);
      }

      return data || [];
    },
    enabled: !!userId,
  });
};

export const allEvents = () => {
  return useQuery<EventsType[]>({
    queryKey: ["all_events"],
    queryFn: async () => {
      const { data, error } = await supabase.from("events").select("*");

      if (error) {
        throw new Error(error.message);
      }

      return data || [];
    },
  });
};

export const singleEventDetails = (eventId: string) => {
  return useQuery<EventsType>({
    queryKey: [`eventDetails_${eventId}`],
    queryFn: async () => {
      if (!eventId) {
        alert("Event ID is required to fetch events.");
      }

      const { data, error } = await supabase
        .from("events")
        .select("*")
        .eq("id", eventId)
        .single();

      if (error) {
        alert("Error" + error.message);
      }

      return data || {};
    },
    enabled: !!eventId,
  });
};

export const createEvent = ({
  formData,
  userId,
  setModalVisible,
  resetForm,
}: {
  formData: CreateEventFormData;
  userId?: string;
  setModalVisible: Dispatch<SetStateAction<boolean>>;
  resetForm: () => void;
}) => {
  const queryClient = useQueryClient();

  const { name, description, date, event_time, latitude, longitude, imageUri } =
    formData;

  return useMutation({
    mutationFn: async () => {
      // Upload Image
      const base64 = await FileSystem.readAsStringAsync(imageUri!, {
        encoding: "base64",
      });
      const fileName = `${userId}/${new Date().getTime()}.jpeg`;

      const { data: uploadData, error: uploadError } = await supabase.storage
        .from("event-images")
        .upload(fileName, decode(base64), {
          contentType: "image/jpeg",
        });

      if (uploadError) {
        alert("Error" + uploadError.message);
      }

      const imageUrl = supabase.storage
        .from("event-images")
        .getPublicUrl(fileName).data.publicUrl;

      // Insert Event Data
      const { data, error } = await supabase.from("events").insert([
        {
          name,
          description,
          date,
          event_time,
          image_url: imageUrl,
          user_id: userId,
          latitude: latitude || null,
          longitude: longitude || null,
        },
      ]);

      if (error) {
        alert("Error" + error.message);
      }
    },
    onSuccess: () => {
      // Invalidate multiple queries
      queryClient.invalidateQueries({ queryKey: [`events_${userId}`] });
      queryClient.invalidateQueries({ queryKey: ["all_events"] });

      alert("Success" + "Event created successfully!");
      setModalVisible(false);
      resetForm();
    },
    onError: (error: any) => {
      console.error("Error creating event:", error);
      alert(
        `Failed to create event: ${error.message || "Unknown error occurred"}`
      );
    },
  });
};

export const updateEventImage = ({
  eventId,
  userId,
  setSelectedEventImage,
}: {
  eventId: string;
  userId: string;
  setSelectedEventImage: Dispatch<SetStateAction<string | null>>;
}) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ imageUri }: { imageUri: string }) => {
      if (!imageUri) {
        alert("Please select a Image");
      }

      // Upload Image
      const base64 = await FileSystem.readAsStringAsync(imageUri, {
        encoding: "base64",
      });
      const fileName = `${userId}/${new Date().getTime()}.jpeg`;

      const { data: uploadData, error: uploadError } = await supabase.storage
        .from("event-images")
        .update(fileName, decode(base64), {
          contentType: "image/jpeg",
        });

      if (uploadError) {
        alert("Error: " + uploadError.message);
      }

      const imageUrl = supabase.storage
        .from("event-images")
        .getPublicUrl(fileName).data.publicUrl;

      const { data, error } = await supabase
        .from("events")
        .update({ image_url: imageUrl })
        .eq("id", eventId);

      if (error) {
        alert("Error" + error.message);
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [`eventDetails_${eventId}`] });
      queryClient.invalidateQueries({ queryKey: ["all_events"] });
      queryClient.invalidateQueries({ queryKey: [`events_${userId}`] });

      setSelectedEventImage(null);
      alert("Successfully updated event Image.");
    },
  });
};
