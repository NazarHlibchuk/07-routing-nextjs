'use client';

import Link from 'next/link';
import type { Note } from '@/types/note';
import css from './NotePreview.module.css';

interface NotePreviewProps {
  note: Note;
  onDelete: () => void;
  isDeleting?: boolean;
}

const NotePreview = ({ note, onDelete, isDeleting }: NotePreviewProps) => {
  return (
    <li className={css.item}>
      <div className={css.header}>
        <h2>{note.title}</h2>
        <span className={css.tag}>{note.tag}</span>
      </div>
      <p className={css.content}>{note.content}</p>
      <div className={css.footer}>
        <Link href={`/notes/${note.id}`} className={css.link}>
          View details
        </Link>
        <button
          className={css.button}
          onClick={onDelete}
          disabled={isDeleting}
          aria-label={`Delete note titled ${note.title}`}
        >
          {isDeleting ? 'Deleting...' : 'Delete'}
        </button>
      </div>
      <div className={css.date}>
        Created: {new Date(note.createdAt).toLocaleDateString()}
      </div>
    </li>
  );
};

export default NotePreview;
