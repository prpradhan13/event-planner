import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { supabase } from "../supabase";
import { UserTypes } from "@/src/types/authType";
import * as FileSystem from "expo-file-system";
import { decode } from "base64-arraybuffer";
import { Dispatch, SetStateAction } from "react";

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
      const { data, error } = await supabase.from("profiles").select("*");

      if (error) {
        throw new Error(error.message);
      }

      return data || [];
    },
  });
};

export const updateUserProfile = ({
  userId,
  setSelectedProfileImage
}: {
  userId: string,
  setSelectedProfileImage: Dispatch<SetStateAction<string | null>>
}) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ profileImage }: { profileImage: string }) => {
      if (!profileImage) {
        alert("Please select a Image");
      }

      // Upload Image
      const base64 = await FileSystem.readAsStringAsync(profileImage, {
        encoding: "base64",
      });
      const fileName = `${userId}/${new Date().getTime()}.jpeg`;

      const { data: uploadData, error: uploadError } = await supabase.storage
        .from("avatars")
        .upload(fileName, decode(base64), {
          contentType: "image/jpeg",
        });

      if (uploadError) {
        alert("Error: " + uploadError.message);
      }

      const imageUrl = supabase.storage
        .from("avatars")
        .getPublicUrl(fileName).data.publicUrl;
      
      // Update Data
      const { data, error } = await supabase
        .from("profiles")
        .update({ avatar_url: imageUrl })
        .eq("id", userId);

      if (error) {
        alert("Error" + error.message);
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [`user_detail_${userId}`] });
      setSelectedProfileImage(null);
      alert("Profile Picture Update");
    },
  });
};
