import { ImageResponse } from "next/og";

export const runtime = "edge";

/**
 * Dynamic OG images in the brand system — dark surface, display
 * headline, telemetry-strip footer. /og?title=...&sub=...
 */
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const title = (searchParams.get("title") ?? "Zero critical bugs isn't luck. It's architecture.").slice(0, 90);
  const sub = (searchParams.get("sub") ?? "Sumit Rawat — Full-Stack / Systems Engineer").slice(0, 110);

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#0a0a0b",
          padding: "72px 80px 0",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              color: "#5c5c66",
              fontSize: 22,
              letterSpacing: "0.1em",
              textTransform: "uppercase",
            }}
          >
            sumit rawat · engineering
          </div>
          <div
            style={{
              marginTop: 36,
              color: "#ededef",
              fontSize: 64,
              fontWeight: 700,
              lineHeight: 1.08,
              letterSpacing: "-0.02em",
              maxWidth: 980,
            }}
          >
            {title}
          </div>
          <div style={{ marginTop: 28, color: "#9e9ea7", fontSize: 28, maxWidth: 900 }}>
            {sub}
          </div>
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 28,
            borderTop: "1px solid rgba(255,255,255,0.09)",
            padding: "22px 0 28px",
            color: "#5c5c66",
            fontSize: 20,
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <div
              style={{
                width: 10,
                height: 10,
                borderRadius: 999,
                background: "#4cc38a",
              }}
            />
            <div style={{ color: "#4cc38a" }}>operational</div>
          </div>
          <div>honest telemetry</div>
          <div>github.com/Sumit-00000</div>
        </div>
      </div>
    ),
    { width: 1200, height: 630 },
  );
}
