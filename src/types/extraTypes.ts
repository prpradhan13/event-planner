import { Dispatch, SetStateAction } from "react";

export type TaskStatusChangeProps = {
    taskId: number; 
    newStatus: string;
    userId?: string,
    eventId?: number;
    setAlertOpen: Dispatch<SetStateAction<any>>;
}