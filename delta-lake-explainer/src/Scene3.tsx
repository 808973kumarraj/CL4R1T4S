import React from "react";
import { LeftPanel } from "./LeftPanel";

export const Scene3: React.FC<{ showCode: boolean }> = ({ showCode }) => {
  return (
    <div style={{ width: "100%", height: "100%", display: "flex" }}>
      <LeftPanel
        kicker="02 · The Foundation"
        headline="First Write"
        description="A Delta table is just open Parquet data files, plus a transaction log that tracks them."
        codeSnippet={showCode ?
`df.write
  .format("delta")
  .save("s3://lake/orders/")` : undefined
        }
      />
    </div>
  );
};
