"use client";

import { useEffect, useState } from "react";
import { EMPTY } from "@/lib/constants";

/**
 * Relative deploy age, computed client-side after mount so a
 * statically-generated page never shows a stale "just now".
 * Renders "—" until mounted (and forever, if no build time exists):
 * honest at every stage of hydration.
 */
export function DeployAge({ iso }: { iso: string | null }) {
  const [age, setAge] = useState<string | null>(null);

  useEffect(() => {
    if (!iso) return;
    const compute = () => {
      const ms = Date.now() - new Date(iso).getTime();
      if (Number.isNaN(ms) || ms < 0) return setAge(null);
      const m = Math.floor(ms / 60_000);
      if (m < 1) return setAge("just now");
      if (m < 60) return setAge(`${m}m ago`);
      const h = Math.floor(m / 60);
      if (h < 48) return setAge(`${h}h ago`);
      return setAge(`${Math.floor(h / 24)}d ago`);
    };
    compute();
    const id = setInterval(compute, 60_000);
    return () => clearInterval(id);
  }, [iso]);

  return <span suppressHydrationWarning>{age ?? EMPTY}</span>;
}
