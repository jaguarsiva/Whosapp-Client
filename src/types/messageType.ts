
export interface dbMessageType {
    sender: string;
    receiver: string
    text: string;
    time: string;
};

export interface uiMessageType {
    isSender: boolean;
    text: string;
    time: string;
};