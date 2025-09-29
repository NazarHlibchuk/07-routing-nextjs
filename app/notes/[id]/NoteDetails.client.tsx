"use client";

import { useQuery } from "@tanstack/react-query";
import { fetchNoteById } from "@/lib/api";
import type { Note } from "@/types/note";
import css from "./NoteDetails.module.css";

type Props = {
  noteId: string;
};

const NoteDetailsClient = ({ noteId }: Props) => {
  const { data: note, isLoading, isError } = useQuery<Note>({
    queryKey: ["note", noteId],
    queryFn: () => fetchNoteById(noteId),
    refetchOnMount: false, 
  });

  if (isLoading) return <p className={css.loading}>Loading note...</p>;
  if (isError || !note) return <p className={css.error}>Error loading note.</p>;

  return (
 <div className={css.container}>
	<div className={css.item}>
	  <div className={css.header}>
	    <h2>Note title</h2>
	  </div>
	  <p className={css.content}>Note content</p>
	  <p className={css.date}>Created date</p>
	</div>
</div>

  );
};

export default NoteDetailsClient;
