# telemetry/

Real metrics land here. Nothing in this directory is ever hand-written
with fake values — that rule is enforced by the brand, not just the code.

- `lighthouse.json` — written by the Lighthouse CI step (Phase 5).
  Until CI produces it, the telemetry bar renders "—" for lighthouse.
  Expected shape: `{ "categories": { "performance": 0.98 } }` (LHCI output)
  or `{ "performance": 98 }`.
