import axios from 'axios';
import type { Note, NoteFormValues, UpdateNoteParams } from '../types/note';

interface NotesHTTPResponse {
  notes: Note[];
  totalPages: number;
}

const NOTEHUB_TOKEN = process.env.NEXT_PUBLIC_NOTEHUB_TOKEN;

axios.defaults.baseURL = 'https://notehub-public.goit.study/api';

const authHeader = {
  headers: {
    Authorization: `Bearer ${NOTEHUB_TOKEN}`,
  },
};

export const fetchNotes = async (
  search: string,
  page: number,
): Promise<NotesHTTPResponse> => {
  const resp = await axios.get<NotesHTTPResponse>('/notes', {
    params: { search, page, perPage: 12 },
    ...authHeader,
  });
  return resp.data;
};

export const fetchSingleNote = async (id: string): Promise<Note> => {
  const resp = await axios.get<Note>(`/notes/${id}`, authHeader);
  return resp.data;
};

export const createNote = async ({
  title,
  content,
  tag,
}: NoteFormValues): Promise<Note> => {
  const newNote = { title, content, tag };
  const resp = await axios.post<Note>('/notes', newNote, authHeader);
  return resp.data;
};

export const updateNote = async (
  id: string,
  payload: UpdateNoteParams,
): Promise<Note> => {
  const resp = await axios.patch<Note>(`/notes/${id}`, payload, authHeader);
  return resp.data;
};

export const deleteNote = async (id: string): Promise<Note> => {
  const resp = await axios.delete<Note>(`/notes/${id}`, authHeader);
  return resp.data;
};
