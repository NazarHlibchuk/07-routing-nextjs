// types/api.ts
import { Note } from "./note";

export interface FetchNotesResponse {
  notes: Note[];
  totalPages: number;
}
