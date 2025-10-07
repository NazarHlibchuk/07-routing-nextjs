"use client";

import { useQuery } from "@tanstack/react-query";
import { useState, useEffect } from "react";
import { fetchNotes } from "@/lib/api";
import NoteList from "@/components/NoteList/NoteList";
import ErrorMessage from "@/components/Error/ErrorMessage";
import Pagination from "@/components/Pagination/Pagination";
import Modal from "@/components/Modal/Modal";
import NoteForm from "@/components/NoteForm/NoteForm";
import SearchBox from "@/components/SearchBox/SearchBox";
import { Toaster } from "react-hot-toast";
import type { NotesHTTPResponse } from "@/types/note";
import css from "./NotesPage.module.css";

interface Props {
  tag?: string;
}

export default function NotesClient({ tag = "All" }: Props) {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTag, setActiveTag] = useState(tag);
  const [page, setPage] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false); // ✅ додано стан

  useEffect(() => {
    setActiveTag(tag);
    setPage(1);
  }, [tag]);

  const { data, isError, isSuccess } = useQuery<NotesHTTPResponse, Error>({
    queryKey: ["notes", activeTag, searchQuery, page],
    queryFn: () => fetchNotes(activeTag, searchQuery, page),
    refetchOnMount: false,
    staleTime: 60_000,
    enabled: !!activeTag, // ✅ безпечна перевірка
  });

  const notes = data?.notes || [];
  const totalPages = data?.totalPages || 1;

  return (
    <div className={css.app}>
      <header className={css.toolbar}>
        <SearchBox value={searchQuery} onChange={setSearchQuery} />

        {isSuccess && totalPages > 1 && (
          <Pagination
            totalPages={totalPages}
            page={page}
            onPageChange={setPage}
          />
        )}

        <button className={css.button} onClick={() => setIsModalOpen(true)}>
          Create note +
        </button>
      </header>

      {isError && <ErrorMessage text="Error loading notes" />}
      {!isError && notes.length === 0 && <ErrorMessage text="No notes found" />}
      {notes.length > 0 && <NoteList notes={notes} />}

      {isModalOpen && (
        <Modal onClose={() => setIsModalOpen(false)}>
          <NoteForm onClose={() => setIsModalOpen(false)} />
        </Modal>
      )}

      <Toaster />
    </div>
  );
}
