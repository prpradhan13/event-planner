import { useQuery } from "@tanstack/react-query";
import { supabase } from "../supabase";
import { UserTypes } from "@/src/types/authType";

export const getUserDetatils = (userId: string) => {
  return useQuery<UserTypes>({
    queryKey: [`user_detail_${userId}`],
    queryFn: async () => {
      if (!userId) {
        throw new Error("User ID is required to fetch.");
      }

      const { data, error } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", userId)
        .single();

      if (error) {
        throw new Error(error.message);
      }

      return data || [];
    },
    enabled: !!userId,
  });
};

export const allUsers = () => {
  return useQuery<UserTypes[]>({
    queryKey: [`allUsers`],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("profiles")
        .select("*")

      if (error) {
        throw new Error(error.message);
      }

      return data || [];
    },
  });
};
