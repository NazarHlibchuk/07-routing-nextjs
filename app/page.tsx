import { fetchNotes } from "@/lib/api";
import NotesList from "./notes/Notes.client";
import { QueryClient, dehydrate, HydrationBoundary } from "@tanstack/react-query";
import css from "./page.module.css";

export default async function NotesPage() {
  const queryClient = new QueryClient();

  // Серверний prefetch даних нотаток
  await queryClient.prefetchQuery(["notes"], () => fetchNotes());

  const dehydratedState = dehydrate(queryClient);

  return (
    <main>
      <div className={css.container}>
        <h1 className={css.title}>Welcome to NoteHub</h1>
        <p className={css.description}>
          NoteHub is a simple and efficient application designed for managing
          personal notes. It helps keep your thoughts organized and accessible
          in one place, whether you are at home or on the go.
        </p>
        <p className={css.description}>
          The app provides a clean interface for writing, editing, and browsing
          notes. With support for keyword search and structured organization,
          NoteHub offers a streamlined experience for anyone who values clarity
          and productivity.
        </p>

        {/* HydrationBoundary передає попередньо отримані дані клієнтському компоненту */}
        <HydrationBoundary state={dehydratedState}>
          <NotesList />
        </HydrationBoundary>
      </div>
    </main>
  );
}
