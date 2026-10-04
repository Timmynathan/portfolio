"use client";

import { useEffect, useState } from "react";

type Theme = "light" | "dark";

/** "default" keeps the site's monochrome accent; the rest are defined per theme in globals.css. */
const ACCENTS = ["default", "blue", "green", "orange", "violet", "pink"] as const;
type Accent = (typeof ACCENTS)[number];

function save(key: string, value: string) {
  try {
    localStorage.setItem(key, value);
  } catch {
    // Storage unavailable (private mode etc.) — the choice just won't persist.
  }
}

export function ThemeCard() {
  const [theme, setTheme] = useState<Theme>("light");
  const [accent, setAccent] = useState<Accent>("default");

  // The inline script in layout.tsx has already applied any saved choice to <html>; mirror it here.
  useEffect(() => {
    const root = document.documentElement;
    if (root.dataset.theme === "dark") setTheme("dark");
    const saved = root.dataset.accent as Accent | undefined;
    if (saved && ACCENTS.includes(saved)) setAccent(saved);
  }, []);

  const chooseTheme = (next: Theme) => {
    setTheme(next);
    document.documentElement.dataset.theme = next;
    save("theme", next);
  };

  const chooseAccent = (next: Accent) => {
    setAccent(next);
    document.documentElement.dataset.accent = next;
    save("accent", next);
  };

  return (
    <>
      <div className="theme-modes" role="group" aria-label="Colour theme">
        {(["light", "dark"] as const).map((mode) => (
          <button
            key={mode}
            type="button"
            className="theme-mode"
            aria-pressed={theme === mode}
            onClick={() => chooseTheme(mode)}
          >
            {mode === "light" ? "Light" : "Dark"}
          </button>
        ))}
      </div>

      <p className="dash-label" id="accent-label">Accent</p>
      <div className="theme-swatches" role="group" aria-labelledby="accent-label">
        {ACCENTS.map((name) => (
          <button
            key={name}
            type="button"
            className="theme-swatch"
            data-swatch={name}
            aria-pressed={accent === name}
            aria-label={`${name} accent`}
            title={name[0].toUpperCase() + name.slice(1)}
            onClick={() => chooseAccent(name)}
          />
        ))}
      </div>
    </>
  );
}
