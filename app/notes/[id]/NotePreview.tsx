"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { fetchSingleNote } from "@/lib/api";
import Modal from "@/components/Modal/Modal";
import { Note } from "@/types/note"; // ✅ краще взяти з окремого типу
import css from "./NotePreview.module.css";

interface NotePreviewProps {
  id: string;
}

export default function NotePreview({ id }: NotePreviewProps) {
  const router = useRouter();
  const [note, setNote] = useState<Note | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function getNote() {
      try {
        const data = await fetchSingleNote(id);
        setNote(data);
      } catch (err) {
        console.error(err);
        setError("Failed to load note.");
      } finally {
        setIsLoading(false);
      }
    }
    getNote();
  }, [id]);

  const handleClose = () => router.back();

  if (isLoading) {
    return (
      <Modal onClose={handleClose}>
        <p>Loading note...</p>
      </Modal>
    );
  }

  if (error || !note) {
    return (
      <Modal onClose={handleClose}>
        <p>{error || "Note not found"}</p>
        <button className={css.backBtn} onClick={handleClose}>
          Close
        </button>
      </Modal>
    );
  }

  return (
    <Modal onClose={handleClose}>
      <div className={css.preview}>
        <h2 className={css.title}>{note.title}</h2>
        <p className={css.content}>{note.content}</p>
        <p className={css.tag}>Tag: {note.tag || "None"}</p>
        <p className={css.date}>
          {note.updatedAt
            ? `Updated at: ${note.updatedAt}`
            : `Created at: ${note.createdAt}`}
        </p>
        <button className={css.backBtn} onClick={handleClose}>
          Close
        </button>
      </div>
    </Modal>
  );
}
