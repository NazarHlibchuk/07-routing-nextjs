"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import css from "./TagsMenu.module.css";
import { fetchNotes } from "@/lib/api";

export default function TagsMenu() {
  const [tags, setTags] = useState<string[]>(["All"]); // початковий стан масив
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    async function fetchTags() {
      try {
        const resp = await fetchNotes("", 1); // отримуємо першу сторінку нотаток
        const notes = resp.notes || [];

        // витягуємо унікальні теги
        const tagsSet = new Set(notes.map((note) => note.tag).filter(Boolean));
        setTags(["All", ...Array.from(tagsSet)]);
      } catch (error) {
        console.error("Failed to fetch tags:", error);
        setTags(["All"]); // fallback
      }
    }

    fetchTags();
  }, []);

  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <div className={css.menuContainer}>
      <button className={css.menuButton} onClick={toggleMenu}>
        Notes ▾
      </button>
      {isOpen && tags.length > 0 && (
        <ul className={css.menuList}>
          {tags.map((tag) => (
            <li key={tag} className={css.menuItem}>
              <Link
                href={tag === "All" ? `/notes/filter` : `/notes/filter/${tag}`}
                className={css.menuLink}
                onClick={() => setIsOpen(false)}
              >
                {tag}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
