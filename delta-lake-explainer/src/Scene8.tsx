import React from "react";
import { useCurrentFrame, useVideoConfig, spring, interpolate } from "remotion";
import { LeftPanel } from "./LeftPanel";

export const Scene8: React.FC<{ showCode: boolean }> = ({ showCode }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const slideBack = spring({ frame: frame - 60, fps, config: { damping: 20 } });
  const slideForward = spring({ frame: frame - 240, fps, config: { damping: 20 } });

  let effectiveVersion = 5;
  if (slideBack > 0.5 && slideForward < 0.5) effectiveVersion = 2;

  return (
    <div style={{ width: "100%", height: "100%", display: "flex", position: "relative" }}>
      <LeftPanel
        kicker="07 · Auditing"
        headline="Time Travel"
        description="Because old files aren't deleted immediately, you can query exactly how the table looked at any point in the past."
        codeSnippet={showCode ?
`SELECT * FROM orders
VERSION AS OF 2` : undefined
        }
      />
      {/* Playhead overlay */}
      <div style={{
        position: "absolute",
        left: `calc(50% + ${interpolate(slideBack - slideForward, [0, 1], [400, 150])}px)`,
        top: "70%",
        width: "4px",
        height: "100px",
        backgroundColor: "#0e7a76",
        zIndex: 10,
        boxShadow: "0 0 10px #0e7a76"
      }}>
        <div style={{
          position: "absolute", top: "-30px", left: "-20px",
          backgroundColor: "#0e7a76", color: "white", padding: "4px 8px",
          borderRadius: "4px", fontWeight: "bold", fontFamily: "Geist Mono"
        }}>
          v{effectiveVersion}
        </div>
      </div>
    </div>
  );
};
