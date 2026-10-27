import React from "react";
import { useCurrentFrame, useVideoConfig, spring, interpolate } from "remotion";
import { LeftPanel } from "./LeftPanel";

export const Scene2: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const card1 = spring({ frame: frame - 15, fps });
  const card2 = spring({ frame: frame - 45, fps });
  const card3 = spring({ frame: frame - 75, fps });

  return (
    <div style={{ width: "100%", height: "100%", display: "flex" }}>
      <LeftPanel
        kicker="01 · The Problem"
        headline="Two Worlds"
        description="Data warehouses are reliable but closed. Data lakes are cheap but messy. Delta Lake gives you both."
      />
      <div style={{ width: "50%", position: "absolute", right: 0, height: "100%", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", gap: "30px", padding: "60px" }}>

        <div style={{
          backgroundColor: "#fff", padding: "30px", borderRadius: "12px", width: "80%", boxShadow: "0 10px 30px rgba(0,0,0,0.05)",
          opacity: card1, transform: `translateY(${interpolate(card1, [0, 1], [40, 0])}px)`
        }}>
          <h2 style={{ margin: "0 0 10px 0", color: "#111" }}>Data Warehouse</h2>
          <p style={{ margin: 0, color: "#666", fontSize: "20px" }}>Reliable, fast, but closed & expensive.</p>
        </div>

        <div style={{
          backgroundColor: "#fff", padding: "30px", borderRadius: "12px", width: "80%", boxShadow: "0 10px 30px rgba(0,0,0,0.05)",
          opacity: card2, transform: `translateY(${interpolate(card2, [0, 1], [40, 0])}px)`
        }}>
          <h2 style={{ margin: "0 0 10px 0", color: "#111" }}>Data Lake</h2>
          <p style={{ margin: 0, color: "#666", fontSize: "20px" }}>Cheap, open files, but messy & untrustworthy.</p>
        </div>

        <div style={{
          backgroundColor: "#0e7a76", padding: "30px", borderRadius: "12px", width: "80%", boxShadow: "0 10px 30px rgba(14,122,118,0.2)",
          color: "white", opacity: card3, transform: `translateY(${interpolate(card3, [0, 1], [40, 0])}px)`
        }}>
          <h2 style={{ margin: "0 0 10px 0" }}>Lakehouse / Delta Lake</h2>
          <p style={{ margin: 0, fontSize: "20px", opacity: 0.9 }}>Both — thanks to a transaction log.</p>
        </div>

      </div>
    </div>
  );
};
