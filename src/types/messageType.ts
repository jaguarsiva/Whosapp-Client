
export interface dbMessageType {
    sender: string;
    receiver: string
    text: string;
    time: string;
    messageNumber: number;
    isRead: boolean;
};

export interface uiMessageType {
    isSender: boolean;
    text: string;
    time: string;
    isRead: boolean;
};