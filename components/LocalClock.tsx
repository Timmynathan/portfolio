"use client";

import { useEffect, useState } from "react";

/** Live clock for a fixed time zone. Renders a placeholder until mounted so server and client HTML match. */
export function LocalClock({ timeZone }: { timeZone: string }) {
  const [time, setTime] = useState<string | null>(null);

  useEffect(() => {
    const format = new Intl.DateTimeFormat("en-GB", {
      timeZone,
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: false,
    });
    const tick = () => setTime(format.format(new Date()));
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, [timeZone]);

  return <span className="dash-clock">{time ?? "--:--:--"}</span>;
}
