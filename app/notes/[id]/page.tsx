// app/notes/[id]/page.tsx
import { QueryClient, HydrationBoundary, dehydrate } from "@tanstack/react-query";
import { fetchNoteById } from "@/lib/api";
import NoteDetailsClient from "./NoteDetails.client";

type Props = {
  params: { id: string }; // Next.js передає params синхронно
};

const NoteDetailsPage = async ({ params }: Props) => {
  const { id } = params;
  const queryClient = new QueryClient();

  // Prefetch note by id
  await queryClient.prefetchQuery({
    queryKey: ["note", id],
    queryFn: () => fetchNoteById(id),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <NoteDetailsClient noteId={id} />
    </HydrationBoundary>
  );
};

export default NoteDetailsPage;
