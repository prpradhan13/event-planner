import { Dispatch, SetStateAction } from "react";

export type TaskStatusChangeProps = {
    taskId: number; 
    newStatus: string;
    userId?: string,
    setAlertOpen: Dispatch<SetStateAction<boolean>>;
}