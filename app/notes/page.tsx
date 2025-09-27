"use client";

import { useQuery } from "@tanstack/react-query";
import { fetchNotes } from "@/lib/api";

export default function NotesList() {
  const { data, isLoading, error } = useQuery(["notes"], fetchNotes);

  if (isLoading) return <p>Loading notes...</p>;
  if (error) return <p>Error loading notes</p>;

  return (
    <ul>
      {data?.notes.map((note) => (
        <li key={note.id}>
          <strong>{note.title}</strong>: {note.content}
        </li>
      ))}
    </ul>
  );
}
