"use client";

import React, { useState } from "react";
import css from "./Notes.module.css";
import SearchBox from "@/components/SearchBox/SearchBox";
import Pagination from "@/components/Pagination/Pagination";
import NoteList from "@/components/NoteList/NoteList";
import Modal from "@/components/Modal/Modal";
import NoteForm from "@/components/NoteForm/NoteForm";
import { useDebounce } from "use-debounce";
import { useQuery } from "@tanstack/react-query";
import { fetchNotes } from "@/lib/api";
import type { NoteListResponse, Note } from "@/types/note";

const PER_PAGE = 12;

type FetchNotesParams = {
  page: number;
  perPage: number;
  search: string;
};

export default function NotesClient() {
  const [page, setPage] = useState<number>(1);
  const [search, setSearch] = useState<string>("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [debouncedSearch] = useDebounce(search, 500);

  const { data, isLoading, isError, refetch, isFetching } = useQuery<NoteListResponse>({
    queryKey: ["notes", page, debouncedSearch],
    queryFn: () =>
      fetchNotes({
        page,
        perPage: PER_PAGE,
        search: debouncedSearch,
      } as FetchNotesParams),
    keepPreviousData: true,
    placeholderData: () => data,
  });

  const totalPages = data?.totalPages ?? 0;
  const notes: Note[] = data?.notes ?? [];

  const handleDeleteSuccess = async (): Promise<void> => {
    await refetch();
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
            onPageChange={(p) => setPage(p)}
            isLoading={isFetching} // передаємо стан завантаження
          />
        )}
        <button className={css.button} onClick={() => setIsModalOpen(true)}>
          Create note +
        </button>
      </header>

      {/* Плавна анімація завантаження */}
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
            onSuccess={async () => {
              setIsModalOpen(false);
              await refetch();
            }}
            onCancel={() => setIsModalOpen(false)}
          />
        </Modal>
      )}
    </div>
  );
}
