import { Note } from "./note"

export interface Permission {
    noteId: number
    userId: number
    accessPermission: string
    note: Note
}
