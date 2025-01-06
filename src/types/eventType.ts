export type EventsType = {
    id: number;
    name: string;
    description?: string;
    date: string;
    location: string;
    image_url?: string;
    user_id: string;
}

export type EventCardProps = {
    dataList: EventsType;
}

export type TaskTypes = {
    id: number;
    task_name: string;
    description: string;
    due_date: string;
    status: string;
    event_id: string;
    assigned_to: string;
}

export type TaskCardProps = {
    taskList: TaskTypes;
}

export type InviteType = {
    id: number;
    event_id: number;
    guest_id: string;
    status: string;
    created_at: string;
}

export type InvitesListItemProps = {
    inviteList: InviteType;
}