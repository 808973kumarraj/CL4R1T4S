import React from "react";
import { spring, useCurrentFrame, useVideoConfig } from "remotion";

interface LeftPanelProps {
  kicker: string;
  headline: string;
  description: string;
  codeSnippet?: string;
}

export const LeftPanel: React.FC<LeftPanelProps> = ({ kicker, headline, description, codeSnippet }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Simple fade and slide up animation for the content
  const entranceProgress = spring({
    frame,
    fps,
    config: { damping: 12, mass: 0.5, stiffness: 100 },
  });

  const translateY = 40 * (1 - entranceProgress);
  const opacity = entranceProgress;

  return (
    <div style={{
      position: "absolute",
      left: 0,
      top: 0,
      width: "50%",
      height: "100%",
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      padding: "80px",
      boxSizing: "border-box",
      transform: `translateY(${translateY}px)`,
      opacity,
    }}>
      <div style={{ color: "#0e7a76", fontSize: "20px", fontWeight: "bold", letterSpacing: "2px", marginBottom: "20px", textTransform: "uppercase" }}>
        {kicker}
      </div>
      <h1 style={{ fontFamily: "Instrument Serif, serif", fontSize: "72px", lineHeight: "1.1", margin: "0 0 30px 0", color: "#111" }}>
        {headline}
      </h1>
      <p style={{ fontSize: "24px", lineHeight: "1.5", color: "#444", margin: "0 0 50px 0", maxWidth: "90%" }}>
        {description}
      </p>

      {codeSnippet && (
        <div style={{
          backgroundColor: "#1e1e1e",
          color: "#d4d4d4",
          padding: "30px",
          borderRadius: "12px",
          fontFamily: "Geist Mono, monospace",
          fontSize: "18px",
          lineHeight: "1.6",
          boxShadow: "0 20px 40px rgba(0,0,0,0.2)",
          whiteSpace: "pre-wrap"
        }}>
          {codeSnippet}
        </div>
      )}
    </div>
  );
};
