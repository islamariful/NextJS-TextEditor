export interface Document {
    id: string;
    title: string;
    content: string;
    history: { content: string; timestamp: Date }[];
}

export interface ReplayHistoryProps {
    document: Document;
    onDismiss: () => void;
}
