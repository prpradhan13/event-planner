import { useQuery } from "@tanstack/react-query";
import { supabase } from "../supabase";
import { GuestsType } from "@/src/types/eventType";

export const inviteQuery = (userId?: string) => {
  return useQuery<GuestsType[]>({
    queryKey: userId ? [`invites_${userId}`] : ["invites"],
    queryFn: async () => {
      if (!userId) {
        throw new Error("User ID is required to fetch.");
      }

      const { data, error } = await supabase
        .from("event_guests")
        .select("*")
        .eq("guest_id", userId);

      if (error) {
        throw new Error(error.message);
      }

      return data || [];
    },
    enabled: !!userId
  });
};
