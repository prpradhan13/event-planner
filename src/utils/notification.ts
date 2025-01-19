import { supabase } from "./supabase";
import { GuestsType } from "../types/eventType";
import { useAuth } from "../context/AuthProvider";

export async function sendRequestForEntryNotification(guestInfo: GuestsType) {
  const { data } = await supabase
    .from("event_guests")
    .select("*, events(id, name, user_id, profiles(push_token)), profiles(*)")
    .eq("id", guestInfo.id)
    .single();

//   console.log(JSON.stringify(data, null, 2));
  const pushToken = data?.events?.profiles?.push_token; // This token is event creator token
//   console.log(pushToken);
  if (!pushToken) {
    return;
  }

  const message = {
    to: pushToken,
    sound: "default",
    title: "Entry Request!",
    body: `${data?.profiles?.username} make a reequest you to join this event.`,
    data: { eventId: data?.events?.id },
  };
  sendPushNotification(message);
}

async function sendPushNotification(message: any) {
  await fetch("https://exp.host/--/api/v2/push/send", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Accept-encoding": "gzip, deflate",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(message),
  });
}
