// components/NoteList/NoteList.tsx
import type { Note } from "../types/note";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteNote } from "@/lib/api"; // 

interface NoteListProps {
  notes: Note[];
  onDeleteSuccess?: () => void | Promise<void>; //  додаємо callback після видалення
}

const NoteList = ({ notes, onDeleteSuccess }: NoteListProps) => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: deleteNote,
    onSuccess: async () => {
      queryClient.invalidateQueries({ queryKey: ["notes"] });
      if (onDeleteSuccess) {
        await onDeleteSuccess(); // викликаємо callback після успішного видалення
      }
    },
  });

  return (
    <ul>
      {notes.map((note) => (
        <li key={note.id}>
          <strong>{note.title}</strong>
          <button onClick={() => mutation.mutate(note.id)}>Delete</button>
        </li>
      ))}
    </ul>
  );
};

export default NoteList;
