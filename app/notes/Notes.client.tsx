'use client';

import ErrorMessage from '@/components/Error/ErrorMessage';
import Modal from '@/components/Modal/Modal';
import NoteForm from '@/components/NoteForm/NoteForm';
import NoteList from '@/components/NoteList/NoteList';
import Pagination from '@/components/Pagination/Pagination';
import SearchBox from '@/components/SearchBox/SearchBox';
import { fetchNotes } from '@/lib/api';
import { keepPreviousData, useQuery } from '@tanstack/react-query';
import { useState, useEffect } from 'react';
import { Toaster } from 'react-hot-toast';
import css from './NotesPage.module.css';

export default function NotesClient() {
  const [searchInput, setSearchInput] = useState('');
  const [topic, setTopic] = useState('');
  const [page, setPage] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Debounce: оновлює topic через 500мс після останнього введення
  useEffect(() => {
    const handler = setTimeout(() => {
      setTopic(searchInput);
      setPage(1);
    }, 500);

    return () => clearTimeout(handler);
  }, [searchInput]);

  const { data, isError, isSuccess } = useQuery({
    queryKey: ['notes', topic, page],
    queryFn: () => fetchNotes(topic, page),
    placeholderData: keepPreviousData,
    refetchOnMount: false,
  });

  const totalPages = data?.totalPages ?? 0;

  function openModal() {
    setIsModalOpen(true);
  }

  function closeModal() {
    setIsModalOpen(false);
  }

  return (
    <div className={css.app}>
      <header className={css.toolbar}>
        <SearchBox value={searchInput} onChange={setSearchInput} />
        {isSuccess && totalPages > 1 && (
          <Pagination
            totalPages={totalPages}
            page={page}
            onPageChange={setPage}
          />
        )}
        <button className={css.button} onClick={openModal}>
          Create note +
        </button>
      </header>
      {isError && (
        <ErrorMessage text="There was an error, please try again..." />
      )}
      {data !== undefined && data?.notes.length === 0 && (
        <ErrorMessage text="No notes found" />
      )}
      {data !== undefined && data?.notes.length > 0 && (
        <NoteList notes={data?.notes} />
      )}
      {isModalOpen && (
        <Modal onClose={closeModal}>
          <NoteForm onClose={closeModal} />
        </Modal>
      )}
      <Toaster />
    </div>
  );
}
