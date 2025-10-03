'use client';

import Link from 'next/link';
import css from './SidebarNotes.module.css';
import type { NoteTag } from '@/types/note';

const ALL_TAG = 'All';
const TAGS: NoteTag[] = ['Todo', 'Work', 'Personal', 'Meeting', 'Shopping'];

export default function SidebarNotes() {
  return (
    <aside className={css.sidebar}>
      <ul className={css.menuList}>
        {/* All notes */}
        <li className={css.menuItem}>
          <Link href="/notes/filter" className={css.menuLink}>
            {ALL_TAG}
          </Link>
        </li>

        {/* Решта тегів */}
        {TAGS.map((tag) => (
          <li key={tag} className={css.menuItem}>
            <Link href={`/notes/filter/${tag}`} className={css.menuLink}>
              {tag}
            </Link>
          </li>
        ))}
      </ul>
    </aside>
  );
}
