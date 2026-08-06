/**
 * Measures real first-load JS for the homepage from the build output
 * (gzipped, like Next's own report) and writes telemetry/bundle.json.
 * Run AFTER `next build`. CI commits the result — the colophon reads it.
 * No build output → no file → the site renders "—". Never a typed number.
 */
import fs from "node:fs";
import path from "node:path";
import zlib from "node:zlib";

const root = process.cwd();
const manifestPath = path.join(root, ".next", "app-build-manifest.json");

try {
  const manifest = JSON.parse(fs.readFileSync(manifestPath, "utf8"));
  const files = manifest.pages?.["/page"] ?? [];
  const jsFiles = [...new Set(files)].filter((f) => f.endsWith(".js"));
  let bytes = 0;
  for (const f of jsFiles) {
    const p = path.join(root, ".next", f);
    bytes += zlib.gzipSync(fs.readFileSync(p)).length;
  }
  const firstLoadKb = Math.round((bytes / 1024) * 10) / 10;
  fs.mkdirSync(path.join(root, "telemetry"), { recursive: true });
  fs.writeFileSync(
    path.join(root, "telemetry", "bundle.json"),
    JSON.stringify({ firstLoadKb, files: jsFiles.length, generatedAt: new Date().toISOString() }, null, 2) + "\n",
  );
  console.log(`first-load JS (gzip): ${firstLoadKb} kB across ${jsFiles.length} files`);
} catch (err) {
  console.error("measure-first-load: no build output found — nothing written.", err.message);
  process.exitCode = 1;
}
