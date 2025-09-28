// app/notes/page.tsx

import { QueryClient, dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { fetchNotes } from "@/lib/api";
import NotesClient from "./Notes.client";
import css from "../page.module.css";

const notesKey = (page: number, search: string) => ["notes", page, search];

export default async function NotesPage() {
  const queryClient = new QueryClient();

  // Серверний prefetch першої сторінки
  await queryClient.prefetchQuery({
    queryKey: notesKey(1, ""),
    queryFn: () => fetchNotes({ page: 1, perPage: 12, search: "" }),
  });

  const dehydratedState = dehydrate(queryClient);

  return (
    <main className={css.page}>
      <HydrationBoundary state={dehydratedState}>
        {/* Клієнтський компонент отримує початкові значення (він сам викликає useQuery) */}
        <NotesClient initialPage={1} initialSearch="" perPage={12} />
      </HydrationBoundary>
    </main>
  );
}

