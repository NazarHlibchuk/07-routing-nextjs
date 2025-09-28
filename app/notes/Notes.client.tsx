"use client";

import React, { useState } from "react";
import { useDebounce } from "use-debounce";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { fetchNotes } from "@/lib/api";
import SearchBox from "@/components/SearchBox/SearchBox";
import Pagination from "@/components/Pagination/Pagination";
import NoteList from "@/components/NoteList/NoteList";
import Modal from "@/components/Modal/Modal";
import NoteForm from "@/components/NoteForm/NoteForm";
import css from "./Notes.module.css";
import type { Note } from "@/types/note";
import type { NoteListResponse } from "@/types/note-response";

const PER_PAGE = 12;

type Props = {
  initialPage?: number;
  initialSearch?: string;
  perPage?: number;
};

  export default function NotesClient({ initialPage = 1, initialSearch = "", perPage = 12 }: Props) {
  const [page, setPage] = useState<number>(initialPage);
  const [search, setSearch] = useState<string>(initialSearch);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [debouncedSearch] = useDebounce(search, 500);
  const queryClient = useQueryClient();

  const notesKey = (p: number, s: string) => ["notes", p, s];

  const { data, isLoading, isError, isFetching } = useQuery<NoteListResponse, Error>({
    queryKey: notesKey(page, debouncedSearch),
    queryFn: () =>
      fetchNotes({ page, perPage: PER_PAGE, search: debouncedSearch }),
  });

  const notes: Note[] = data?.notes ?? [];
  const totalPages = data?.totalPages ?? 0;

  const handleDeleteSuccess = () => {
   queryClient.invalidateQueries({
  predicate: (query) => query.queryKey[0] === "notes",
});

  };

  return (
    <div className={css.app}>
      <header className={css.toolbar}>
        <SearchBox
          value={search}
          onChange={(v) => {
            setSearch(v);
            setPage(1);
          }}
        />
        {totalPages > 1 && (
          <Pagination
            pageCount={totalPages}
            currentPage={page}
            onPageChange={setPage}
            isLoading={isFetching}
          />
        )}
        <button className={css.button} onClick={() => setIsModalOpen(true)}>
          Create note +
        </button>
      </header>

      {isLoading || isFetching ? (
        <p className={css.loading}>Loading notes...</p>
      ) : isError ? (
        <p className={css.error}>Something went wrong</p>
      ) : notes.length > 0 ? (
        <NoteList notes={notes} onDeleteSuccess={handleDeleteSuccess} />
      ) : (
        <p>No notes found</p>
      )}

      {isModalOpen && (
        <Modal onClose={() => setIsModalOpen(false)}>
          <NoteForm
            onSuccess={() => {
              setIsModalOpen(false);
              queryClient.invalidateQueries({
  predicate: (query) => query.queryKey[0] === "notes",
});

            }}
            onCancel={() => setIsModalOpen(false)}
          />
        </Modal>
      )}
    </div>
  );
}
