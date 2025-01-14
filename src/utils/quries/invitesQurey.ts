import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { supabase } from "../supabase";
import { GuestsType } from "@/src/types/eventType";
import { useAuth } from "@/src/context/AuthProvider";

export const inviteQuery = () => {
  const { user } = useAuth();
  const userId = user?.id;
  
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
    enabled: !!userId,
  });
};

export const inviteStatusChange = () => {
  const queryClient = useQueryClient();
  const { user } = useAuth();
  const userId = user?.id;

  return useMutation({
    mutationFn: async ({
      inviteId,
      newStatus,
    }: {
      inviteId: number;
      newStatus: string;
    }) => {
      const { error } = await supabase
        .from("event_guests")
        .update({ status: newStatus })
        .eq("id", inviteId);

      if (error) {
        alert("Error: " + error.message);
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [`invites_${userId}`],
      });
      alert("Invite Accepted");
    },
  });
};
