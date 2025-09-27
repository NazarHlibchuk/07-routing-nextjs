// components/NoteList/NoteList.tsx
import type { Note } from "../types/note";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteNote } from "../NotesPage";

interface NoteListProps {
  notes: Note[];
}

const NoteList = ({ notes }: NoteListProps) => {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: deleteNote,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["notes"] });
    },
  });

  return (
    <ul>
      {notes.map((note) => (
        <li key={note.id}>
          {note.title}
          <button onClick={() => mutation.mutate(note.id)}>Delete</button>
        </li>
      ))}
    </ul>
  );
};

export default NoteList;
