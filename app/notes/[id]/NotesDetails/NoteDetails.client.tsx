"use client";

import { useQuery } from "@tanstack/react-query";
import { fetchNoteById } from "@/lib/api";
import type { Note } from "@/types/note";
import css from "./NoteDetails.module.css";

type Props = {
  noteId: string;
};

const NoteDetailsClient = ({ noteId }: Props) => {
  const { data: note, isLoading, isError } = useQuery<Note>({
    queryKey: ["note", noteId],
    queryFn: () => fetchNoteById(noteId),
    refetchOnMount: false, 
  });

  if (isLoading) return <p className={css.loading}>Loading note...</p>;
  if (isError || !note) return <p className={css.error}>Error loading note.</p>;

  return (
    <div className={css.note}>
      <h1 className={css.title}>{note.title}</h1>
      <p className={css.content}>{note.content}</p>
      <p className={css.tag}><strong>Tag:</strong> {note.tag}</p>
      <p className={css.date}>
        <strong>Created at:</strong> {new Date(note.createdAt).toLocaleString()}
      </p>
    </div>
  );
};

export default NoteDetailsClient;
