import NotesClient from './Notes.client';
import SidebarNotes from '../@sidebar/SidebarNotes';

interface PageProps {
  params: { slug?: string[] };
}

export default function NotesPage({ params }: PageProps) {
  const tag = params.slug?.[0] || 'All';

  return (
    <div style={{ display: 'flex', gap: '24px' }}>
      <SidebarNotes />
      <NotesClient tag={tag} />
    </div>
  );
}
