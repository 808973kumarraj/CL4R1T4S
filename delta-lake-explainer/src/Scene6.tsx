import React from "react";
import { useCurrentFrame, useVideoConfig, spring, interpolate } from "remotion";
import { LeftPanel } from "./LeftPanel";

export const Scene6: React.FC<{ showCode: boolean }> = ({ showCode }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const badWriteStart = spring({ frame: frame - 30, fps });
  const badWriteReject = spring({ frame: frame - 90, fps });
  const mergeSchemaStart = spring({ frame: frame - 150, fps });

  const shake = interpolate(badWriteReject, [0, 0.25, 0.5, 0.75, 1], [0, -10, 10, -10, 0]);

  let code = undefined;
  if (showCode) {
    if (badWriteReject > 0.1 && mergeSchemaStart < 0.1) {
      code = `# Bad row: amount = "twelve"\n# AnalysisException:\n# Failed to cast value "twelve" \n# to IntegerType.`;
    } else {
      code = `# Evolving schema\ndf.write\n  .option("mergeSchema", "true")\n  .mode("append")\n  .format("delta")\n  ...`;
    }
  }

  return (
    <div style={{ width: "100%", height: "100%", display: "flex", position: "relative" }}>
      <LeftPanel
        kicker="05 · Data Quality"
        headline="Schema Enforcement"
        description="Bad data (like a string in an INT column) is rejected. But you can intentionally evolve the schema at any time."
        codeSnippet={code}
      />
      {/* Retain the shaking error box overlay, positioned so it shows over the left panel or center */}
      <div style={{ position: "absolute", left: "45%", top: "40%", transform: `translateX(${shake}px)`, opacity: badWriteStart > 0.1 && mergeSchemaStart < 0.1 ? 1 : 0, zIndex: 5 }}>
        <div style={{ backgroundColor: "#ffebee", border: "2px solid red", padding: "20px", borderRadius: "8px", fontFamily: "Geist Mono" }}>
          <span style={{ color: "red", fontWeight: "bold" }}>amount: 'twelve'</span>
        </div>
      </div>
    </div>
  );
};
