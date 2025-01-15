import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { supabase } from "../supabase";
import { CreateEventTasksFormData, TaskTypes } from "@/src/types/eventType";
import { TaskStatusChangeProps } from "@/src/types/extraTypes";
import { Dispatch, SetStateAction } from "react";
import { useAuth } from "@/src/context/AuthProvider";

export const taskQuery = (userId?: string) => {
  return useQuery<TaskTypes[]>({
    queryKey: userId ? [`tasks_${userId}`] : ["tasks"],
    queryFn: async () => {
      if (!userId) {
        throw new Error("User ID is required to fetch.");
      }

      const { data, error } = await supabase
        .from("event_tasks")
        .select("*")
        .eq("assigned_to", userId);

      if (error) {
        throw new Error(error.message);
      }

      return data || [];
    },
    enabled: !!userId,
  });
};

export const singleTaskDetails = (taskId: number) => {
  return useQuery({
    queryKey: [`tasks_${taskId}`],
    queryFn: async () => {
      if (!taskId) {
        throw new Error("User ID is required to fetch.");
      }

      const { data, error } = await supabase
        .from("event_tasks")
        .select("*")
        .eq("id", taskId)
        .single();

      if (error) {
        throw new Error(error.message);
      }

      return data || [];
    },
    enabled: !!taskId,
  });
};

export const tasksForEvent = (eventId?: number) => {
  return useQuery<TaskTypes[]>({
    queryKey: [`tasks_${eventId}`],
    queryFn: async () => {
      if (!eventId) {
        throw new Error("Event ID is required to fetch.");
      }

      const { data, error } = await supabase
        .from("event_tasks")
        .select("*")
        .eq("event_id", eventId);

      if (error) {
        throw new Error(error.message);
      }

      return data || [];
    },
    enabled: !!eventId,
  });
};

export const taskStatusChange = ({
  taskId,
  newStatus,
  userId,
  setAlertOpen,
}: TaskStatusChangeProps) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async () => {
      const { error } = await supabase
        .from("event_tasks")
        .update({ status: newStatus })
        .eq("id", taskId);

      if (error) {
        alert("Error" + error.message);
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: userId ? [`tasks_${userId}`] : ["tasks"],
      });

      setAlertOpen(false);
    },
  });
};

export const addTask = (
  eventId: number,
  setModalVisible: Dispatch<SetStateAction<boolean>>
) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      formData,
    }: {
      formData: CreateEventTasksFormData;
    }) => {
      const { error } = await supabase.from("event_tasks").insert([formData]);

      if (error) {
        alert("Error" + error.message);
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [`tasks_${eventId}`] });
      setModalVisible(false);
      alert("Task Add successfully");
    },
  });
};

export const deleteTask = (taskId: number, eventId: number) => {
  const queryClient = useQueryClient();
  const { user } = useAuth();
  const userId = user?.id

  return useMutation({
    mutationFn: async () => {
      const { error } = await supabase
        .from("event_tasks")
        .delete()
        .eq("id", taskId);

      if (error) {
        alert("Error" + error.message);
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: userId ? [`tasks_${userId}`] : ["tasks"] })
      queryClient.invalidateQueries({ queryKey: [`tasks_${eventId}`] })
      alert("Task Delete successfully");
    },
  });
};
