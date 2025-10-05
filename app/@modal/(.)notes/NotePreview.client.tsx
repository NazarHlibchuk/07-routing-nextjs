'use client';

import { useQuery } from '@tanstack/react-query';
import { fetchNote } from '@/lib/api';
import Modal from '@/components/Modal/Modal';
import type { Note } from '@/types/note';
import css from './NotePreview.module.css';

interface NotePreviewClientProps {
  id: string;
  onClose?: () => void;
}

export default function NotePreviewClient({ id, onClose }: NotePreviewClientProps) {
  const { data: note, isLoading, isError } = useQuery<Note, Error>({
    queryKey: ['note', id],
    queryFn: () => fetchNote(id),
  });

  if (isLoading) return <Modal onClose={onClose}>Loading...</Modal>;
  if (isError) return <Modal onClose={onClose}>Error loading note</Modal>;

  return (
    <Modal onClose={onClose}>
      <div className={css.preview}>
        <h2 className={css.title}>{note.title}</h2>
        <p className={css.content}>{note.content}</p>
        <span className={css.tag}>{note.tag}</span>
        <button className={css.closeButton} onClick={onClose}>
          Close
        </button>
      </div>
    </Modal>
  );
}
