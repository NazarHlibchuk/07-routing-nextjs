'use client';

import Link from 'next/link';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deleteNote } from '@/lib/api';
import type { Note } from '@/types/note';
import { usePathname, useRouter } from 'next/navigation';
import css from './NoteList.module.css';

interface NoteListProps {
  notes: Note[];
}

const NoteList = ({ notes }: NoteListProps) => {
  const queryClient = useQueryClient();
  const router = useRouter();
  const pathname = usePathname();

  const deleteNoteMutation = useMutation<Note, Error, string>({
    mutationFn: deleteNote,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['notes'] });
    },
  });

  const handleDelete = (noteId: string) => {
    deleteNoteMutation.mutate(noteId);
  };

  const openNoteModal = (noteId: string) => {
    router.push(`${pathname.replace(/\/$/, '')}/${noteId}`);
  };

  if (notes.length === 0) {
    return (
      <div className={css.emptyState}>
        <h3>No notes found</h3>
        <p>Create your first note to get started!</p>
      </div>
    );
  }

  return (
    <ul className={css.list}>
      {notes.map((note) => {
        const isDeleting =
          deleteNoteMutation.isPending &&
          deleteNoteMutation.variables === note.id;

        return (
          <li key={note.id} className={css.listItem}>
            <h2 className={css.title}>{note.title}</h2>
            <p className={css.content}>{note.content}</p>
            <div className={css.footer}>
              <span className={css.tag}>{note.tag}</span>

              <button
                className={css.link}
                onClick={() => openNoteModal(note.id)}
              >
                View details
              </button>

              <button
                className={css.button}
                onClick={() => handleDelete(note.id)}
                disabled={isDeleting}
                aria-label={`Delete note titled ${note.title}`}
              >
                {isDeleting ? 'Deleting...' : 'Delete'}
              </button>
            </div>
          </li>
        );
      })}
    </ul>
  );
};

export default NoteList;
