import { EventsType } from "@/src/types/eventType";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "../supabase";

export const getUserEvents = (userId?: string) => {
  return useQuery<EventsType>({
    queryKey: [`events_${userId}`],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("events")
        .select("*")
        .eq("user_id", userId)
        .single();
      return data;
    },
  });
};
