// app/page.tsx
import Link from "next/link";
import css from "./page.module.css";

export const metadata = {
  title: "NoteHub",
  description: "Simple and efficient app for managing personal notes",
};

export default function HomePage() {
  return (
    <div className={css.page}>
      <main className={css.main}>
        <h1>Welcome to NoteHub</h1>

        <p>
          NoteHub is a simple and efficient application designed for managing personal notes.
        </p>

        <p>
          The app provides a clean interface for writing, editing, and browsing notes.
        </p>

        <div className={css.ctas}>
          <Link href="/notes" className="primary" aria-label="Переглянути нотатки">
            Переглянути нотатки
          </Link>
          <Link href="/notes/new" className="secondary" aria-label="Створити нотатку">
            Створити нотатку
          </Link>
        </div>
      </main>
    </div>
  );
}
