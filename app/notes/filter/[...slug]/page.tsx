import SidebarNotes from '../@sidebar/SidebarNotes';
import NotesPage from './Notes.client'; // твій клієнтський компонент зі списком нотаток

interface PageProps {
  params: Promise<{ slug?: string[] }>;
}

export default async function Page({ params }: PageProps) {
  const { slug } = await params;
  const tag = slug?.[0] || 'All';

  return (
    <div style={{ display: 'flex', gap: '24px' }}>
      <SidebarNotes />
      <NotesPage tag={tag} />
    </div>
  );
}


