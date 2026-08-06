import { getTelemetry, EMPTY } from "@/lib/telemetry";
import { DeployAge } from "./DeployAge";

/**
 * THE SIGNATURE. A production system reports its own state.
 * Server component — values resolve at build/deploy, honestly.
 * Any unavailable metric renders "—" (see lib/telemetry.ts).
 */
export async function TelemetryBar() {
  const t = await getTelemetry();

  return (
    <footer
      aria-label="Live site telemetry"
      className="fixed inset-x-0 bottom-0 z-50 border-t border-line bg-bg-1/85 backdrop-blur-md"
      style={{ height: "var(--telemetry-h)" }}
    >
      <div className="mx-auto flex h-full max-w-content items-center gap-5 overflow-x-auto px-4 font-mono text-[0.75rem] tracking-wide text-text-low sm:gap-7 sm:px-6 [scrollbar-width:none]">
        <span className="flex shrink-0 items-center gap-2">
          <span className="dot-ok" aria-hidden="true" />
          <span style={{ color: "var(--ok)" }}>operational</span>
        </span>

        <Cell label="deploy">
          {t.deployHash ? (
            t.deployUrl ? (
              <a
                href={t.deployUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-text-mid transition-colors duration-[var(--dur-micro-in)] hover:text-text-hi"
              >
                {t.deployHash}
              </a>
            ) : (
              <span className="text-text-mid">{t.deployHash}</span>
            )
          ) : (
            EMPTY
          )}
        </Cell>

        <Cell label="built">
          <DeployAge iso={t.buildTime} />
        </Cell>

        <Cell label="lighthouse" className="hidden sm:flex">
          {t.lighthouse ?? EMPTY}
        </Cell>

        <Cell label="p95" className="hidden md:flex">
          {t.p95Ms !== null ? `${t.p95Ms}ms` : EMPTY}
        </Cell>

        <Cell label="uptime" className="hidden md:flex">
          {t.uptimePct !== null ? `${t.uptimePct}%` : EMPTY}
        </Cell>
      </div>
    </footer>
  );
}

function Cell({
  label,
  children,
  className = "",
}: {
  label: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <span className={`flex shrink-0 items-center gap-1.5 ${className}`}>
      <span className="text-text-low">{label}</span>
      <span className="text-text-mid">{children}</span>
    </span>
  );
}
