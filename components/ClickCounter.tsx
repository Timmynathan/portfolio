"use client";

import { useEffect, useState } from "react";

// Shared count lives in Abacus, a free public counting API (https://abacus.jasoncameron.dev).
// If it's unreachable the card still works, showing only this visitor's own clicks.
const COUNTER_URL = "https://abacus.jasoncameron.dev";
const COUNTER_KEY = "timmynathan-portfolio/clicks";
const STORAGE_KEY = "click-count";

export function ClickCounter() {
  /** Everyone's clicks; null while loading or when the counter service is unavailable. */
  const [total, setTotal] = useState<number | null>(null);
  const [mine, setMine] = useState(0);

  useEffect(() => {
    try {
      setMine(Number(localStorage.getItem(STORAGE_KEY)) || 0);
    } catch {
      // Storage unavailable — start from 0.
    }

    fetch(`${COUNTER_URL}/get/${COUNTER_KEY}`)
      .then(async (res) => {
        // 404 just means nobody has clicked yet.
        if (res.status === 404) return setTotal(0);
        if (!res.ok) return;
        const data: { value?: number } = await res.json();
        if (typeof data.value === "number") setTotal(data.value);
      })
      .catch(() => {});
  }, []);

  const handleClick = () => {
    const next = mine + 1;
    setMine(next);
    try {
      localStorage.setItem(STORAGE_KEY, String(next));
    } catch {
      // Not persisted; still counts for this visit.
    }
    setTotal((n) => (n === null ? n : n + 1));

    fetch(`${COUNTER_URL}/hit/${COUNTER_KEY}`)
      .then(async (res) => {
        if (!res.ok) return;
        const data: { value?: number } = await res.json();
        const value = data.value;
        // Never step backwards if responses arrive out of order.
        if (typeof value === "number") setTotal((n) => Math.max(n ?? 0, value));
      })
      .catch(() => {});
  };

  return (
    <div className="click-counter">
      <p className="click-total" aria-live="polite">
        {total === null ? "—" : total.toLocaleString("en-US")}
      </p>
      <p className="dash-label">clicks from everyone</p>
      <button type="button" className="dash-button dash-button-filled" onClick={handleClick}>
        Click me
      </button>
      <p className="click-mine">
        you&apos;ve clicked {mine.toLocaleString("en-US")} {mine === 1 ? "time" : "times"}
      </p>
    </div>
  );
}
