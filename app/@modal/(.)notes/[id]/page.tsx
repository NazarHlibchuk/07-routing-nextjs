'use client';

import NotePreview from '@/app/notes/[id]/NotePreview';

interface PageProps {
  params: { id: string };
}

export default function NoteModal({ params }: PageProps) {
  const { id } = params;
  return <NotePreview noteId={id} onClose={() => window.history.back()} />;
}
