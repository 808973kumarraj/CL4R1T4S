import React from "react";
import { LeftPanel } from "./LeftPanel";

export const Scene5: React.FC<{ showCode: boolean }> = ({ showCode }) => {
  return (
    <div style={{ width: "100%", height: "100%", display: "flex" }}>
      <LeftPanel
        kicker="04 · Concurrency"
        headline="Safe Concurrent Writers"
        description="If two jobs try to write v2, the log uses optimistic concurrency. One wins, the other safely retries as v3."
        codeSnippet={showCode ?
`// Writer A & B simultaneously:
df.write
  .mode("append")
  .format("delta")
  ...` : undefined
        }
      />
    </div>
  );
};
