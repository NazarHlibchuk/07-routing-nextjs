// types/note.ts
export interface Note {
  id: string;
  title: string;
  content: string;
  tag: string;        
  createdAt: string;  
  updatedAt: string; 
}

export interface NoteListResponse {
  notes: Note[];
  totalPages: number;
  totalItems?: number;
}
