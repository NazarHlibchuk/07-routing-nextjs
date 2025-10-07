// app/notes/filter/layout.tsx
import type { ReactNode } from "react";
import styles from "./LayoutNotes.module.css"; // якщо у тебе є CSS

interface LayoutProps {
  children: ReactNode;
  sidebar: ReactNode;
}

export default function LayoutNotes({ children, sidebar }: LayoutProps) {
  return (
    <div className={styles.wrapper}>
      <aside className={styles.sidebar}>{sidebar}</aside>
      <main className={styles.content}>{children}</main>
    </div>
  );
}
