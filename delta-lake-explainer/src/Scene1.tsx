import React from "react";
import { useCurrentFrame, useVideoConfig, spring, interpolate } from "remotion";

export const Scene1: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleProgress = spring({
    frame,
    fps,
    config: { damping: 12 },
  });

  const sublineProgress = spring({
    frame: frame - 15,
    fps,
    config: { damping: 12 },
  });

  return (
    <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
      <h1 style={{
        fontFamily: "Instrument Serif, serif",
        fontSize: "120px",
        color: "#111",
        margin: 0,
        opacity: titleProgress,
        transform: `translateY(${interpolate(titleProgress, [0, 1], [40, 0])}px)`
      }}>
        Delta Lake
      </h1>
      <p style={{
        fontFamily: "Geist, sans-serif",
        fontSize: "32px",
        color: "#555",
        marginTop: "20px",
        opacity: sublineProgress,
        transform: `translateY(${interpolate(sublineProgress, [0, 1], [20, 0])}px)`
      }}>
        How a folder of files becomes a table you can trust.
      </p>
    </div>
  );
};
