"use client";

import React, { useState } from "react";
import { useDebounce } from "use-debounce";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { fetchNotes, createNote } from "@/lib/api";
import type { NoteListResponse, CreateNotePayload } from "@/types/note";
import NoteList from "@/components/NoteList/NoteList";
import Pagination from "@/components/Pagination/Pagination";
import SearchBox from "@/components/SearchBox/SearchBox";
import Modal from "@/components/Modal/Modal";
import NoteForm from "@/components/NoteForm/NoteForm";

const PER_PAGE = 12;

export default function NotesClient() {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [debouncedSearch] = useDebounce(search, 500);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const queryClient = useQueryClient();

  const { data, isLoading, isError } = useQuery<NoteListResponse>({
    queryKey: ["notes", page, debouncedSearch],
    queryFn: () => fetchNotes({ page, perPage: PER_PAGE, search: debouncedSearch }),
    keepPreviousData: true,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    initialData: () => queryClient.getQueryData<NoteListResponse>(["notes", 1, ""]),
  });

  const totalPages = data?.totalPages ?? 0;
  const notes = data?.notes ?? [];

  // Після успішного створення нотатки
  const handleCreateSuccess = async () => {
    setIsModalOpen(false);
    await queryClient.invalidateQueries({ queryKey: ["notes"] });
  };

  return (
    <div>
      <SearchBox
        value={search}
        onChange={(v) => {
          setSearch(v);
          setPage(1);
        }}
      />

      <button onClick={() => setIsModalOpen(true)}>Create note +</button>

      {notes.length > 0 && <NoteList notes={notes} />}

      {totalPages > 1 && (
        <Pagination
          pageCount={totalPages}
          currentPage={page}
          onPageChange={(p) => setPage(p)}
        />
      )}

      {isLoading && <p>Loading...</p>}
      {isError && <p>Something went wrong</p>}
      {!isLoading && notes.length === 0 && <p>No notes found</p>}

      {isModalOpen && (
        <Modal onClose={() => setIsModalOpen(false)}>
          <NoteForm
            onSuccess={handleCreateSuccess}
            onCancel={() => setIsModalOpen(false)}
          />
        </Modal>
      )}
    </div>
  );
}
