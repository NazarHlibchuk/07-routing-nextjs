// app/notes/filter/[...slug]/page.tsx
import SidebarNotes from '../@sidebar/SidebarNotes';
import NotesPage from './NotesPage';
import type { ReactNode } from 'react';

interface PageProps {
  params: { slug?: string[] }; // catch-all params
}

export default function Page({ params }: PageProps) {
  // Якщо slug немає або порожній, показуємо All
  const tag = params?.slug?.[0] || 'All';

  return (
    <div style={{ display: 'flex', gap: '24px' }}>
      {/* Бокове меню з тегами */}
      <SidebarNotes />

      {/* Основний контент */}
      <main style={{ flex: 1 }}>
        <NotesPage tag={tag} />
      </main>
    </div>
  );
}
