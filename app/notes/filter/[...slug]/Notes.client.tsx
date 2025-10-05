'use client';

import { useQuery } from '@tanstack/react-query';
import { fetchNotes } from '@/lib/api';
import NoteList from '@/components/NoteList/NoteList';
import ErrorMessage from '@/components/Error/ErrorMessage';
import Pagination from '@/components/Pagination/Pagination';
import Modal from '@/components/Modal/Modal';
import NoteForm from '@/components/NoteForm/NoteForm';
import SearchBox from '@/components/SearchBox/SearchBox';
import { Toaster } from 'react-hot-toast';
import { useState, useEffect } from 'react';
import type { NotesHTTPResponse } from '@/types/note';
import css from './NotesPage.module.css';

interface NotesClientProps {
  tag?: string;
}

export default function NotesClient({ tag = '' }: NotesClientProps) {
  const [searchInput, setSearchInput] = useState('');
  const [topic, setTopic] = useState(tag === 'All' ? '' : tag);
  const [page, setPage] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    setTopic(tag === 'All' ? '' : tag);
    setPage(1);
  }, [tag]);

  useEffect(() => {
    const handler = setTimeout(() => {
      setTopic(searchInput);
      setPage(1);
    }, 500);
    return () => clearTimeout(handler);
  }, [searchInput]);

  const { data, isError, isSuccess } = useQuery<NotesHTTPResponse, Error>({
    queryKey: ['notes', topic, page],
    queryFn: () => fetchNotes(topic, page),
    refetchOnMount: false,
    staleTime: 5000,
  });

  const notes = data?.notes ?? [];
  const totalPages = data?.totalPages ?? 0;

  return (
    <div className={css.app}>
      <header className={css.toolbar}>
        <SearchBox value={searchInput} onChange={setSearchInput} />
        {isSuccess && totalPages > 1 && (
          <Pagination totalPages={totalPages} page={page} onPageChange={setPage} />
        )}
        <button className={css.button} onClick={() => setIsModalOpen(true)}>
          Create note +
        </button>
      </header>

      {isError && <ErrorMessage text="There was an error, please try again..." />}
      {notes.length === 0 && <ErrorMessage text="No notes found" />}
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
