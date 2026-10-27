import React from "react";
import { LeftPanel } from "./LeftPanel";

export const Scene10: React.FC<{ showCode: boolean }> = ({ showCode }) => {
  return (
    <div style={{ width: "100%", height: "100%", display: "flex" }}>
      <LeftPanel
        kicker="09 · Performance"
        headline="Optimize & Z-Order"
        description="Too many small files ruins performance. OPTIMIZE safely compacts them into large chunks, and Z-ORDER co-locates related data."
        codeSnippet={showCode ?
`OPTIMIZE orders
ZORDER BY customer` : undefined
        }
      />
    </div>
  );
};
