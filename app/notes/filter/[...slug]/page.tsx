import { HydrationBoundary, QueryClient, dehydrate } from "@tanstack/react-query";
import SidebarNotes from "../@sidebar/SidebarNotes";
import NotesPage from "../[...slug]/Notes.client";
import { fetchNotes } from "@/lib/api";

interface PageProps {
  params: Promise<{ slug?: string[] }>;
}

export default async function Page({ params }: PageProps) {
  const { slug } = await params;
  const tag = slug?.[0] || "All";

  //  1. Створюємо QueryClient для SSR
  const queryClient = new QueryClient();

  //  2. Prefetch — завантажуємо дані на сервері
  await queryClient.prefetchQuery({
    queryKey: ["notes", tag],
    queryFn: () => fetchNotes(tag),
  });

  //  3. Серіалізуємо кеш для клієнта
  const dehydratedState = dehydrate(queryClient);

  return (
    <div style={{ display: "flex", gap: "24px" }}>
      <SidebarNotes />
      {/*  4. Обгортка для гідрації стану на клієнті */}
      <HydrationBoundary state={dehydratedState}>
        <NotesPage tag={tag} />
      </HydrationBoundary>
    </div>
  );
}
