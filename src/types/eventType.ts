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