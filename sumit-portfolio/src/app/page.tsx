import { Nav } from "@/components/chrome/Nav";
import { TelemetryBar } from "@/components/chrome/TelemetryBar";
import { Thesis } from "@/components/sections/Thesis";
import { Systems } from "@/components/sections/Systems";
import { Principles } from "@/components/sections/Principles";
import { Ledger } from "@/components/sections/Ledger";
import { Capabilities } from "@/components/sections/Capabilities";
import { Colophon } from "@/components/sections/Colophon";
import { Engage } from "@/components/sections/Engage";

// Hourly ISR: live telemetry (uptime, p95) refreshes without a redeploy.
export const revalidate = 3600;

export default function Home() {
  return (
    <>
      <Nav />
      <main id="main">
        <Thesis />
        <Principles />
        <Systems />
        <Ledger />
        <Capabilities />
        <Colophon />
        <Engage />
      </main>
      <TelemetryBar />
    </>
  );
}
