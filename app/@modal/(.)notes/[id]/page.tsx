import NotePreview from "@/app/notes/[id]/NotePreview";

interface PageProps {
  params: Promise<{ id: string }>; // ⚡ тут Promise!
}

export default async function NoteModal({ params }: PageProps) {
  const { id } = await params; // ✅ тут await потрібен
  return <NotePreview id={id} />;
}
