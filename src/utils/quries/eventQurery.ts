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
