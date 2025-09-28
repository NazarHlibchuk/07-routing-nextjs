// types/note.ts
export interface Note {
  id: string;
  title: string;
  content: string;
  tag: string;        
  createdAt: string;  
  updatedAt: string; 
}

export interface CreateNoteDto {
  title: string;
  content: string;
  tag: string;
}

export interface UpdateNoteDto {
  title?: string;
  content?: string;
  tag?: string;
}