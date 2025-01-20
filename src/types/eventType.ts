export type EventsType = {
    id: number;
    name: string;
    description?: string;
    date: string;
    event_time?: string;
    image_url?: string;
    user_id: string;
    latitude?: string;
    longitude?: string;
    ispublic: boolean;
    entry_status: boolean;
    price: number;
    is_paid: boolean;
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

export type GuestsType = {
    id: number;
    event_id: number;
    guest_id: string;
    status: string;
    entry_pass_code: string | null;
}

export type GuestDetailsType = {
    id: string;
    email: string;
    full_name: string;
    username: string;
    avatar_url: string | null;
}

export type CreateEventFormData = {
    name: string;
    description: string;
    date: null;
    event_time: string | null;
    latitude: number | null;
    longitude: number | null;
    imageUri: string | null;
}

export type CreateEventTasksFormData = {
    task_name: string;
    description?: string;
    due_date: string | null;
    event_id: number;
    assigned_to: string | null;
}