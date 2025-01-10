import { useQuery } from "@tanstack/react-query"
import { supabase } from "../supabase"
import { TaskTypes } from "@/src/types/eventType"

export const taskQuery = (userId?: string) => {
    return useQuery<TaskTypes[]>({
        queryKey: userId ? [`tasks_${userId}`] : ['tasks'],
        queryFn: async () => {
            if (!userId) {
                throw new Error('User ID is required to fetch.')
            }

            const { data, error } = await supabase
                .from('event_tasks')
                .select('*')
                .eq('assigned_to', userId)

            if (error) {
                throw new Error(error.message)
            }

            return data || []
        },
        enabled: !!userId
    })
}

export const singleTaskDetails = (taskId: number) => {
    return useQuery({
        queryKey: [`tasks_${taskId}`],
        queryFn: async () => {
            if (!taskId) {
                throw new Error('User ID is required to fetch.')
            }

            const { data, error } = await supabase
                .from('event_tasks')
                .select('*')
                .eq('id', taskId)
                .single()

            if (error) {
                throw new Error(error.message)
            }

            return data || []
        },
        enabled: !!taskId
    })
}

export const tasksForEvent =  (eventId?: number) => {
    return useQuery<TaskTypes[]>({
        queryKey: [`tasks_${eventId}`],
        queryFn: async () => {
            if (!eventId) {
                throw new Error('Event ID is required to fetch.')
            }

            const { data, error } = await supabase
                .from('event_tasks')
                .select('*')
                .eq('event_id', eventId)

            if (error) {
                throw new Error(error.message)
            }

            return data || []
        },
        enabled: !!eventId
    })
}