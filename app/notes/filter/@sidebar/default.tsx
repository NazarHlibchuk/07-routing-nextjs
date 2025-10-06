import Link from "next/link";
import css from "./SidebarNotes.module.css";

const tags = ["All", "Todo", "Work", "Personal", "Meeting", "Shopping"];

export default function DefaultSidebar() {
  return (
    <aside className={css.sidebar}>
      <nav>
        <ul className={css.list}>
          {tags.map(tag => {
            const href = tag === "All" ? "/notes/filter" : `/notes/filter/${tag}`;
            return (
              <li key={tag}>
                <Link href={href} className={css.link}>
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

