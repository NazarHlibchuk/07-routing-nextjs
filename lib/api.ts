import axios from "axios";
import type { Note, NoteFormValues, UpdateNoteParams, NotesHTTPResponse } from "../types/note";

// 🔧 нова база API
axios.defaults.baseURL =
  process.env.NEXT_PUBLIC_API_URL ||
  "https://next-docs-9f0504b0a741.herokuapp.com";

// ✅ отримати всі нотатки
export const fetchNotes = async (
  search = "",
  page = 1
): Promise<NotesHTTPResponse> => {
  const resp = await axios.get("/notes", {
    params: { search, page, perPage: 12 },
  });

  const data = resp.data;

  return {
    notes: data.notes || [],
    totalPages: data.totalPages || 1,
    totalNotes: data.totalNotes ?? (data.notes ? data.notes.length : 0),
  };
};

// ✅ отримати одну нотатку
export const fetchNote = async (id: string): Promise<Note> => {
  const resp = await axios.get<Note>(`/notes/${id}`);
  return resp.data;
};

// ✅ створити нотатку
export const createNote = async ({
  title,
  content,
  tag,
}: NoteFormValues): Promise<Note> => {
  const newNote = { title, content, tag };
  const resp = await axios.post<Note>("/notes", newNote);
  return resp.data;
};

// ✅ оновити нотатку
export const updateNote = async (
  id: string,
  payload: UpdateNoteParams
): Promise<Note> => {
  const resp = await axios.patch<Note>(`/notes/${id}`, payload);
  return resp.data;
};

// ✅ видалити нотатку
export const deleteNote = async (id: string): Promise<Note> => {
  const resp = await axios.delete<Note>(`/notes/${id}`);
  return resp.data;
};

// ✅ отримати унікальні теги
export const getTags = async (): Promise<string[]> => {
  try {
    const resp = await fetchNotes("", 1);
    const notes = resp.notes || [];
    const tagsSet = new Set(notes.map((note) => note.tag).filter(Boolean));
    return Array.from(tagsSet);
  } catch (error) {
    console.error("Failed to fetch tags:", error);
    return [];
  }
};
