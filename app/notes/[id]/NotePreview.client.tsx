"use client";

import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { fetchNote } from "@/lib/api";
import Modal from "@/components/Modal/Modal";
import type { Note } from "@/types/note";
import css from "./NotePreview.module.css";

interface NotePreviewProps {
  noteId: string;
}

export default function NotePreview({ noteId }: NotePreviewProps) {
  const router = useRouter();

  const { data: note, isLoading, isError } = useQuery<Note, Error>({
    queryKey: ["note", noteId],
    queryFn: () => fetchNote(noteId),
    refetchOnMount: false, // вимога ментора
    staleTime: 60_000,
  });

  const handleClose = () => router.back();

  if (isLoading) return <Modal onClose={handleClose}>Loading...</Modal>;
  if (isError || !note) return <Modal onClose={handleClose}>Error loading note</Modal>;

  return (
    <Modal onClose={handleClose}>
      <div className={css.preview}>
        <h2 className={css.title}>{note.title}</h2>
        <p className={css.content}>{note.content}</p>
        <span className={css.tag}>{note.tag}</span>
        <button className={css.closeButton} onClick={handleClose}>Close</button>
      </div>
    </Modal>
  );
}
