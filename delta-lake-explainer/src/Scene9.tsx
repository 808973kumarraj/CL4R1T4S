import React from "react";
import { LeftPanel } from "./LeftPanel";

export const Scene9: React.FC<{ showCode: boolean }> = ({ showCode }) => {
  return (
    <div style={{ width: "100%", height: "100%", display: "flex" }}>
      <LeftPanel
        kicker="08 · Scaling"
        headline="Checkpoints"
        description="Reading a huge log gets slow. Every 10 commits, Delta Lake saves a Parquet summary of the log, so readers can skip the history."
        codeSnippet={showCode ?
`// Automatically happens every 10 commits
// Readers compute:
// Checkpoint(N) + JSONs(>N)` : undefined
        }
      />
    </div>
  );
};
