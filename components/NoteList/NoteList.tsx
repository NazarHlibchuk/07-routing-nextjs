import type { Note } from "@/types/note";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteNote } from "@/lib/api";
import Link from "next/link";
import css from "./NoteList.module.css";

interface NoteListProps {
  notes: Note[];
  onDeleteSuccess?: () => void | Promise<void>;
}

const NoteList = ({ notes, onDeleteSuccess }: NoteListProps) => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: deleteNote,
    onSuccess: async () => {
      queryClient.invalidateQueries({ queryKey: ["notes"] });
      if (onDeleteSuccess) await onDeleteSuccess();
    },
  });

  return (
    <ul className={css.noteList}>
      {notes.map((note) => (
        <li key={note.id} className={css.noteItem}>
          <Link href={`/notes/${note.id}`} className={css.noteLink}>
            <h3 className={css.title}>{note.title}</h3>
            <p className={css.content}>{note.content}</p>
            <p className={css.tag}>Tag: {note.tag}</p>
          </Link>
          <button
            className={css.deleteButton}
            onClick={() => mutation.mutate(note.id)}
          >
            Delete
          </button>
        </li>
      ))}
    </ul>
  );
};

export default NoteList;
