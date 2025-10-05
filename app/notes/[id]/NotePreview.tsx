'use client';

import { useQuery } from '@tanstack/react-query';
import { fetchNote } from '@/lib/api';
import Modal from '@/components/Modal/Modal';
import type { Note } from '@/types/note';
import css from './NotePreview.module.css';

interface NotePreviewProps {
  noteId: string;
  onClose?: () => void; // функція для закриття модалки (необов’язкова)
}

const NotePreview = ({ noteId, onClose }: NotePreviewProps) => {
  const { data: note, isLoading, isError } = useQuery<Note, Error>({
    queryKey: ['note', noteId],
    queryFn: () => fetchNote(noteId),
  });

  // якщо onClose не переданий — використовуємо пусту функцію
  const handleClose = onClose ?? (() => {});

  if (isLoading) return <Modal onClose={handleClose}>Loading...</Modal>;
  if (isError) return <Modal onClose={handleClose}>Error loading note</Modal>;

  return (
    <Modal onClose={handleClose}>
      <div className={css.preview}>
        <h2 className={css.title}>{note?.title}</h2>
        <p className={css.content}>{note?.content}</p>
        <span className={css.tag}>{note?.tag}</span>
        <button className={css.closeButton} onClick={handleClose}>
          Close
        </button>
      </div>
    </Modal>
  );
};

export default NotePreview;
