import { HydrationBoundary, QueryClient, dehydrate } from "@tanstack/react-query";
import SidebarNotes from "@/app/notes/filter/@sidebar/SidebarNotes";
import NotesPage from "./Notes.client";
import { fetchNotes } from "@/lib/api";

interface PageProps {
  params: Promise<{ slug?: string[] }>;
}

export default async function Page({ params }: PageProps) {
  const { slug } = await params;
  const tag = slug?.[0] || "All";
  const topic = tag === "All" ? "" : tag;

  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["notes", topic, "", 1], // tag, search, page
    queryFn: () => fetchNotes(topic, "", 1),
  });

  const dehydratedState = dehydrate(queryClient);

  return (
    <div style={{ display: "flex", gap: 24 }}>
      <SidebarNotes />
      <HydrationBoundary state={dehydratedState}>
        <NotesPage tag={tag} />
      </HydrationBoundary>
    </div>
  );
}
