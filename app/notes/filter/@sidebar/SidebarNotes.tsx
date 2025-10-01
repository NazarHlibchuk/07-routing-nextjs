"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import css from "./SidebarNotes.module.css";
import { getTags } from "@/lib/api";

export default function SidebarNotes() {
  const [tags, setTags] = useState<string[]>([]);

  useEffect(() => {
    async function fetchTags() {
      const fetchedTags = await getTags();
      setTags(["All", ...fetchedTags]); // додаємо "All" як перший пункт
    }

    fetchTags();
  }, []);

  return (
    <aside className={css.sidebar}>
      <ul className={css.menuList}>
        {tags.map((tag) => (
          <li key={tag} className={css.menuItem}>
            <Link
              href={tag === "All" ? `/notes/filter` : `/notes/filter/${tag}`}
              className={css.menuLink}
            >
              {tag}
            </Link>
          </li>
        ))}
      </ul>
    </aside>
  );
}
