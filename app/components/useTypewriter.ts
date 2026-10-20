"use client";

import { useEffect, useState } from "react";

/** Types each word, holds it, erases it, then moves to the next. `words` must be a stable reference. */
export function useTypewriter(words: readonly string[], type = 90, erase = 45, hold = 1800, gap = 350) {
  const [index, setIndex] = useState(0);
  const [text, setText] = useState("");
  const [erasing, setErasing] = useState(false);

  useEffect(() => {
    const word = words[index];
    let delay = erasing ? erase : type;
    let next = () => setText(erasing ? text.slice(0, -1) : word.slice(0, text.length + 1));

    if (!erasing && text === word) {
      delay = hold;
      next = () => setErasing(true);
    } else if (erasing && text === "") {
      delay = gap;
      next = () => {
        setErasing(false);
        setIndex((index + 1) % words.length);
      };
    }

    const t = setTimeout(next, delay);
    return () => clearTimeout(t);
  }, [text, erasing, index, words, type, erase, hold, gap]);

  return { index, text };
}
