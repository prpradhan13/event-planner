import { useQuery } from "@tanstack/react-query"
import { supabase } from "../supabase";
import { GuestDetailsType, GuestsType } from "@/src/types/eventType";


export const guestQuery = (eventId?: number) => {
    return useQuery<GuestsType[]>({
        queryKey: ['guests'],
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
        enabled: !!eventId
    })
}

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
        enabled: !!guestId
    })
}