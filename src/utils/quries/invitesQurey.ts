import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { supabase } from "../supabase";
import { GuestsType } from "@/src/types/eventType";
import { useAuth } from "@/src/context/AuthProvider";
import { sendRequestForEntryNotification } from "../notification";
import { v4 as uuidv4 } from "uuid";

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
      if (newStatus === "accepted") {
        const uniqueId = uuidv4();

        const { data, error } = await supabase
          .from("event_guests")
          .update({
            status: "accepted",
            entry_pass_code: uniqueId,
          })
          .eq("id", inviteId)
          .select();

        if (error) {
          alert("Error: " + error.message);
        }

        return data;
      } else if (newStatus === "declined") {
        const { data, error } = await supabase
          .from("event_guests")
          .update({
            status: "declined",
            entry_pass_code: null,
          })
          .eq("id", inviteId)
          .select();

        if (error) {
          alert("Error: " + error.message);
        }

        return data;
      } else {
        const { data, error } = await supabase
          .from("event_guests")
          .update({ status: newStatus })
          .eq("id", inviteId)
          .select();

        if (error) {
          alert("Error: " + error.message);
        }

        return data;
      }
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: [`invites_${userId}`],
      });
      queryClient.invalidateQueries({
        queryKey: ["guests"],
      });
      alert("Success");
    },
    onError: (error) => {
      alert(`Error: ${error.message}`);
    },
  });
};
