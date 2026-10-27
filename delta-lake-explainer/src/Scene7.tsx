import React from "react";
import { LeftPanel } from "./LeftPanel";

export const Scene7: React.FC<{ showCode: boolean }> = ({ showCode }) => {
  return (
    <div style={{ width: "100%", height: "100%", display: "flex" }}>
      <LeftPanel
        kicker="06 · Edits"
        headline="Update & Merge"
        description="Because Parquet is immutable, updates rewrite the file. The log adds the new file and marks the old one 'removed'."
        codeSnippet={showCode ?
`MERGE INTO orders o
USING updates u
ON o.id = u.id
WHEN MATCHED THEN
  UPDATE SET *` : undefined
        }
      />
    </div>
  );
};
