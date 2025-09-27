"use client";

import { useQuery } from "@tanstack/react-query";
import { fetchNoteById, Note } from "@/lib/api";

type Props = {
  noteId: string;
};

const NoteDetailsClient = ({ noteId }: Props) => {
  const { data: note, isLoading, isError } = useQuery<Note>({
    queryKey: ["note", noteId],
    queryFn: () => fetchNoteById(noteId),
  });

  if (isLoading) return <p>Loading...</p>;
  if (isError || !note) return <p>Error loading note.</p>;

  return (
    <div>
      <h1>{note.title}</h1>
      <p>{note.content}</p>
    </div>
  );
};

export default NoteDetailsClient;
