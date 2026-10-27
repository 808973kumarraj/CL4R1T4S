import React from "react";
import { LeftPanel } from "./LeftPanel";

export const Scene4: React.FC<{ showCode: boolean }> = ({ showCode }) => {
  return (
    <div style={{ width: "100%", height: "100%", display: "flex" }}>
      <LeftPanel
        kicker="03 · ACID Transactions"
        headline="Atomic Commits"
        description="A write is all-or-nothing. If a job crashes mid-write, readers never see the partial files."
        codeSnippet={showCode ?
`# Appending data...
df.write
  .mode("append")
  .format("delta")
  .save("s3://lake/orders/")` : undefined
        }
      />
    </div>
  );
};
