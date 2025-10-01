// app/notes/filter/[...slug]/page.tsx
import NotesClient from "./Notes.client";
import { fetchNotes } from "@/lib/api";

interface PageProps {
  params: { slug?: string[] };
}

export default async function NotesPage({ params }: PageProps) {
  // Витягуємо тег з URL, якщо його немає — пустий рядок (All notes)
  const tag = params.slug?.[0] || "";

  // Можна зробити попереднє отримання нотаток на сервері, якщо потрібно
  // але NotesClient вже робить fetch через React Query
  // const initialData = await fetchNotes(tag, 1);

  return <NotesClient tag={tag} />;
}
