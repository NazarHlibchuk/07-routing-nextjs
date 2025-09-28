// app/notes/[id]/page.tsx
import { QueryClient, HydrationBoundary, dehydrate } from "@tanstack/react-query";
import { fetchNoteById } from "@/lib/api";
import NoteDetailsClient from "./NotesDetails/NoteDetails.client";

type Props = {
  params: Promise<{ id: string }>;
};

const NoteDetailsPage = async ({ params }: Props) => {
  const { id } = await params; 
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
