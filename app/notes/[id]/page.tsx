// app/notes/[id]/page.tsx
import { HydrationBoundary, dehydrate, QueryClient } from "@tanstack/react-query";
import { fetchNote } from "@/lib/api";
import NoteDetails from "./NoteDetails.client";


interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function NoteDetailsPage({ params }: PageProps) {
  const { id } = await params;
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["note", id],
    queryFn: () => fetchNote(id),
  });

  return (
   <HydrationBoundary state={dehydrate(queryClient)}>
  <NoteDetails noteId={id} />
</HydrationBoundary>

  );
}
