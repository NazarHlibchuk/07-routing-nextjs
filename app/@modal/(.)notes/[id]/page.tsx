import NotePreview from '@/app/notes/[id]/NotePreview';

interface PageProps {
  params: { id: string };
}

export default function NoteModal({ params }: PageProps) {
  return <NotePreview id={params.id} />;
}
