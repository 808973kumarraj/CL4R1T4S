import React from "react";
import { useCurrentFrame, useVideoConfig, spring, interpolate } from "remotion";
import { LeftPanel } from "./LeftPanel";

export const Scene11: React.FC<{ showCode: boolean }> = ({ showCode }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const sweep = spring({ frame: frame - 90, fps, config: { durationInFrames: 60 } });

  return (
    <div style={{ width: "100%", height: "100%", display: "flex", position: "relative" }}>
      <LeftPanel
        kicker="10 · Fast Queries"
        headline="Data Skipping"
        description="The log stores min/max stats for every file. When you query for a specific row, the engine skips files that don't contain it."
        codeSnippet={showCode ?
`SELECT * FROM orders
WHERE customer = 'Kim'` : undefined
        }
      />
      {/* Sweep Probe Line */}
      <div style={{
        position: "absolute",
        left: "50%",
        top: `${interpolate(sweep, [0, 1], [0, 100])}%`,
        width: "50%",
        height: "2px",
        backgroundColor: sweep > 0.1 && sweep < 0.9 ? "#ff9800" : "transparent",
        zIndex: 10,
        boxShadow: sweep > 0.1 && sweep < 0.9 ? "0 0 10px #ff9800" : "none"
      }}>
        {sweep > 0.1 && sweep < 0.9 && (
          <div style={{ position: "absolute", top: "-25px", left: "20px", color: "#ff9800", fontWeight: "bold", fontFamily: "Geist Mono" }}>
            customer = 'Kim'
          </div>
        )}
      </div>
    </div>
  );
};
