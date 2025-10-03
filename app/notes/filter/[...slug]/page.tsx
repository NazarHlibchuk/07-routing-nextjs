// app/notes/filter/[...slug]/page.tsx
import SidebarNotes from '../@sidebar/SidebarNotes';
import NotesPage from './NotesPage'; 

interface PageProps {
  params: { slug?: string[] | undefined };
}

export default async function Page({ params }: PageProps) {

  const slugArray = params.slug ?? [];
  const tag = slugArray[0] || 'All';

  return (
    <div style={{ display: 'flex', gap: '24px' }}>
      <SidebarNotes />
      <NotesPage tag={tag} />
    </div>
  );
}
