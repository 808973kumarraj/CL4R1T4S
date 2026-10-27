import React from "react";
import { AbsoluteFill, spring, useCurrentFrame, useVideoConfig, interpolate } from "remotion";

export interface DataFile {
  id: string;
  name: string;
  status: "active" | "writing" | "crashed" | "removed" | "large";
  highlight?: boolean; // data skipping
  zOrderParts?: { color: string }[]; // for optimization animation
  stats?: boolean;
}

export interface LogChip {
  id: string;
  name: string;
  status: "committed" | "writing" | "rejected" | "checkpoint";
}

interface StoragePanelProps {
  dataFiles: DataFile[];
  logChips: LogChip[];
  version: number;
  activeCount: number;
  note: string;
  style?: React.CSSProperties;
}

export const StoragePanel: React.FC<StoragePanelProps> = ({ dataFiles, logChips, version, activeCount, note, style }) => {
  return (
    <div style={{
      position: "absolute",
      right: 0,
      top: 0,
      width: "50%",
      height: "100%",
      display: "flex",
      flexDirection: "column",
      padding: "60px",
      boxSizing: "border-box",
      fontFamily: "Geist Mono, monospace",
      ...style
    }}>
      <div style={{ fontSize: "24px", color: "#666", marginBottom: "40px" }}>s3://lake/orders/</div>

      {/* Data Files Area */}
      <div style={{ flex: 1, display: "flex", flexWrap: "wrap", gap: "20px", alignContent: "flex-start", position: "relative" }}>
        {dataFiles.map(file => (
          <div key={file.id} style={{
            width: file.status === "large" ? "220px" : "100px",
            height: file.status === "large" ? "220px" : "120px",
            backgroundColor: file.status === "removed" ? "transparent" : (file.status === "crashed" ? "#ffebee" : "#fff"),
            border: file.status === "writing" || file.status === "crashed" ? "2px dashed #ccc" :
                   (file.highlight ? "4px solid #0e7a76" : "2px solid #ddd"),
            borderRadius: "8px",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            opacity: file.status === "removed" ? 0.3 : 1,
            boxShadow: file.status === "removed" || file.status === "crashed" || file.status === "writing" ? "none" : "0 4px 12px rgba(0,0,0,0.05)",
            position: "relative",
            transition: "all 0.3s ease"
          }}>
            <div style={{ fontSize: "14px", color: file.status === "crashed" ? "red" : "#333", textAlign: "center", padding: "10px" }}>
              {file.name}
            </div>
            {file.status === "crashed" && (
              <div style={{ color: "red", fontSize: "12px", fontWeight: "bold", marginTop: "10px" }}>CRASHED</div>
            )}
            {file.status === "removed" && (
              <div style={{ color: "#888", fontSize: "12px", marginTop: "10px" }}>REMOVED</div>
            )}
            {file.stats && (
              <div style={{ fontSize: "12px", color: "#0e7a76", marginTop: "10px", textAlign: "center" }}>
                min: A<br/>max: Z
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Log Chips Area */}
      <div style={{ height: "160px", borderTop: "2px solid #eee", paddingTop: "20px" }}>
        <div style={{ fontSize: "18px", color: "#666", marginBottom: "15px" }}>_delta_log/</div>
        <div style={{ display: "flex", gap: "10px", flexWrap: "nowrap", overflow: "hidden" }}>
          {logChips.map(chip => (
            <div key={chip.id} style={{
              padding: "10px 15px",
              backgroundColor: chip.status === "checkpoint" ? "#fff3e0" : (chip.status === "rejected" ? "#ffebee" : "#e0f2f1"),
              border: `2px solid ${chip.status === "checkpoint" ? "#ffb74d" : (chip.status === "rejected" ? "#ef5350" : "#0e7a76")}`,
              borderRadius: "20px",
              fontSize: "14px",
              color: chip.status === "checkpoint" ? "#e65100" : (chip.status === "rejected" ? "#c62828" : "#004d40"),
              fontWeight: "bold",
              whiteSpace: "nowrap"
            }}>
              {chip.name}
            </div>
          ))}
        </div>
      </div>

      {/* Status Bar */}
      <div style={{ height: "60px", backgroundColor: "#fff", border: "1px solid #ddd", borderRadius: "30px", display: "flex", alignItems: "center", padding: "0 30px", marginTop: "20px", boxShadow: "0 2px 10px rgba(0,0,0,0.05)" }}>
        <div style={{ fontSize: "16px", color: "#333", display: "flex", width: "100%", justifyContent: "space-between" }}>
          <span><strong>Readers see v{version}</strong> · {activeCount} active files</span>
          <span style={{ color: "#666" }}>{note}</span>
        </div>
      </div>
    </div>
  );
};
