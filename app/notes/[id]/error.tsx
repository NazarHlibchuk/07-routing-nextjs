"use client";

import React from "react";

type Props = {
  error: Error;
  reset: () => void; // reset потрібен для кнопки "спробувати ще раз"
};

export default function NoteDetailsError({ error, reset }: Props) {
  return (
    <div style={{ padding: 20 }}>
      <h2>Something went wrong</h2>
      <p style={{ color: "red" }}>{error.message}</p>
      <button onClick={reset}>Try again</button>
    </div>
  );
}
