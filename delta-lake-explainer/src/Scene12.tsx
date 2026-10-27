import React from "react";
import { useCurrentFrame, useVideoConfig, spring, interpolate } from "remotion";

export const Scene12: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Slide out the panel
  const panelSlide = spring({ frame: frame - 15, fps, config: { damping: 12 } });

  // Fade in elements sequentially
  const list1 = spring({ frame: frame - 60, fps });
  const list2 = spring({ frame: frame - 90, fps });
  const list3 = spring({ frame: frame - 120, fps });
  const list4 = spring({ frame: frame - 150, fps });
  const list5 = spring({ frame: frame - 180, fps });

  // Final fade out for loop
  const fadeOut = interpolate(frame, [270, 300], [1, 0], { extrapolateRight: "clamp" });

  const liStyle = (animProgress: number): React.CSSProperties => ({
    opacity: animProgress,
    transform: `translateY(${interpolate(animProgress, [0, 1], [20, 0])}px)`,
    fontSize: "32px",
    color: "#444",
    marginBottom: "20px",
    display: "flex",
    alignItems: "center"
  });

  return (
    <div style={{ width: "100%", height: "100%", display: "flex", opacity: fadeOut, position: "relative" }}>

      {/* Left side taking over */}
      <div style={{
        position: "absolute",
        left: 0,
        top: 0,
        width: `${interpolate(panelSlide, [0, 1], [50, 100])}%`,
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        padding: "80px",
        boxSizing: "border-box",
        zIndex: 10,
        backgroundColor: "#f2eee6"
      }}>
        <div style={{ maxWidth: "1000px", width: "100%" }}>
          <h1 style={{ fontFamily: "Instrument Serif, serif", fontSize: "72px", lineHeight: "1.1", margin: "0 0 50px 0", color: "#111" }}>
            Open files + one log =<br/>
            <span style={{ color: "#0e7a76" }}>a table you can trust.</span>
          </h1>

          <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
            <li style={liStyle(list1)}>
              <span style={{ color: "#0e7a76", fontWeight: "bold", marginRight: "20px" }}>1.</span> Atomic commits
            </li>
            <li style={liStyle(list2)}>
              <span style={{ color: "#0e7a76", fontWeight: "bold", marginRight: "20px" }}>2.</span> Safe concurrent writers
            </li>
            <li style={liStyle(list3)}>
              <span style={{ color: "#0e7a76", fontWeight: "bold", marginRight: "20px" }}>3.</span> Schema enforcement & evolution
            </li>
            <li style={liStyle(list4)}>
              <span style={{ color: "#0e7a76", fontWeight: "bold", marginRight: "20px" }}>4.</span> Updates, merges & time travel
            </li>
            <li style={liStyle(list5)}>
              <span style={{ color: "#0e7a76", fontWeight: "bold", marginRight: "20px" }}>5.</span> Fast queries (Data skipping & Z-Order)
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};
