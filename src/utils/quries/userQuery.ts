import { useQuery } from "@tanstack/react-query";
import { supabase } from "../supabase";

export const getUserDetatils = (userId: string) => {
  return useQuery({
    queryKey: [`user_detail_${userId}`],
    queryFn: async () => {
      if (!userId) {
        throw new Error("User ID is required to fetch.");
      }

      const { data, error } = await supabase
        .from("profiles")
        .select("id, username, full_name, avatar_url")
        .eq("id", userId)
        .single();

      if (error) {
        throw new Error(error.message);
      }

      return data || [];
    },
    enabled: !!userId
  });
};
