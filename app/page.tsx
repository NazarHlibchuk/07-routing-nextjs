import { QueryClient, dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { fetchNotes } from "@/lib/api";
import css from "./page.module.css";

export default async function NotesPage() {
  const queryClient = new QueryClient();

  // Серверний prefetch першої сторінки з пустим пошуком
  await queryClient.prefetchQuery({
    queryKey: ["notes", 1, ""],
    queryFn: () => fetchNotes({ page: 1, perPage: 12, search: "" }),
  });

  const dehydratedState = dehydrate(queryClient);

  return (
    <main>
      <div className={css.container}>
        <h1 className={css.title}>Welcome to NoteHub</h1>
        <p className={css.description}>
          NoteHub is a simple and efficient application designed for managing personal notes.
        </p>
        <p className={css.description}>
          The app provides a clean interface for writing, editing, and browsing notes.
        </p>

        {/* Передаємо дегідровані дані клієнтському компоненту */}
        <HydrationBoundary state={dehydratedState}>
          <NotesClient />
        </HydrationBoundary>
      </div>
    </main>
  );
}
