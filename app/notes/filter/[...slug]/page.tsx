// app/notes/filter/[...slug]/page.tsx
import { HydrationBoundary, QueryClient, dehydrate } from "@tanstack/react-query";
import { fetchNotes } from "@/lib/api";
import NotesPage from "./Notes.client";

interface PageProps {
  params: Promise<{ slug?: string[] }>;
}

export default async function Page({ params }: PageProps) {
  const { slug } = await params;
  const tag = slug?.[0] || "All";

  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["notes", tag, "", 1],        // tag, search, page
    queryFn: () => fetchNotes(tag, "", 1),  // ← передаємо tag обов'язково
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <NotesPage tag={tag} />
    </HydrationBoundary>
  );
}
