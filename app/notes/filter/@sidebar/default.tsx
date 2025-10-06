'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import clsx from 'clsx';
import css from './SidebarNotes.module.css';

const tags = ['All', 'Todo', 'Work', 'Personal', 'Meeting', 'Shopping'];

export default function DefaultSidebar() {
  const pathname = usePathname();

  return (
    <aside className={css.sidebar}>
      <nav>
        <ul className={css.list}>
          {tags.map(tag => {
            const href = tag === 'All' ? '/notes/filter' : `/notes/filter/${tag}`;
            const isActive = pathname === href;

            return (
              <li key={tag}>
                <Link
                  href={href}
                  className={clsx(css.link, isActive && css.active)}
                >
                  {tag}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </aside>
  );
}
