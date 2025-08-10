export interface NoteDTO {
    title: string;
    content: string;
    completed?: boolean;
}

export interface NoteUpdateDTO {
    id: number;
    title?: string;
    content?: string;
}
