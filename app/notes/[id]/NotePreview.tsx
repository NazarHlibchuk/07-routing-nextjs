"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { fetchSingleNote } from "@/lib/api";
import Modal from "@/components/Modal/Modal";
import css from "./NotePreview.module.css";

interface Note {
  id: string;
  title: string;
  content: string;
  tag?: string;
  createdAt: string;
  updatedAt?: string;
}

interface NotePreviewProps {
  id: string;
}

export default function NotePreview({ id }: NotePreviewProps) {
  const router = useRouter();
  const [note, setNote] = useState<Note | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function getNote() {
      try {
        const data = await fetchSingleNote(id);
        setNote(data);
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    }
    getNote();
  }, [id]);

  const handleClose = () => {
    router.back(); // повертаємося на попередній маршрут
  };

  if (isLoading || !note) return null;

  return (
    <Modal onClose={handleClose}>
      <div className={css.preview}>
        <h2 className={css.title}>{note.title}</h2>
        <p className={css.content}>{note.content}</p>
        <p className={css.tag}>Tag: {note.tag || "None"}</p>
      </div>
    </Modal>
  );
}
