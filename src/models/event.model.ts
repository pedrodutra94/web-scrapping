export type EventGame = {
    home?: string;
    away?: string;
    eventName: string;
    selectionLabels?: string[];
}

export type Ticket = {
    games?: Array<EventGame>;
    amount: number;
}