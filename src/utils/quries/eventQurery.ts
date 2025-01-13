import { EventsType } from "@/src/types/eventType";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "../supabase";

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
        .eq("user_id", userId)

      if (error) {
        throw new Error(error.message);
      }

      return data || [];
    },
    enabled: !!userId
  });
};

export const allEvents = () => {
  return useQuery<EventsType[]>({
    queryKey: ["all_events"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("events")
        .select("*")

      if (error) {
        throw new Error(error.message);
      }

      return data || [];
    },
  })
}

export const singleEventDetails = (eventId?: string) => {
  return useQuery<EventsType>({
    queryKey: [`eventDetails_${eventId}`],
    queryFn: async () => {
      if (!eventId) {
        throw new Error("Event ID is required to fetch events.");
      }

      const { data, error } = await supabase
        .from("events")
        .select("*")
        .eq("id", eventId)
        .single();

      if (error) {
        throw new Error(error.message);
      }

      return data || {};
    },
    enabled: !!eventId
  })
}


