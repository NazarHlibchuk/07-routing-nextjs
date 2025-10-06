import { HydrationBoundary, QueryClient, dehydrate } from "@tanstack/react-query";
import NotePreview from "@/app/notes/[id]/NotePreview";
import { fetchNote } from "@/lib/api";

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function NoteModal({ params }: PageProps) {
  // чекаємо params
  const { id } = await params;

  // створюємо QueryClient
  const queryClient = new QueryClient();

  // prefetch нотатки на сервері
  await queryClient.prefetchQuery({
    queryKey: ["note", id],
    queryFn: () => fetchNote(id),
  });

  // серіалізуємо стан кешу
  const dehydratedState = dehydrate(queryClient);

  // рендеримо клієнтський компонент через HydrationBoundary
  return (
    <HydrationBoundary state={dehydratedState}>
      <NotePreview noteId={id} onClose={() => window.history.back()} />
    </HydrationBoundary>
  );
}
