import axios from "axios";
import type {
  Note,
  NoteFormValues,
  UpdateNoteParams,
  NotesHTTPResponse,
} from "@/types/note";

// База API
axios.defaults.baseURL =
  process.env.NEXT_PUBLIC_API_URL ||
  "https://next-docs-9f0504b0a741.herokuapp.com";

// Авторизація
axios.interceptors.request.use((config) => {
  const token = process.env.NEXT_PUBLIC_API_TOKEN;
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

// Отримати всі нотатки (окремі tag і search, валідна пагінація)
export const fetchNotes = async (
  tag = "All",
  search = "",
  page = 1
): Promise<NotesHTTPResponse> => {
  const safeTag = tag && tag.trim() ? tag.trim() : "All";

  const params: Record<string, string | number> = {
    tag: safeTag,         
    page,
    perPage: 12,
  };

  if (search.trim()) params.search = search.trim();

  const resp = await axios.get<NotesHTTPResponse>("/notes", { params });
  const data = resp.data;

  return {
    notes: data.notes || [],
    totalPages: data.totalPages || 1,
    totalNotes: data.totalNotes ?? (data.notes ? data.notes.length : 0),
  };
};


export const fetchNote = async (id: string): Promise<Note> => {
  const resp = await axios.get<Note>(`/notes/${id}`);
  return resp.data;
};

export const createNote = async (payload: NoteFormValues): Promise<Note> => {
  const resp = await axios.post<Note>("/notes", payload);
  return resp.data;
};

export const updateNote = async (
  id: string,
  payload: UpdateNoteParams
): Promise<Note> => {
  const resp = await axios.patch<Note>(`/notes/${id}`, payload);
  return resp.data;
};

export const deleteNote = async (id: string): Promise<Note> => {
  const resp = await axios.delete<Note>(`/notes/${id}`);
  return resp.data;
};

export const getTags = async (): Promise<string[]> => {
  const resp = await fetchNotes("", "", 1);
  const tagsSet = new Set(resp.notes.map((n) => n.tag).filter(Boolean));
  return Array.from(tagsSet);
};
