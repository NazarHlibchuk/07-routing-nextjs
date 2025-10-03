// app/@modal/(.)notes/[id]/page.tsx
'use client';

import NotePreview from '@/app/notes/[id]/NotePreview';

interface PageProps {
  params: { id: string };
}

export default function NoteModal({ params }: PageProps) {
  const { id } = params; // await не потрібен
  return <NotePreview noteId={id} onClose={() => window.history.back()} />;
}
