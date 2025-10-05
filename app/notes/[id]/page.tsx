// app/notes/[id]/page.tsx
import { HydrationBoundary, dehydrate, QueryClient } from '@tanstack/react-query';
import { fetchNote } from '@/lib/api';
import NoteDetailsClient from './NoteDetails.client';

interface PageProps {
  params: { id: string };
}

export default async function NoteDetailsPage({ params }: PageProps) {
  const { id } = params;
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ['note', id],
    queryFn: () => fetchNote(id),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      {/* Передаємо id у клієнтський компонент */}
      <NoteDetailsClient id={id} />
    </HydrationBoundary>
  );
}
