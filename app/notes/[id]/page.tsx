import { QueryClient, HydrationBoundary, dehydrate } from "@tanstack/react-query";
import { fetchSingleNote } from "@/lib/api";
import NoteDetailsClient from "./NoteDetails.client";

interface PageProps {
  params: { id: string };
}

const NoteDetailsPage = async ({ params }: PageProps) => {
  const { id } = params; 

  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["note", id],
    queryFn: () => fetchSingleNote(id),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <NoteDetailsClient id={id} />
    </HydrationBoundary>
  );
};

export default NoteDetailsPage;
